export default (db) => ({
  async getAll() {
    const [rows] = await db.query('SELECT * FROM [table_name]');
    return rows;
  },

  async infoFromId(id) {
    const [rows] = await db.query(`
      SELECT u.id, u.first_name, u.last_name, u.contact_email, u.contact_phone_no, ul.login_email
      FROM users u
      LEFT JOIN user_logins ul on u.id = ul.user_id
      WHERE u.id = ?
      `
      , [id]);
    if (rows.length == 0) {
      return null;
    }
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
  },

  async addNewSession(userId, tokenHash, createdAt, expiresAt) {
    await db.query(`
      INSERT INTO user_sessions (user_id, token_hash, created_at, expires_at)
      VALUES (?, ?, ?, ?)

      `, [userId, tokenHash, createdAt, expiresAt]
    )
  },

  async rotateSession(userId, tokenHash, createdAt, expiresAt, rotated_from_id) {
    const [result] = await db.query(`
      INSERT INTO user_sessions (user_id, token_hash, created_at, expires_at, rotated_from_id)
      VALUES (?, ?, ?, ?, ?)
      `, [userId, tokenHash, createdAt, expiresAt, rotated_from_id]
    );
    
    await db.query(`
      UPDATE user_sessions
      SET rotated_to_id = ?
      WHERE id = ?
      `, [result.insertId, rotated_from_id])
  },
  

  async fetchSessionFromHash(tokenHash) {
    const [rows] = await db.query(`
      SELECT id, user_id, created_at, expires_at, rotated_from_id, rotated_to_id, revoked_at
      FROM user_sessions
      WHERE token_hash = ?
      `, [tokenHash]);

    if (rows.length == 0) {
      return null;
    }
    return rows[0];
  },

  async fetchSessionFromId(id) {
    const [rows] = await db.query(`
      SELECT id, user_id, created_at, expires_at, rotated_from_id, rotated_to_id, revoked_at
      FROM user_sessions
      WHERE id = ?
      `, [id]);

    if (rows.length == 0) {
      return null;
    }
    return rows[0];
  },

  async revokeSession(id) {
    await db.query(`
      UPDATE user_sessions
      SET revoked_at = CURRENT_TIMESTAMP()
      WHERE id = ?
      `, [id])
  },

  async fetchBusinessFromOwnerId(id) {
    const [rows] = await db.query(`
      SELECT id
      FROM businesses
      WHERE operator_user_id = ?
      `, [id])

    if (rows.length == 0 ) {
      return null;
    }

    if (rows.length > 1 ) {
      throw new Error("Multiple businesses returned!"); // If we ever move to multiple businesses per account, this will have to change
    }

    return rows[0];
  }
});
