export default (db) => ({
  async getAll() {
    const [rows] = await db.query('SELECT * FROM [table_name]');
    return rows;
  },

  async infoFromId(id) {
    const [rows] = await db.query(`
      SELECT b.name, b.contact_name, b.contact_phone_no, b.contact_email, bc.name as category, b.description
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
      SELECT s.connection_business_id as id, b.name
      FROM (
        SELECT 
          CASE
          WHEN initiating_business_id = ? THEN receiving_business_id
          ELSE initiating_business_id
          END AS connection_business_id, date_initiated
        FROM business_connections
        WHERE ? IN (initiating_business_id, receiving_business_id)
        AND active = 1
      ) AS s
      LEFT JOIN businesses b ON s.connection_business_id = b.id;
      `, [id, id])

      return rows;
  },


  async getServices(id) {
    const [rows] = await db.query(`
        SELECT id description
        FROM business_services
        WHERE business_id = ?
      `, [id])

    return rows;
  },

    async getClients(id) {
      const [rows] = await db.query(`
        SELECT id, description
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
        business_phase = COALESCE(?, business_phase)
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
  }
});
