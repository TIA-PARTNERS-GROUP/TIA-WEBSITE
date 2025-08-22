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

  async fetchConnections(id) {
    const [rows] = await db.query(`
      SELECT b.name
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
  }
});
