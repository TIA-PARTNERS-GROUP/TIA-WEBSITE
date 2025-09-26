export default (db) => ({
  // Get all tasks (daily activities)
  getAllTasks: async () => {
    const [tasks] = await db.query(
      'SELECT * FROM daily_activities ORDER BY id DESC'
    );
    return tasks;
  },

  // Get a single task by ID
  getTaskById: async (taskId) => {
    const [tasks] = await db.query(
      'SELECT * FROM daily_activities WHERE id = ?',
      [taskId]
    );
    return tasks[0];
  },

  // Get all tasks for a specific user (enrolled tasks)
  getUserTasks: async (userId) => {
    const [tasks] = await db.query(
      `SELECT da.* 
       FROM daily_activities da
       INNER JOIN daily_activity_enrolments dae ON da.id = dae.daily_activity_id
       WHERE dae.user_id = ?
       ORDER BY da.id DESC`,
      [userId]
    );
    return tasks;
  },

  // Enroll user in a task
  enrollUserInTask: async (userId, taskId) => {
    const [result] = await db.query(
      'INSERT INTO daily_activity_enrolments (daily_activity_id, user_id) VALUES (?, ?)',
      [taskId, userId]
    );
    return result.insertId;
  },

  // Unenroll user from a task
  unenrollUserFromTask: async (userId, taskId) => {
    const [result] = await db.query(
      'DELETE FROM daily_activity_enrolments WHERE daily_activity_id = ? AND user_id = ?',
      [taskId, userId]
    );
    return result.affectedRows > 0;
  },

  // Check if user is enrolled in a task
  isUserEnrolled: async (userId, taskId) => {
    const [rows] = await db.query(
      'SELECT 1 FROM daily_activity_enrolments WHERE daily_activity_id = ? AND user_id = ?',
      [taskId, userId]
    );
    return rows.length > 0;
  },

  // Get user's progress for a task on a specific date
  getUserTaskProgress: async (userId, taskId, date) => {
    const [rows] = await db.query(
      'SELECT progress FROM user_daily_activity_progress WHERE user_id = ? AND daily_activity_id = ? AND date = ?',
      [userId, taskId, date]
    );
    return rows[0] ? rows[0].progress : 0;
  },

  // Get user's progress for all tasks on a specific date
  getUserDailyProgress: async (userId, date) => {
    const [rows] = await db.query(
      `SELECT da.id, da.name, da.description, COALESCE(udap.progress, 0) as progress
       FROM daily_activities da
       INNER JOIN daily_activity_enrolments dae ON da.id = dae.daily_activity_id
       LEFT JOIN user_daily_activity_progress udap ON da.id = udap.daily_activity_id 
         AND udap.user_id = ? AND udap.date = ?
       WHERE dae.user_id = ?
       ORDER BY da.name`,
      [userId, date, userId]
    );
    return rows;
  },

  // Update user's progress for a task on a specific date
  updateUserTaskProgress: async (userId, taskId, date, progress) => {
    // Using ON DUPLICATE KEY UPDATE to handle both insert and update cases
    const [result] = await db.query(
      `INSERT INTO user_daily_activity_progress (user_id, daily_activity_id, date, progress)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE progress = ?`,
      [userId, taskId, date, progress, progress]
    );
    return result.affectedRows > 0;
  }
});
