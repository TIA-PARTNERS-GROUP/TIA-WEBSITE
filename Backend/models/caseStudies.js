export default (db) => ({
  async getUserCaseStudies(userId, includeDraft = true) {
    const [rows] = await db.query(
        `
        SELECT id, owner_user_id, title, date, content, published
        FROM user_case_studies
        WHERE owner_user_id = ?
        AND published >= ?
        ORDER BY date DESC
        `, [userId, includeDraft ? 0 : 1]);
    if (rows.length == 0) {
        return null;
    }
    return rows;
  },

  async getCaseStudy(caseStudyId) {
    const [rows] = await db.query(
        `
        SELECT id, owner_user_id, title, date, content, published
        FROM user_case_studies
        WHERE id = ?
        `, [caseStudyId]);
    if (rows.length == 0) {
        return null;
    }
    return rows[0];
  },

  async addCaseStudy(posterId, title, date, content, published) {
    const [result] = await db.query(
      `
      INSERT INTO user_case_studies (owner_user_id, title, date, content, published)
      VALUES (?, ?, ?, ? ,?)
      `,
      [posterId, title, date, content, published]
    );
    return result.insertId;
  },

  async publishCaseStudy(caseStudyId, status = 1) {
    await db.query(
        `
        UPDATE user_case_studies
        SET published = ?
        WHERE id = ?
        `,
        [status, caseStudyId]
    )
  },

  async deleteCaseStudy(caseStudyId) {
    await db.query(
      `
      DELETE FROM user_case_studies
      WHERE id = ?
      `, 
      [caseStudyId]
    );
  },
  
});
