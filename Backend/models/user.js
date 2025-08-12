export default (db) => ({
  async getAll() {
    const [rows] = await db.query('SELECT * FROM [table_name]');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM [table_name] WHERE id = ?', [id]);
    return rows[0];
  },

  async findByLoginEmail(email) {
    const [rows] = await db.query('SELECT * FROM user_logins where login_email = ?', [email]);
    if (rows.length == 0) {
      return null;
    }
    return rows[0];
  },

  async registerUser(firstName, lastName, email, password_hash) {
    const [result] = await db.query(
      'INSERT INTO users (first_name, last_name) VALUES (?, ?)',
      [firstName, lastName]
    );

    await db.query(
      'INSERT INTO user_logins (user_id, login_email, password_hash) VALUES (?, ?, ?)',
      [result.insertId, email, password_hash]
    );
    return result.insertId;
  }
});
