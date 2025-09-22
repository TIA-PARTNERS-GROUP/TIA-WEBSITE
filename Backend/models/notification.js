export default (db) => ({
  async getMyNotifications(receiverUserId) {
    try {
      const [rows] = await db.query(`
        SELECT 
          n.id,
          n.sender_user_id as sender_business_id,
          n.receiver_user_id as receiver_business_id, 
          n.message,
          n.time_sent,
          n.opened,
          b.name as sender_business_name,
          b.contact_name as sender_contact_name,
          b.contact_email as sender_contact_email
        FROM notifications n
        JOIN businesses b ON n.sender_user_id = b.id
        WHERE n.receiver_user_id = ? AND n.opened = 0
        ORDER BY n.time_sent DESC
      `, [receiverUserId]);
      
      return rows;
    } catch (error) {
      console.error('Database error in getMyNotifications:', error);
      
      // Fallback to basic query if join fails
      const [rows] = await db.query(`
        SELECT n.*
        FROM notifications n
        WHERE n.receiver_user_id = ? AND n.opened = 0
        ORDER BY n.time_sent DESC
      `, [receiverUserId]);
      
      return rows;
    }
  },

  async addNotification(senderUserId, receiverUserId, message) {
    const [result] = await db.query(`
      INSERT INTO notifications (sender_user_id, receiver_user_id, message, time_sent, opened)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP, 0)
    `, [senderUserId, receiverUserId, message]);
    return result.insertId;
  },

  async removeNotification(notificationId, userId) {
    const [result] = await db.query(`
      DELETE FROM notifications 
      WHERE id = ? AND (sender_user_id = ? OR receiver_user_id = ?)
    `, [notificationId, userId, userId]);
    return result.affectedRows;
  },

  async getNotificationById(notificationId) {
    const [rows] = await db.query(`
      SELECT * FROM notifications WHERE id = ?
    `, [notificationId]);
    return rows.length > 0 ? rows[0] : null;
  }
});