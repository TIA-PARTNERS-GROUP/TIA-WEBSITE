export default (db) => ({
  // New methods for adk_session_id
  async getAdkSessionId(userId) {
    const [rows] = await db.query('SELECT adk_session_id FROM users WHERE id = ?', [userId]);
    return rows[0] ? rows[0].adk_session_id : null;  // Return null if not found
  },

  async setAdkSessionId(userId, sessionId) {
    // Only update existing user (no INSERT, since user should exist)
    const [result] = await db.query(
      'UPDATE users SET adk_session_id = ? WHERE id = ?',
      [sessionId, userId]
    );
    return result.affectedRows > 0;  // Return true if updated
  },

  async checkAdkSessionExists(userId) {
    const sessionId = await this.getAdkSessionId(userId);
    return sessionId !== null;  // Return true if exists
  }
});