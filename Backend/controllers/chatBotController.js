// Send a message in an existing conversation
export const sendMessage = async (req, res) => {
    try {

    } catch (error) {
        console.error('ah shit', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to process request'
        });
    }
}

// Save or update a user profile by receiving constructed json object defining the user details
export const saveProfile = async (req, res) => {
    try {

    } catch (error) {
        console.error('FUCK YOU BALTIMORE!', error)
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to save profile'
        });
    }
}

// Wipe history and restart conversation
export const restartConversation = async (req, res) => {
    try {

    } catch (error) {
        console.error('Average error message', error)
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to restart conversation'
        });
    }
}

// Creating a chat conversation for the user
// Attempt running resumeConversation
export const startConversation = async (req, res) => {
    try {
        // CHECK CHATBOT DB FOR PREVIOUS CONVO
            // ATTEMPT RESUME
        // CREATE NEW IF NOTHING IS FOUND
    } catch (error) {
        console.error('console.error', error)
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to start conversation'
        });
    }
}