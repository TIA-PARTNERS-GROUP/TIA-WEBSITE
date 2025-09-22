import db from "../config/db.js";
import notificationModel from '../models/notification.js';
import userModel from '../models/user.js';

export const getMyNotifications = async (req, res) => {
  try {
    const notification = notificationModel(db);
    const user = userModel(db);
    
    // Get user's business ID
    const businessResult = await user.fetchBusinessFromOwnerId(req.user.id);
    if (!businessResult) {
      return res.status(404).json({ message: "No business found for user" });
    }
    
    const businessId = businessResult.id;
    const notifications = await notification.getMyNotifications(businessId);
    
    return res.status(200).json({
      message: "Success",
      notifications: notifications
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addNotification = async (req, res) => {
  try {
    const notification = notificationModel(db);
    const user = userModel(db);
    const { receiver_user_id, message } = req.body;
    const senderUserId = req.user.id;

    if (!receiver_user_id || !message) {
      return res.status(400).json({ message: "Receiver user ID and message are required" });
    }

    const receiverUser = await user.findById(receiver_user_id);
    if (!receiverUser) {
      return res.status(404).json({ message: "Receiver user not found" });
    }

    const notificationId = await notification.addNotification(
      senderUserId, 
      receiver_user_id, 
      message
    );

    return res.status(201).json({
      message: "Notification added",
      notificationId: notificationId
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeNotification = async (req, res) => {
  try {
    const notification = notificationModel(db);
    const { id } = req.body;
    const userId = req.user.id;

    if (!id) {
      return res.status(400).json({ message: "Notification ID is required" });
    }

    const notificationData = await notification.getNotificationById(id);
    if (!notificationData) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notificationData.sender_user_id !== userId && 
        notificationData.receiver_user_id !== userId) {
      return res.status(403).json({ message: "Not authorized to remove this notification" });
    }

    const rowsAffected = await notification.removeNotification(id, userId);
    
    if (rowsAffected === 0) {
      return res.status(404).json({ message: "Notification not found or already removed" });
    }

    return res.status(200).json({ message: "Notification removed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};