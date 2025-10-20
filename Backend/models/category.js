import db from "../config/db.js";

export default (db) => ({
  // Business Categories (for business types)
  async getBusinessCategories() {
    try {
      const [rows] = await db.query(`
        SELECT id, name 
        FROM business_categories 
        ORDER BY name ASC
      `);
      return rows;
    } catch (error) {
      console.error("Error in category model getBusinessCategories:", error);
      throw error;
    }
  },

  // Business Skills (services offered by businesses)
  async getBusinessSkills() {
    try {
      const [rows] = await db.query(`
        SELECT id, name 
        FROM business_skills 
        ORDER BY name ASC
      `);
      return rows;
    } catch (error) {
      console.error("Error in category model getBusinessSkills:", error);
      throw error;
    }
  },

  // Strength Categories (for business strengths)
  async getStrengthCategories() {
    try {
      const [rows] = await db.query(`
        SELECT id, name 
        FROM strength_categories 
        ORDER BY name ASC
      `);
      return rows;
    } catch (error) {
      console.error("Error in category model getStrengthCategories:", error);
      throw error;
    }
  },

  // Strengths (business advantages)
  async getStrengths() {
    try {
      const [rows] = await db.query(`
        SELECT s.id, s.name, s.category_id, sc.name as category_name
        FROM strengths s
        JOIN strength_categories sc ON s.category_id = sc.id
        ORDER BY sc.name ASC, s.name ASC
      `);
      return rows;
    } catch (error) {
      console.error("Error in category model getStrengths:", error);
      throw error;
    }
  },

  // Skill Categories (for technical/personal skills)
  async getSkillCategories() {
    try {
      const [rows] = await db.query(`
        SELECT id, name 
        FROM skill_categories 
        ORDER BY name ASC
      `);
      return rows;
    } catch (error) {
      console.error("Error in category model getSkillCategories:", error);
      throw error;
    }
  },

  // Technical/Personal Skills (individual capabilities)
  async getSkills() {
    try {
      const [rows] = await db.query(`
        SELECT s.id, s.name, s.category_id, sc.name as category_name
        FROM skills s
        JOIN skill_categories sc ON s.category_id = sc.id
        ORDER BY sc.name ASC, s.name ASC
      `);
      return rows;
    } catch (error) {
      console.error("Error in category model getSkills:", error);
      throw error;
    }
  },

  // CRUD operations for business categories
  async getBusinessCategoryById(id) {
    try {
      const [rows] = await db.query(`
        SELECT id, name 
        FROM business_categories 
        WHERE id = ?
      `, [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error in category model getBusinessCategoryById:", error);
      throw error;
    }
  },

  async createBusinessCategory(name) {
    try {
      const [result] = await db.query(`
        INSERT INTO business_categories (name) 
        VALUES (?)
      `, [name]);
      return result.insertId;
    } catch (error) {
      console.error("Error in category model createBusinessCategory:", error);
      throw error;
    }
  },

  async updateBusinessCategory(id, name) {
    try {
      const [result] = await db.query(`
        UPDATE business_categories 
        SET name = ? 
        WHERE id = ?
      `, [name, id]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error in category model updateBusinessCategory:", error);
      throw error;
    }
  },

  async deleteBusinessCategory(id) {
    try {
      const [result] = await db.query(`
        DELETE FROM business_categories 
        WHERE id = ?
      `, [id]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error in category model deleteBusinessCategory:", error);
      throw error;
    }
  }
});