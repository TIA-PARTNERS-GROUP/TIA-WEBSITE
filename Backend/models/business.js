export default (db) => ({
  async getAll() {
    const [rows] = await db.query('SELECT * FROM [table_name]');
    return rows;
  },

  async infoFromId(id) {
    const [rows] = await db.query(`
      SELECT b.id, b.name, b.contact_name, b.contact_phone_no, b.contact_email, bc.name as category, b.description
      FROM businesses b
      LEFT JOIN business_categories bc ON b.business_category_id = bc.id
      WHERE b.id = ?
      `
      , [id]);
    if (rows.length == 0) {
      return null;
    }
    return rows[0];
  },

  async getConnections(id) {
    const [rows] = await db.query(`
      SELECT 
        bc.id as connection_id,
        CASE
          WHEN bc.initiating_business_id = ? THEN bc.receiving_business_id
          ELSE bc.initiating_business_id
        END AS business_id,
        b.name as business_name
      FROM business_connections bc
      JOIN businesses b ON 
        b.id = CASE
          WHEN bc.initiating_business_id = ? THEN bc.receiving_business_id
          ELSE bc.initiating_business_id
        END
      WHERE ? IN (bc.initiating_business_id, bc.receiving_business_id)
      AND bc.active = 1;
    `, [id, id, id])

      return rows;
  },


  async getServices(id) {
    const [rows] = await db.query(`
        SELECT service_id, description
        FROM business_services
        WHERE business_id = ?
      `, [id])

    return rows;
  },

    async getClients(id) {
      const [rows] = await db.query(`
        SELECT client_id, description
        FROM business_clients
        WHERE business_id = ?
      `, [id])

    return rows;
  },

  async updateBusiness(id, request) {
    console.log(request);
    const params = {
      name: null,
      tagline: null,
      website: null,
      contactName: null,
      contactPhoneNo: null,
      contactEmail: null,
      description: null,
      address: null,
      city: null,
      businessType: null,
      businessCategory: null,
      businessPhase: null,
    };


    for (const key of Object.keys(request)) {
      if (params.hasOwnProperty(key)) {
        params[key] = request[key];
      } else {
        throw new Error("Invalid parameter");
      }
    }

    await db.query(`
      UPDATE businesses
      SET
        name = COALESCE(?, name),
        tagline = COALESCE(?, tagline),
        website = COALESCE(?, website),
        contact_name = COALESCE(?, contact_name),
        contact_phone_no = COALESCE(?, contact_phone_no),
        contact_email = COALESCE(?, contact_email),
        description = COALESCE(?, description),
        address = COALESCE(?, address),
        city = COALESCE(?, city),
        business_type_id = COALESCE(?, business_type_id),
        business_category_id = COALESCE(?, business_category_id),
        business_phase_id = COALESCE(?, business_phase_id)
      WHERE id = ?
      `, [
          params.name,
          params.tagline,
          params.website,
          params.contactName,
          params.contactPhoneNo,
          params.contactEmail,
          params.description,
          params.address,
          params.city,
          params.businessType,
          params.businessCategory,
          params.businessPhase,
          id
        ])
  },

  async addClient(id, clientDescription) {
    const [result] = await db.query(`
      INSERT INTO business_clients (business_id, description)
      VALUES (?, ?)
      `, [id, clientDescription])

    return result.insertId;
  },


  async addService(id, serviceDescription) {
    const [result] = await db.query(`
      INSERT INTO business_services (business_id, description)
      VALUES (?, ?)
      `, [id, serviceDescription])

    return result.insertId;
  },

  async removeClient(id, businessId) {
    const [result] = await db.query(`
      DELETE FROM business_clients
      WHERE client_id = ?
      AND business_id = ?
      `, [id, businessId])

      return result.affectedRows;
  },

  async removeService(id, businessId) {
    const [result] = await db.query(`
      DELETE FROM business_services
      WHERE service_id = ?
      AND business_id = ?
      `, [id, businessId])

      return result.affectedRows;
  },

  async addConnection(initiatingBusinessId, receivingBusinessId) {
    const [result] = await db.query(`
      INSERT INTO business_connections (initiating_business_id, receiving_business_id, date_initiated, active, connection_type_id)
      VALUES (?, ?, CURRENT_TIMESTAMP, 1, 1)
      `, [initiatingBusinessId, receivingBusinessId])

    return result.insertId;
  },
  async removeConnection(id,) {
    const [result] = await db.query(`
      DELETE FROM business_connections
      WHERE id = ?
      `, [id])

      return result.affectedRows;
  },
  async getConnectionInfo(id) {
    const [rows] = await db.query(`
      SELECT id, initiating_business_id, receiving_business_id, date_initiated, active, connection_type_id
      FROM business_connections
      WHERE id = ?
      `, [id])
    if (rows.length == 0) {
      return null;
    }   
    return rows[0];
  },

  async getPaginated(page = 1, limit = 10, categories = [], searchQuery = '') {
    const offset = (page - 1) * limit;
    let query = `
      SELECT 
        b.id, b.name, b.description, b.contact_name, b.contact_email,
        bc.name as category_name
      FROM businesses b
      LEFT JOIN business_categories bc ON b.business_category_id = bc.id
      WHERE 1=1
    `;
    let params = [];

    // Add search filter
    if (searchQuery) {
      query += ` AND (b.name LIKE ? OR b.description LIKE ? OR b.tagline LIKE ?)`;
      const searchParam = `%${searchQuery}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    // Add business category filter
    if (categories.length > 0) {
      query += ` AND b.business_category_id IN (${categories.map(() => '?').join(',')})`;
      params.push(...categories);
    }

    // Get data and total count using window functions
    const fullQuery = `
      SELECT *, COUNT(*) OVER() AS total_count
      FROM (${query} ORDER BY b.name ASC LIMIT ? OFFSET ?) AS paginated_data
    `;

    params.push(limit, offset);
    const [rows] = await db.query(fullQuery, params);

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

    // Remove the total_count property from each row before returning
    const data = rows.map(({ total_count, ...rest }) => rest);

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
