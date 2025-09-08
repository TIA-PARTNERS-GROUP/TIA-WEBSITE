import { sendToAdkAgent } from '../services/adkServices.js'; // Make sure to import the service
import db from "../config/db.js";
import userModel from '../models/user.js';

// JOSHUA TODO: Refactor to use a proper database for session management
const userSessions = {};

export const sendMessage = async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = userModel(db);
    const userObj = await user.infoFromId(user_id);
    const name = userObj.first_name;
    const message = req.body.message;
    const region = req.body.region || "au";
    const lat = req.body.lat || -27.4705;
    const lng = req.body.lng || 153.0260;

    let session_id = userSessions[user_id] || null;

    console.log(`User ID: ${user_id}\nName: ${name}\nMessage: ${message}`);

    if (!message) {
      return res.status(400).json({ error: 'user_id, name, and message are required.' });
    }
    const adkResponse = await sendToAdkAgent({ user_id, session_id, name, message, region, lat, lng });
    // If a new session_id is returned, update the map
    if (adkResponse.session_id) {
      userSessions[user_id] = adkResponse.session_id;
    } else if (session_id) {
      adkResponse.session_id = session_id;
    }

    res.json(adkResponse.response);
  } catch (err) {
    console.error('Error communicating with ADK agent:', err);
    res.status(500).json({ error: 'Failed to communicate with ADK agent.' });
  }
};

// // Send a message in an existing conversation
// export const sendMessage = async (req, res) => {
//     try {

//     } catch (error) {
//         console.error('ah shit', error);
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Failed to process request'
//         });
//     }
// }

// // Save or update a user profile by receiving constructed json object defining the user details
// export const saveProfile = async (req, res) => {
//     try {

//     } catch (error) {
//         console.error('FUCK YOU BALTIMORE!', error)
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Failed to save profile'
//         });
//     }
// }

// // Wipe history and restart conversation
// export const restartConversation = async (req, res) => {
//     try {

//     } catch (error) {
//         console.error('Average error message', error)
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Failed to restart conversation'
//         });
//     }
// }

// // Creating a chat conversation for the user
// // Attempt running resumeConversation
// export const startConversation = async (req, res) => {
//     try {
//         // CHECK CHATBOT DB FOR PREVIOUS CONVO
//             // ATTEMPT RESUME
//         // CREATE NEW IF NOTHING IS FOUND
//     } catch (error) {
//         console.error('console.error', error)
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Failed to start conversation'
//         });
//     }
// }