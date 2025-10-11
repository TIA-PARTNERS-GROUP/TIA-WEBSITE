export default (db) => ({
  async addProject(name, description, userId, status, openDate,
    closeDate, completionDate, categories, skills, regions) {
      const conn = await db.getConnection();
      try {
        

        await conn.beginTransaction();

        const [result] = await conn.query(`
          INSERT INTO projects (managed_by_user_id, name, description, status, open_date, close_date, completion_date)
          VALUES (?,?,?,?,?,?,?)
          `, [
            userId, name, description, status, openDate, closeDate, completionDate
          ])

        const makeBulkInsert = (table, columns, rows) => {
          if (!rows.length) return null; // skip if no rows
          const placeholders = rows.map(() => `(${columns.map(() => '?').join(', ')})`).join(', ');
          const values = rows.flat();
          return { sql: `INSERT INTO ${table} (${columns.join(', ')}) VALUES ${placeholders}`, values };
        };

        const categoryRows = categories.map(category => [result.insertId, category]);
        const skillRows = skills.map(skill => [result.insertId, skill]);
        const regionRows = regions.map(region => [result.insertId, region]);

        const inserts = [
          makeBulkInsert('project_business_categories', ['project_id', 'business_category_id'], categoryRows),
          makeBulkInsert('project_business_skills', ['project_id', 'business_skill_id'], skillRows),
          makeBulkInsert('project_regions', ['project_id', 'region_id'], regionRows)
        ];

        for (const insert of inserts) {
          if (insert) {
            await conn.query(insert.sql, insert.values);
          }
        }
        conn.commit()
        return result.insertId;
    }
    catch (error) {
      conn.rollback();
      console.log("Error in project model: addProject")
      throw error;
    }
    finally {
      conn.release();
    }
  }
,

  async addApplicant(projectId, userId) {
    try {
      await db.query(`
        INSERT INTO project_applicants (project_id, user_id)
        VALUES (?, ?)
      `, [projectId, userId]);

      return true;
    }
    catch (error) {
      // If the pair already exists, MySQL will raise a duplicate entry error.

      if (error && (error.code === 'ER_DUP_ENTRY' || error.errno === 1062)) {
        return false;
      }
      throw error;
    }
  },

  async getProjectById(id) {
    const [rows] = await db.query(`
      SELECT id, managed_by_user_id, name, description, status, open_date, close_date, completion_date
      FROM projects
      WHERE id = ?
      `, [id]);

    if (rows.length == 0) {
      return null;
    }

    const project = rows[0];

    // Related categories, skills, regions (return arrays of ids)
    const [catRows] = await db.query(`
      SELECT business_category_id
      FROM project_business_categories
      WHERE project_id = ?
    `, [id]);
    const categories = catRows.map(r => r.business_category_id);

    const [skillRows] = await db.query(`
      SELECT business_skill_id
      FROM project_business_skills
      WHERE project_id = ?
    `, [id]);
    const skills = skillRows.map(r => r.business_skill_id);

    const [regionRows] = await db.query(`
      SELECT region_id
      FROM project_regions
      WHERE project_id = ?
    `, [id]);
    const regions = regionRows.map(r => r.region_id);

    return {
      id: project.id,
      managed_by_user_id: project.managed_by_user_id,
      name: project.name,
      description: project.description,
      status: project.status,
      open_date: project.open_date,
      close_date: project.close_date,
      completion_date: project.completion_date,
      categories,
      skills,
      regions
    };
  }

  ,

  async fetchProjectFromManagerId(userId) {
    const [rows] = await db.query(`
      SELECT id
      FROM projects
      WHERE managed_by_user_id = ?
    `, [userId]);

    if (rows.length == 0) {
      return null;
    }

    if (rows.length > 1) {
      throw new Error("Multiple projects returned!");
    }

    return rows[0];
  },

  async updateProject(id, request) {
    const allowed = {
      name: null,
      description: null,
      status: null,
      openDate: null,
      closeDate: null,
      completionDate: null,
      categoryIds: null,
      skillIds: null,
      regions: null
    };

    for (const key of Object.keys(request)) {
      if (Object.prototype.hasOwnProperty.call(allowed, key)) {
        allowed[key] = request[key];
      } else {
        throw new Error('Invalid parameter');
      }
    }

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const setClauses = [];
      const queryParams = [];

      if (allowed.name !== null) {
        setClauses.push('name = COALESCE(?, name)');
        queryParams.push(allowed.name);
      }
      if (allowed.description !== null) {
        setClauses.push('description = COALESCE(?, description)');
        queryParams.push(allowed.description);
      }
      if (allowed.status !== null) {
        setClauses.push('status = COALESCE(?, status)');
        queryParams.push(allowed.status);
      }
      if (allowed.openDate !== null) {
        setClauses.push('open_date = COALESCE(?, open_date)');
        queryParams.push(allowed.openDate);
      }
      if (allowed.closeDate !== null) {
        setClauses.push('close_date = COALESCE(?, close_date)');
        queryParams.push(allowed.closeDate);
      }
      if (allowed.completionDate !== null) {
        setClauses.push('completion_date = COALESCE(?, completion_date)');
        queryParams.push(allowed.completionDate);
      }

      if (setClauses.length > 0) {
        queryParams.push(id);
        const query = `
          UPDATE projects
          SET ${setClauses.join(', ')}
          WHERE id = ?
        `;
        await conn.query(query, queryParams);
      }

      // Helper for bulk insert
      const makeBulkInsert = (table, columns, rows) => {
        if (!rows || !rows.length) return null;
        const placeholders = rows.map(() => `(${columns.map(() => '?').join(', ')})`).join(', ');
        const values = rows.flat();
        return { sql: `INSERT INTO ${table} (${columns.join(', ')}) VALUES ${placeholders}`, values };
      };

      // Replace category associations if provided (null means not provided, empty array means clear)
      if (allowed.categoryIds !== null) {
        if (!Array.isArray(allowed.categoryIds)) throw new Error('categoryIds must be an array');
        await conn.query('DELETE FROM project_business_categories WHERE project_id = ?', [id]);
        const categoryRows = allowed.categoryIds.map(cat => [id, cat]);
        const insert = makeBulkInsert('project_business_categories', ['project_id', 'business_category_id'], categoryRows);
        if (insert) await conn.query(insert.sql, insert.values);
      }

      // Replace skill associations
      if (allowed.skillIds !== null) {
        if (!Array.isArray(allowed.skillIds)) throw new Error('skillIds must be an array');
        await conn.query('DELETE FROM project_business_skills WHERE project_id = ?', [id]);
        const skillRows = allowed.skillIds.map(s => [id, s]);
        const insert = makeBulkInsert('project_business_skills', ['project_id', 'business_skill_id'], skillRows);
        if (insert) await conn.query(insert.sql, insert.values);
      }

      // Replace regions
      if (allowed.regions !== null) {
        if (!Array.isArray(allowed.regions)) throw new Error('regions must be an array');
        await conn.query('DELETE FROM project_regions WHERE project_id = ?', [id]);
        const regionRows = allowed.regions.map(r => [id, r]);
        const insert = makeBulkInsert('project_regions', ['project_id', 'region_id'], regionRows);
        if (insert) await conn.query(insert.sql, insert.values);
      }

      // If nothing changed (no set clauses and no association updates requested), throw
      const associationsProvided = (allowed.categoryIds !== null) || (allowed.skillIds !== null) || (allowed.regions !== null);
      if (setClauses.length === 0 && !associationsProvided) {
        throw new Error('No valid fields to update');
      }

      await conn.commit();
    }
    catch (error) {
      await conn.rollback();
      throw error;
    }
    finally {
      conn.release();
    }
  }

  ,

  async deleteProject(id) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      // Delete association rows first
      await conn.query('DELETE FROM project_business_categories WHERE project_id = ?', [id]);
      await conn.query('DELETE FROM project_business_skills WHERE project_id = ?', [id]);
      await conn.query('DELETE FROM project_regions WHERE project_id = ?', [id]);
      await conn.query('DELETE FROM project_applicants WHERE project_id = ?', [id]);

      // Delete the project itself
      const [result] = await conn.query('DELETE FROM projects WHERE id = ?', [id]);

      await conn.commit();

      return result.affectedRows;
    }
    catch (error) {
      await conn.rollback();
      throw error;
    }
    finally {
      conn.release();
    }
  }

  ,

  async getProjectsByManagerId(userId) {
    const [rows] = await db.query(`
      SELECT id, managed_by_user_id, name, description, status, open_date, close_date, completion_date
      FROM projects
      WHERE managed_by_user_id = ?
      ORDER BY id DESC
    `, [userId]);

    if (!rows || rows.length === 0) return [];

    // For each project, fetch related ids (categories, skills, regions)
    const projects = [];
    for (const p of rows) {
      const [catRows] = await db.query(`SELECT business_category_id FROM project_business_categories WHERE project_id = ?`, [p.id]);
      const categories = catRows.map(r => r.business_category_id);

      const [skillRows] = await db.query(`SELECT business_skill_id FROM project_business_skills WHERE project_id = ?`, [p.id]);
      const skills = skillRows.map(r => r.business_skill_id);

      const [regionRows] = await db.query(`SELECT region_id FROM project_regions WHERE project_id = ?`, [p.id]);
      const regions = regionRows.map(r => r.region_id);

      projects.push({
        id: p.id,
        managed_by_user_id: p.managed_by_user_id,
        name: p.name,
        description: p.description,
        status: p.status,
        open_date: p.open_date,
        close_date: p.close_date,
        completion_date: p.completion_date,
        categories,
        skills,
        regions
      });
    }

    return projects;
  }

  ,

  async getProjectsByApplicantId(userId) {
    const [rows] = await db.query(`
      SELECT p.id, p.managed_by_user_id, p.name, p.description, p.status, p.open_date, p.close_date, p.completion_date
      FROM projects p
      JOIN project_applicants pa ON pa.project_id = p.id
      WHERE pa.user_id = ?
      ORDER BY p.id DESC
    `, [userId]);

    if (!rows || rows.length === 0) return [];

    const projects = [];
    for (const p of rows) {
      const [catRows] = await db.query(`SELECT business_category_id FROM project_business_categories WHERE project_id = ?`, [p.id]);
      const categories = catRows.map(r => r.business_category_id);

      const [skillRows] = await db.query(`SELECT business_skill_id FROM project_business_skills WHERE project_id = ?`, [p.id]);
      const skills = skillRows.map(r => r.business_skill_id);

      const [regionRows] = await db.query(`SELECT region_id FROM project_regions WHERE project_id = ?`, [p.id]);
      const regions = regionRows.map(r => r.region_id);

      // Fetch the application row for this user (may contain additional metadata such as applied_at, status, etc.)
      const [appRows] = await db.query(`SELECT * FROM project_applicants WHERE project_id = ? AND user_id = ?`, [p.id, userId]);
      const application = appRows.length ? appRows[0] : null;

      projects.push({
        id: p.id,
        managed_by_user_id: p.managed_by_user_id,
        name: p.name,
        description: p.description,
        status: p.status,
        open_date: p.open_date,
        close_date: p.close_date,
        completion_date: p.completion_date,
        categories,
        skills,
        regions,
        application
      });
    }

    return projects;
  }

  ,

  async getPaginated(page = 1, limit = 20, categories = [], skills = [], regions = [], status = null, searchQuery = '') {
    const offset = (page - 1) * limit;

    let whereClauses = [];
    const params = [];

    if (searchQuery) {
      whereClauses.push('(p.name LIKE ? OR p.description LIKE ?)');
      const s = `%${searchQuery}%`;
      params.push(s, s);
    }

    if (status) {
      whereClauses.push('p.status = ?');
      params.push(status);
    }

    if (categories && categories.length > 0) {
      const placeholders = categories.map(() => '?').join(',');
      whereClauses.push(`p.id IN (SELECT project_id FROM project_business_categories WHERE business_category_id IN (${placeholders}))`);
      params.push(...categories);
    }

    if (skills && skills.length > 0) {
      const placeholders = skills.map(() => '?').join(',');
      whereClauses.push(`p.id IN (SELECT project_id FROM project_business_skills WHERE business_skill_id IN (${placeholders}))`);
      params.push(...skills);
    }

    if (regions && regions.length > 0) {
      const placeholders = regions.map(() => '?').join(',');
      whereClauses.push(`p.id IN (SELECT project_id FROM project_regions WHERE region_id IN (${placeholders}))`);
      params.push(...regions);
    }

    const where = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const baseQuery = `
      SELECT p.id, p.managed_by_user_id, p.name, p.description, p.status, p.open_date, p.close_date, p.completion_date
      FROM projects p
      ${where}
    `;

    const fullQuery = `
      SELECT *, COUNT(*) OVER() AS total_count
      FROM (${baseQuery} ORDER BY p.id DESC LIMIT ? OFFSET ?) AS paginated_data
    `;

    // push limit and offset last
    const finalParams = [...params, limit, offset];
    const [rows] = await db.query(fullQuery, finalParams);

    if (rows.length === 0) {
      return {
        data: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: limit,
          hasNext: false,
          hasPrev: false
        }
      };
    }

    const total = rows[0].total_count;
    const totalPages = Math.ceil(total / limit);

    // Remove total_count and fetch categories/skills/regions for each row
    const data = [];
    for (const r of rows) {
      const { total_count, ...rest } = r;
      const pid = rest.id;

      const [catRows] = await db.query(`SELECT business_category_id FROM project_business_categories WHERE project_id = ?`, [pid]);
      const categoriesRes = catRows.map(x => x.business_category_id);

      const [skillRows] = await db.query(`SELECT business_skill_id FROM project_business_skills WHERE project_id = ?`, [pid]);
      const skillsRes = skillRows.map(x => x.business_skill_id);

      const [regionRows] = await db.query(`SELECT region_id FROM project_regions WHERE project_id = ?`, [pid]);
      const regionsRes = regionRows.map(x => x.region_id);

      data.push({ ...rest, categories: categoriesRes, skills: skillsRes, regions: regionsRes });
    }

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }


});
