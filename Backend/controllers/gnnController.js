// controllers/gnnController.js
import { fetchComplementaryPartners, fetchAlliancePartners, fetchMastermindPartners } from "../services/gnnServices.js";

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
}