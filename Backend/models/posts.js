export default (db) => ({
  async getUserPosts(userId) {
    const [rows] = await db.query(
        `
        SELECT id, poster_user_id, title, date, content, published
        FROM user_posts
        WHERE poster_user_id = ?
        ORDER BY date DESC
        `, [userId]);

    if (rows.length == 0) {
        return null;
    }
    return rows;
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
  }
});
