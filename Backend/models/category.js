import db from "../config/db.js";

export default (db) => ({
  async getCategories() {
    try {
      const [rows] = await db.query(`
        SELECT id, name 
        FROM business_categories 
        ORDER BY name ASC
      `);
      return rows;
    } catch (error) {
      console.error("Error in category model getCategories:", error);
      throw error;
    }
  },

  async getCategoryById(id) {
    try {
      const [rows] = await db.query(`
        SELECT id, name 
        FROM business_categories 
        WHERE id = ?
      `, [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error in category model getCategoryById:", error);
      throw error;
    }
  },

  async createCategory(name) {
    try {
      const [result] = await db.query(`
        INSERT INTO business_categories (name) 
        VALUES (?)
      `, [name]);
      return result.insertId;
    } catch (error) {
      console.error("Error in category model createCategory:", error);
      throw error;
    }
  },

  async updateCategory(id, name) {
    try {
      const [result] = await db.query(`
        UPDATE business_categories 
        SET name = ? 
        WHERE id = ?
      `, [name, id]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error in category model updateCategory:", error);
      throw error;
    }
  },

  async deleteCategory(id) {
    try {
      const [result] = await db.query(`
        DELETE FROM business_categories 
        WHERE id = ?
      `, [id]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error in category model deleteCategory:", error);
      throw error;
    }
  }
});