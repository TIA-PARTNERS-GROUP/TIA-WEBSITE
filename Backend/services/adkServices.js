import axios from 'axios';

const ADK_API_URL = process.env.ADK_API_URL;

// TODO: ADD Region, lat, long -> location_data
// TODO: Return, session_id, state
export async function sendToAdkAgent({ user_id, session_id, name, message, region, lat, lng }) {
  try {
    const response = await axios.post(`${ADK_API_URL}/tia-chat`, {
      user_id,
      name,
      message,
      session_id,
      region,
      lat,
      lng
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
}