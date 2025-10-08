import db from "../config/db.js";
import notificationModel from '../models/notification.js';
import userModel from '../models/user.js';

export const getMyNotifications = async (req, res) => {
  try {
    const notification = notificationModel(db);
    const userId = req.user.id;
    
    const notifications = await notification.getMyNotifications(userId);
    
    return res.status(200).json({
      message: "Success",
      notifications: notifications
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPendingConnections = async (req, res) => {
  try {
    const notification = notificationModel(db);

    const senderUserId = req.user.id;
    const pendingConnections = await notification.getPendingConnections(senderUserId);

    return res.status(200).json({
      message: "Success",
      pendingConnections: pendingConnections
    });
  } catch (error) {
    console.error('Error in getPendingConnections:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addNotification = async (req, res) => {
  try {
    const notification = notificationModel(db);
    const user = userModel(db);
    const { receiver_business_id, message } = req.body;
    const senderUserId = req.user.id;

    if (!receiver_business_id || !message) {
      return res.status(400).json({ message: "Receiver user ID and message are required" });
    }

    // Verify receiver user exists
    const receiverUser = await user.fetchOwnerFromBusinessId(receiver_business_id);
    if (!receiverUser) {
      return res.status(404).json({ message: "Receiver user not found" });
    }
    const receiver_user_id = receiverUser.operator_user_id;

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

    // Verify the notification exists and user has permission
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

export const setNotificationOpened = async (req, res) => {
  try {
    const notification = notificationModel(db);
    const { id } = req.body;
    const userId = req.user.id;

    if (!id) {
      return res.status(400).json({ message: "Notification ID is required" });
    }

    // Verify the notification exists and user has permission
    const notificationData = await notification.getNotificationById(id);
    if (!notificationData) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notificationData.receiver_user_id !== userId) {
      return res.status(403).json({ message: "Not authorized to modify this notification" });
    }

    const rowsAffected = await notification.setNotificationOpened(id);
    
    if (rowsAffected === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({ message: "Notification marked as opened" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};