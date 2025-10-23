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

    return await this._formatBusinessRecommendations(users.map(u => u.business_id));
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

    return await this._formatBusinessRecommendations(users.map(u => u.business_id));
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

    return await this._formatBusinessRecommendations(users.map(u => u.business_id));
  },

  // Helper to fetch full business/user details and format
  async _formatBusinessRecommendations(businessIds) {
    if (!businessIds.length) return [];

  const placeholders = businessIds.map(() => '?').join(',');

  const [rows] = await db.query(`
    SELECT 
      u.id AS user_id,
      CONCAT(u.first_name, ' ', COALESCE(u.last_name, '')) AS user_name,
      b.id AS business_id,
      b.name AS business_name,
      bt.name AS business_type,
      bc.name AS business_category,
      b.description AS business_description
    FROM businesses b
    JOIN users u ON u.id = b.operator_user_id
    LEFT JOIN business_types bt ON bt.id = b.business_type_id
    LEFT JOIN business_categories bc ON bc.id = b.business_category_id
    WHERE b.id IN (${placeholders})
  `, businessIds);

  return rows.map(r => ({
    recommendation: {
      user: {
        id: r.business_id,
        name: r.user_name,
        business: r.business_name,
        type: r.business_type,
        category: r.business_category,
        description: r.business_description
      }
    },
    reason: ""  // leave blank for now
  }));
  }
});
