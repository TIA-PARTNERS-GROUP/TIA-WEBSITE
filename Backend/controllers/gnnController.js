/*import { fetchComplementaryPartners, fetchAlliancePartners, fetchMastermindPartners } from "../services/gnnServices.js";

export async function getComplementaryPartners(req, res) {
  try {
    const { user_id } = req.params;
    
    const result = await fetchComplementaryPartners(parseInt(user_id));
    
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error in getComplementaryPartners controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAlliancePartners(req, res) {
  try {
    const { project_id } = req.params;
    
    const result = await fetchAlliancePartners(parseInt(project_id));
    
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error in getAlliancePartners controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getMastermindPartners(req, res) {
  try {
    const { user_id } = req.params;
    
    const result = await fetchMastermindPartners(parseInt(user_id));
    
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error in getMastermindPartners controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}*/

// controllers/gnnController.js
import db from "../config/db.js";
import gnnModelFactory from "../models/gnn.js";

const gnnModel = gnnModelFactory(db);

export const getComplementaryPartners = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id);
    const result = await gnnModel.fetchComplementaryPartners(userId);
    return res.status(200).json({ message: "Success", partners: result });
  } catch (error) {
    console.error("Error in getComplementaryPartners:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAlliancePartners = async (req, res) => {
  try {
    const projectId = parseInt(req.params.project_id);
    const result = await gnnModel.fetchAlliancePartners(projectId);
    return res.status(200).json({ message: "Success", partners: result });
  } catch (error) {
    console.error("Error in getAlliancePartners:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMastermindPartners = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id);
    const result = await gnnModel.fetchMastermindPartners(userId);
    return res.status(200).json({ message: "Success", partners: result });
  } catch (error) {
    console.error("Error in getMastermindPartners:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
