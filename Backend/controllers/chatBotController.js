import { sendToAdkAgent } from '../services/adkServices.js'; // Make sure to import the service

export const sendMessage = async (req, res) => {
  try {
    // const user_id = req.user.id;
    // const name = req.user.name;
    const message = req.body.message;
    const user_id = "1"
    const name = "Josh"

    // console.log("Received user:", user_id);
    // console.log("Received name:", name);
    // console.log("Message:", message)

    if (!message) {
      return res.status(400).json({ error: 'user_id, name, and message are required.' });
    }
    const adkResponse = await sendToAdkAgent({ user_id, name, message });
    
    res.json(adkResponse);
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