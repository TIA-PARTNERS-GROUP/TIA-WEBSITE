import db from "../config/db.js";
import categoryModel from '../models/category.js';

export const getBusinessCategories = async (req, res) => {
  try {
    const category = categoryModel(db);
    const categories = await category.getBusinessCategories();
    
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
    const skills = await category.getBusinessSkills();
    
    return res.status(200).json({
      message: "Success",
      skills: skills
    });
  } catch (error) {
    console.error("Error in getBusinessSkills:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getStrengthCategories = async (req, res) => {
  try {
    const category = categoryModel(db);
    const categories = await category.getStrengthCategories();
    
    return res.status(200).json({
      message: "Success",
      categories: categories
    });
  } catch (error) {
    console.error("Error in getStrengthCategories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getStrengths = async (req, res) => {
  try {
    const category = categoryModel(db);
    const strengths = await category.getStrengths();
    
    return res.status(200).json({
      message: "Success",
      strengths: strengths
    });
  } catch (error) {
    console.error("Error in getStrengths:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getSkillCategories = async (req, res) => {
  try {
    const category = categoryModel(db);
    const categories = await category.getSkillCategories();
    
    return res.status(200).json({
      message: "Success",
      categories: categories
    });
  } catch (error) {
    console.error("Error in getSkillCategories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getSkills = async (req, res) => {
  try {
    const category = categoryModel(db);
    const skills = await category.getSkills();
    
    return res.status(200).json({
      message: "Success",
      skills: skills
    });
  } catch (error) {
    console.error("Error in getSkills:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default {
  getBusinessCategories,
  getBusinessSkills,
  getStrengthCategories,
  getStrengths,
  getSkillCategories,
  getSkills
};