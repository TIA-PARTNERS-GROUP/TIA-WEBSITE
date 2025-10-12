import db from "../config/db.js";
import categoryModel from '../models/category.js';

export const getBusinessCategories = async (req, res) => {
  try {
    const category = categoryModel(db);
    const categories = await category.getCategories();
    
    return res.status(200).json({
      message: "Success",
      categories: categories
    });
  } catch (error) {
    console.error("Error in getBusinessCategories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getBusinessSkills = async (req, res) => {
  try {
    const category = categoryModel(db);
    const skills = await category.getSkills();
    
    return res.status(200).json({
      message: "Success",
      skills: skills
    });
  } catch (error) {
    console.error("Error in getBusinessSkills:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default {
  getBusinessCategories,
  getBusinessSkills
};