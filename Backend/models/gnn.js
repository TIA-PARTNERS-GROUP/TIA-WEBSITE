
export default (db) => ({
  async fetchAlliancePartners(projectId) {
    const [projectSkillRows] = await db.query(`
      SELECT business_skill_id
      FROM project_business_skills
      WHERE project_id = ?
    `, [projectId]);

    if (!projectSkillRows.length) return [];

    const skillIds = projectSkillRows.map(r => r.business_skill_id);
    const placeholders = skillIds.map(() => '?').join(',');

    const [users] = await db.query(`
      SELECT DISTINCT b.id AS business_id
      FROM users u
      JOIN businesses b ON b.operator_user_id = u.id
      JOIN user_skills us ON us.user_id = u.id
      WHERE us.skill_id IN (${placeholders})
    `, skillIds);

    return users.map(u => u.business_id);
  },

  async fetchComplementaryPartners(userId) {
    const [userSkillRows] = await db.query(`
      SELECT s.category_id
      FROM user_skills us
      JOIN skills s ON s.id = us.skill_id
      WHERE us.user_id = ?
    `, [userId]);

    if (!userSkillRows.length) return [];

    const categoryIds = userSkillRows.map(r => r.category_id);
    const placeholders = categoryIds.map(() => '?').join(',');

    const [users] = await db.query(`
      SELECT DISTINCT b.id AS business_id
      FROM users u
      JOIN businesses b ON b.operator_user_id = u.id
      JOIN user_skills us ON us.user_id = u.id
      JOIN skills s ON s.id = us.skill_id
      WHERE s.category_id IN (${placeholders})
        AND u.id != ?
    `, [...categoryIds, userId]);

    return users.map(u => u.business_id);
  },

  async fetchMastermindPartners(userId) {
    const [userStrengthRows] = await db.query(`
      SELECT strength_id
      FROM user_strengths
      WHERE user_id = ?
    `, [userId]);

    if (!userStrengthRows.length) return [];

    const strengthIds = userStrengthRows.map(r => r.strength_id);
    const placeholders = strengthIds.map(() => '?').join(',');

    const [users] = await db.query(`
      SELECT DISTINCT b.id AS business_id
      FROM users u
      JOIN businesses b ON b.operator_user_id = u.id
      JOIN user_strengths us ON us.user_id = u.id
      WHERE us.strength_id IN (${placeholders})
        AND u.id != ?
    `, [...strengthIds, userId]);

    return users.map(u => u.business_id);
  }
});
