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
});
