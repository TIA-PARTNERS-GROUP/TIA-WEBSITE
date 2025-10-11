export default (db) => ({
  async getSkills() {
    try {
      const [rows] = await db.query(`
        SELECT id, name 
        FROM business_skills 
        ORDER BY name ASC
      `);
      return rows;
    } catch (error) {
      console.error("Error in skill model getSkills:", error);
      throw error;
    }
  },

  async getSkillById(id) {
    try {
      const [rows] = await db.query(`
        SELECT id, name 
        FROM business_skills 
        WHERE id = ?
      `, [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error in skill model getSkillById:", error);
      throw error;
    }
  },

  async createSkill(name) {
    try {
      const [result] = await db.query(`
        INSERT INTO business_skills (name) 
        VALUES (?)
      `, [name]);
      return result.insertId;
    } catch (error) {
      console.error("Error in skill model createSkill:", error);
      throw error;
    }
  },

  async updateSkill(id, name) {
    try {
      const [result] = await db.query(`
        UPDATE business_skills 
        SET name = ? 
        WHERE id = ?
      `, [name, id]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error in skill model updateSkill:", error);
      throw error;
    }
  },

  async deleteSkill(id) {
    try {
      const [result] = await db.query(`
        DELETE FROM business_skills 
        WHERE id = ?
      `, [id]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error in skill model deleteSkill:", error);
      throw error;
    }
  }
});
