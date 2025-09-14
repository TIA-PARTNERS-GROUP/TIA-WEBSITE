import { sendToAdkAgent } from '../services/adkServices.js'; // Make sure to import the service
import db from "../config/db.js";
import userModel from '../models/user.js';
import chatBotModel from '../models/chatBot.js'; // Import the chatBot model

// Removed: const userSessions = {}; // No longer needed, using DB

export const sendMessage = async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = userModel(db);
    const userObj = await user.infoFromId(user_id);
    const name = userObj.first_name;
    const connection_type = req.body.connection_type || "complementary";
    const message = req.body.message;
    const region = req.body.region || "au";
    const lat = req.body.lat || -27.4705;
    const lng = req.body.lng || 153.0260;

    const chatBot = chatBotModel(db); // Initialize the model
    let session_id = await chatBot.getAdkSessionId(user_id); // Get session_id from DB

    console.log(`User ID: ${user_id}\nName: ${name}\nMessage: ${message}`);

    if (!message) {
      return res.status(400).json({ error: 'user_id, name, and message are required.' });
    }
    const adkResponse = await sendToAdkAgent({ user_id, session_id, name, connection_type, message, region, lat, lng });
    // If a new session_id is returned, update the DB
    if (adkResponse.session_id) {
      await chatBot.setAdkSessionId(user_id, adkResponse.session_id); // Set in DB
    } else if (session_id) {
      adkResponse.session_id = session_id;
    }

    res.json(adkResponse.response);
  } catch (err) {
    console.error('Error communicating with ADK agent:', err);
    res.status(500).json({ error: 'Failed to communicate with ADK agent.' });
  }
};

// ...existing code...