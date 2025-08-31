export default (db) => ({
  async getUserTestimonials(userId, includeDraft = true) {
    const [rows] = await db.query(
        `
        SELECT id, poster_user_id, title, date, content, published
        FROM user_testimonials
        WHERE poster_user_id = ?
        AND published >= ?
        ORDER BY date DESC
        `, [userId, includeDraft ? 0 : 1]);
    if (rows.length == 0) {
        return null;
    }
    return rows;
  },

  async getTestimonial(testimonialId) {
    const [rows] = await db.query(
        `
        SELECT id, poster_user_id, title, date, content, published
        FROM user_testimonials
        WHERE id = ?
        `, [testimonialId]);
    if (rows.length == 0) {
        return null;
    }
    return rows[0];
  },

  async addTestimonial(posterId, title, date, content, published) {
    const [result] = await db.query(
      `
      INSERT INTO user_testimonials (poster_user_id, title, date, content, published)
      VALUES (?, ?, ?, ? ,?)
      `,
      [posterId, title, date, content, published]
    );
    return result.insertId;
  },

  async publishTestimonial(testimonialId, status = 1) {
    await db.query(
        `
        UPDATE user_testimonials
        SET published = ?
        WHERE id = ?
        `,
        [status, testimonialId]
    )
  },

  async deleteTestimonial(testimonialId) {
    await db.query(
      `
      DELETE FROM user_testimonials
      WHERE id = ?
      `, 
      [testimonialId]
    );
  },
  
});
