import axios from 'axios';

const ADK_API_URL = process.env.ADK_API_URL;

// TODO: ADD Region, lat, long -> location_data
// TODO: Return, session_id, state
export async function sendToAdkAgent({ user_id, name, message }) {
  try {
    const response = await axios.post(`${ADK_API_URL}/tia_chat`, {
      user_id,
      name,
      message,
    });
    console.log(response.data)
    return response.data.result.response;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
}