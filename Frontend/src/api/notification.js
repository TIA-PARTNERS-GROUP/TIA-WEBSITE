import api from "./axios";

export function getCurrentUserNotifications() {
    return api.get('/notifications/mynotifications');
};

export function getCurrentUserPendingConnections() {
    return api.get('/notifications/pendingconnections');
};

export function addNotification(receiverUserId, message) {
    return api.post('/notifications/addnotification',
        { receiver_business_id: receiverUserId, message: message }
    );
};

export function removeNotification(notificationId) {
    return api.delete('/notifications/removenotification', {
        data: { id: notificationId }
    });
}

export function setNotificationOpened(notificationId) {
    return api.patch('/notifications/setOpened',
        { 
            id: notificationId
        }
    );
}