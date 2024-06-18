import { Namespace, Server } from 'socket.io';
import { INotiMessage, IUserInfo } from '../utils/type';
import { SOCKET_EVENTS } from '../utils/constants';
import { NotiClass } from '../models/notification.model';
import { Notification } from '../utils/notificationType';
import { FriendClass } from '../models/friend.model';
import { RabbitMQ } from '../database/init.rabbit';
import { UserClass } from '../models/user.model';
const { CREATEPOST_001 } = Notification;

const notiQueue = 'notificationQueueProcess';

export default class NotificationService {
  static io: Namespace;

  constructor(io: Server) {
    try {
      let notiService = io.of('/notification-service');
      NotificationService.io = notiService;
      notiService.on('connection', socket => {
        // Connect
        socket.on(SOCKET_EVENTS.SETUP, (userID: string) => {
          console.log(
            `A user with ID:${userID} has connected to notification service`
          );
          socket.join(userID);
          this.sendNotificationToUserJustOnline(userID);
        });
      });
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  async sendNotificationToUserJustOnline(userID: string) {
    const unreadNotifications = await NotiClass.getNotifyUnRead(userID);
    if (unreadNotifications.length > 0) {
      NotificationService.io
        .to(userID)
        .emit(SOCKET_EVENTS.NOTI_ARR, unreadNotifications);
    }
  }

  // Tạo mảng message thông báo tới các friend
  static async createMessagesToFriends(message: INotiMessage): Promise<any> {
    const friends: IUserInfo[] = await FriendClass.getAllFriends({
      user_id: message.sender
    });
    if (!friends) return [];

    const messages = friends.map(friend => ({
      ...message,
      kind: 'one_to_one',
      receiver: friend._id
    }));

    return messages;
  }

  static async handleNotify(message: INotiMessage) {
    if (message.kind === 'one_to_one') {
      const result = await NotiClass.createNotify(message);
      const newNoti = await NotiClass.getNotiByID(result._id.toString());
      await UserClass.setPlusUnRedNotiNumber(message.receiver);

      NotificationService.io
        .to(message.receiver)
        .emit(SOCKET_EVENTS.NOTI, newNoti);
    } else if (message.kind === 'one_to_many') {
      if (message.type === CREATEPOST_001.type) {
        const messages: INotiMessage[] =
          await NotificationService.createMessagesToFriends(message);

        // Phân phối thông báo đến queue
        const { channel } = await RabbitMQ.getInstance();
        messages.forEach(async (message: INotiMessage) => {
          channel.sendToQueue(notiQueue, Buffer.from(JSON.stringify(message)));
        });
      }
    }
  }
}
