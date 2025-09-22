import api from "./axios";

export function getCurrentUserNotifications() {
    return api.get('/notifications/mynotifications');
};

export function addNotification(receiverUserId, message) {
    return api.post('/notifications/addnotification',
        { receiver_user_id: receiverUserId, message: message }
    );
};

export function removeNotification(notificationId) {
    return api.delete('/notifications/removenotification', {
        data: { id: notificationId }
    });
}