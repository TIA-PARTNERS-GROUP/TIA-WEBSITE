import { sendToAdkAgent, resetAdkSession } from '../services/adkServices.js';
import db from "../config/db.js";
import userModel from '../models/user.js';
import chatBotModel from '../models/chatBot.js';

// Reusable function to handle session reset - returns string or throws error
const handleSessionReset = async (user_id, name) => {
  const chatBot = chatBotModel(db);

  // Get current session_id for logging and reset
  const currentSessionId = await chatBot.getAdkSessionId(user_id);

  if (!currentSessionId) {
    throw new Error('No active session found for this user.');
  }
  const resetResponse = await resetAdkSession({ user_id, session_id: currentSessionId });

  if (resetResponse.error) {
    throw new Error(`Failed to reset session: ${resetResponse.error}`);
  }

  console.log(`Session reset for user ${user_id} (${name || 'unknown'}). Previous session ID: ${currentSessionId}`);
  return 'Your session has been reset. You can start a new conversation.';
};

// TODO: ADD RESET SESSION FOR NEW TYPES
export const sendMessage = async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = userModel(db);
    const userObj = await user.infoFromId(user_id);
    const name = userObj.first_name;
    const chat_type = req.body.chat_type || "default";
    const message = req.body.message;
    const region = req.body.region || "au";
    const lat = req.body.lat || -27.4705;
    const lng = req.body.lng || 153.0260;

    const chatBot = chatBotModel(db);
    let session_id = await chatBot.getAdkSessionId(user_id);

    console.log(`User ID: ${user_id}\nName: ${name}\nMessage: ${message}`);

    if (!message) {
      return res.status(400).json({ error: 'user_id, name, and message are required.' });
    }

    // Check if the message is "reset" session reset only
    if (message.trim().toLowerCase() === 'reset') {
      try {
        const result = await handleSessionReset(user_id, name);
        return res.json(result);
      } catch (resetError) {
        return res.status(500).json({ error: resetError.message });
      }
    }

    // Proceed with normal ADK agent call if not reset
    const adkResponse = await sendToAdkAgent({ user_id, session_id, name, chat_type, message, region, lat, lng });
    // If a new session_id is returned, update the DB
    if (adkResponse.session_id) {
      await chatBot.setAdkSessionId(user_id, adkResponse.session_id); // Set in DB
    } else if (session_id) {
      adkResponse.session_id = session_id;
    }

    res.json(adkResponse.response);
  } catch (err) {
    console.error('Error communicating with ADK agent:', err);
    res.status(500).json({ error: err.message || 'Failed to communicate with ADK agent.' });
  }
};

export const resetSession = async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = userModel(db);
    const userObj = await user.infoFromId(user_id);
    const name = userObj.first_name;

    const result = await handleSessionReset(user_id, name);
    return res.json(result);  // Return the string directly
  } catch (err) {
    console.error('Error in resetSession:', err);
    res.status(500).json({ error: err.message || 'Failed to reset session.' });
  }
};