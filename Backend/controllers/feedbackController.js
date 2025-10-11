import db from "../config/db.js";
import userModel from '../models/user.js';
import feedbackModel from '../models/feedback.js'

export const submitFeedback = async (req, res) => {
    try {
        const feedback = feedbackModel(db);
        const {content} = req.body;
        if (!content) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        await feedback.addFeedback(req.user.id, content);
        // potentially email feedback somewhere at this point
        return res.status(201).json({message:"Success"});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
}