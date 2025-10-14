// GNN connect endpoint goes here

import axios from 'axios';

const GNN_API_URL = process.env.GNN_API_URL;

// Get complementary partners (same business type, different categories)
export async function fetchComplementaryPartners(user_id) {
  try {
    console.log('Fetching complementary partners for user:', { user_id });
    
    const response = await axios.get(`${GNN_API_URL}/user/${user_id}/complementary_partners`);
    
    console.log('Complementary partners response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching complementary partners:', error.response?.data || error.message);
    
    return { error: error.response?.data || error.message };
  }
}

// Get alliance partners for a specific project
export async function fetchAlliancePartners(project_id) {
  try {
    console.log('Fetching alliance partners for project:', { project_id });
    
    const response = await axios.get(`${GNN_API_URL}/project/${project_id}/alliance_partners`);
    
    console.log('Alliance partners response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching alliance partners:', error.response?.data || error.message);
    
    return { error: error.response?.data || error.message };
  }
}

// Get mastermind partners (complementary strengths)
export async function fetchMastermindPartners(user_id) {
  try {
    console.log('Fetching mastermind partners for user:', { user_id });
    
    const response = await axios.get(`${GNN_API_URL}/user/${user_id}/mastermind_partners`);
    
    console.log('Mastermind partners response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching mastermind partners:', error.response?.data || error.message);
    
    return { error: error.response?.data || error.message };
  }
}
