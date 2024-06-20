"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const notification_model_1 = require("../models/notification.model");
const notificationType_1 = require("../utils/notificationType");
const friend_model_1 = require("../models/friend.model");
const init_rabbit_1 = require("../database/init.rabbit");
const user_model_1 = require("../models/user.model");
const { CREATEPOST_001 } = notificationType_1.Notification;
const notiQueue = 'notificationQueueProcess';
class NotificationService {
    static io;
    constructor(io) {
        try {
            let notiService = io.of('/notification-service');
            NotificationService.io = notiService;
            notiService.on('connection', socket => {
                // Connect
                socket.on(constants_1.SOCKET_EVENTS.SETUP, (userID) => {
                    console.log(`A user with ID:${userID} has connected to notification service`);
                    socket.join(userID);
                    this.sendNotificationToUserJustOnline(userID);
                });
            });
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async sendNotificationToUserJustOnline(userID) {
        const unreadNotifications = await notification_model_1.NotiClass.getNotifyUnRead(userID);
        if (unreadNotifications.length > 0) {
            NotificationService.io
                .to(userID)
                .emit(constants_1.SOCKET_EVENTS.NOTI_ARR, unreadNotifications);
        }
    }
    // Tạo mảng message thông báo tới các friend
    static async createMessagesToFriends(message) {
        const friends = await friend_model_1.FriendClass.getAllFriends({
            user_id: message.sender
        });
        if (!friends)
            return [];
        const messages = friends.map(friend => ({
            ...message,
            kind: 'one_to_one',
            receiver: friend._id
        }));
        return messages;
    }
    static async handleNotify(message) {
        if (message.kind === 'one_to_one') {
            const result = await notification_model_1.NotiClass.createNotify(message);
            const newNoti = await notification_model_1.NotiClass.getNotiByID(result._id.toString());
            await user_model_1.UserClass.setPlusUnRedNotiNumber(message.receiver);
            NotificationService.io
                .to(message.receiver)
                .emit(constants_1.SOCKET_EVENTS.NOTI, newNoti);
        }
        else if (message.kind === 'one_to_many') {
            if (message.type === CREATEPOST_001.type) {
                const messages = await NotificationService.createMessagesToFriends(message);
                // Phân phối thông báo đến queue
                const { channel } = await init_rabbit_1.RabbitMQ.getInstance();
                messages.forEach(async (message) => {
                    channel.sendToQueue(notiQueue, Buffer.from(JSON.stringify(message)));
                });
            }
        }
    }
}
exports.default = NotificationService;
//# sourceMappingURL=notification.service.js.map