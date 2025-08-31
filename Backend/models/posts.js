export default (db) => ({
  async getUserPosts(userId, includeDraft = true) {

    const [rows] = await db.query(
        `
        SELECT id, poster_user_id, title, date, content, published
        FROM user_posts
        WHERE poster_user_id = ?
        AND published >= ?
        ORDER BY date DESC
        `, [userId, includeDraft ? 0 : 1]);

    if (rows.length == 0) {
        return null;
    }
    return rows;
  },

  async getPost(postId) {
    const [rows] = await db.query(
        `
        SELECT id, poster_user_id, title, date, content, published
        FROM user_posts
        WHERE id = ?
        `, [postId]);
    if (rows.length == 0) {
        return null;
    }
    return rows[0];
  },


  async addPost(posterId, title, date, content, published) {
    const [result] = await db.query(
      `
      INSERT INTO user_posts (poster_user_id, title, date, content, published)
      VALUES (?, ?, ?, ? ,?)
      `,
      [posterId, title, date, content, published]
    );
    return result.insertId;
  },

  async publishPost(postId, status = 1) {
    await db.query(
        `
        UPDATE user_posts
        SET published = ?
        WHERE id = ?
        `,
        [status, postId]
    )
  },

  async deletePost(postId) {
    await db.query(
      `
      DELETE FROM user_posts
      WHERE id = ?
      `, 
      [postId]
    );
  },
  
});
