export default (db) => ({
  async getMyNotifications(receiverUserId) {
    try {
      const [rows] = await db.query(`
        SELECT 
          n.id,
          n.sender_user_id,
          sb.id AS sender_business_id,
          CONCAT(su.first_name, ' ', su.last_name) AS sender_name,
          sb.name AS sender_business_name,
          
          n.receiver_user_id,
          rb.id AS receiver_business_id,
          CONCAT(ru.first_name, ' ', ru.last_name) AS receiver_name,
          rb.name AS receiver_business_name,
          
          n.message,
          n.time_sent,
          n.opened
        FROM notifications n
        JOIN users su ON n.sender_user_id = su.id
        LEFT JOIN businesses sb ON sb.operator_user_id = su.id
        
        JOIN users ru ON n.receiver_user_id = ru.id
        LEFT JOIN businesses rb ON rb.operator_user_id = ru.id
        
        WHERE n.receiver_user_id = ?
        ORDER BY n.time_sent DESC
      `, [receiverUserId]);

      return rows;
    } catch (error) {
      console.error('Database error in getMyNotifications:', error);

      const [rows] = await db.query(`
        SELECT n.*
        FROM notifications n
        WHERE n.receiver_user_id = ? AND n.opened = 0
        ORDER BY n.time_sent DESC
      `, [receiverUserId]);

      return rows;
    }
  },

  async getPendingConnections(senderUserId) {
    try {
      const [rows] = await db.query(`
        SELECT 
          n.id AS notification_id,
          n.receiver_user_id,
          rb.id AS receiver_business_id
        FROM notifications n
        JOIN users su ON n.sender_user_id = su.id
        LEFT JOIN businesses rb ON rb.operator_user_id = n.receiver_user_id
        WHERE n.sender_user_id = ?
          AND LOWER(TRIM(n.message)) = 'connect'
          AND n.opened = 0
        ORDER BY n.time_sent DESC
      `, [senderUserId]);

      return rows;
    } catch (error) {
      console.error('Database error in getPendingConnections:', error);

      // Fallback query
      const [rows] = await db.query(`
        SELECT 
          n.id AS notification_id,
          n.receiver_user_id,
          NULL AS receiver_business_id
        FROM notifications n
        WHERE n.sender_user_id = ?
          AND LOWER(TRIM(n.message)) = 'connect'
          AND n.opened = 0
        ORDER BY n.time_sent DESC
      `, [senderUserId]);

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
  },

  async setNotificationOpened(notificationId) {
    const [result] = await db.query(`
      UPDATE notifications 
      SET opened = 1 
      WHERE id = ?
    `, [notificationId]);
    return result.affectedRows;
  },
});