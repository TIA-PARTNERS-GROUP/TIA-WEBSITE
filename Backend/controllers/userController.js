import db from "../config/db.js";
import userModel from "../models/user.js";

export const checkUserExists = async (req, res) => {
    try {
        const user = userModel(db);
        const {email} = req.params;
        const existingUser = await user.findByLoginEmail(email);
        if (existingUser == null) {
            return res.status(200).json( {
                message: "User does not exist",
                exists: false
            });
        }
        return res.status(200).json( {
                message: "User exists",
                exists: true
            });


    } catch (error) {
        console.error('', error);
        res.status(500).json({ success: false, message: error.message || 'Failed to process request' });
    }
};