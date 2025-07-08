export default (db) => ({
  async getAll() {
    const [rows] = await db.query('SELECT * FROM [table_name]');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM [table_name] WHERE id = ?', [id]);
    return rows[0];
  },

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO [table_name] SET ?',
      [data]
    );
    return result.insertId;
  }
});
