import axios from 'axios';

const ADK_API_URL = process.env.ADK_API_URL;
const RECORD_TEST = process.env.ADK_RECORD_TEST || false;

// TODO: ADD Region, lat, long -> location_data
export async function sendToAdkAgent({ user_id, session_id, name, chatType, connection_type, message, region, lat, lng }) {
  try {
    const requestData = {
      user_id,
      name,
      message,
      chatType,
      connection_type,
      session_id,
      region,
      lat,
      lng
    };

    // Add save_conversation flag if RECORD_TEST is enabled
    if (RECORD_TEST) {
      requestData.save_conversation = true;
    }

    const response = await axios.post(`${ADK_API_URL}/tia-chat`, requestData);
    console.log(response.data);

    // If recording, log the saved path for testing
    if (RECORD_TEST && response.data.saved_to) {
      console.log(`Test conversation saved to: ${response.data.saved_to}`);
    }

    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
}

// Reset ADK session via the Python endpoint
export async function resetAdkSession({ user_id, session_id }) {
  try {
    const requestData = {
      user_id: String(user_id),  // Ensure string as per Python endpoint
      session_id
    };

    const response = await axios.post(`${ADK_API_URL}/reset-session`, requestData);
    console.log('Reset Session Response:', response.data);
    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
}

// Updated function for the test-eval endpoint (only takes expected; endpoint parses the rest)
export async function sendToAdkTestEval({ expected }) {
  try {
    const response = await axios.post(`${ADK_API_URL}/test-eval`, { expected });
    console.log('Test Eval Response:', response.data);
    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
}