"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_rabbit_1 = require("../database/init.rabbit");
const notification_service_1 = __importDefault(require("./notification.service"));
const notificationExchange = 'notificationEx';
const notiQueue = 'notificationQueueProcess';
const notificationExchangeDLX = 'notificationExDLX';
const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX';
class ConsumerNotiService {
    channel;
    connection;
    static instance;
    constructor() { }
    async connectRabbitMQ() {
        const { channel, connection } = await init_rabbit_1.RabbitMQ.getInstance();
        this.channel = channel;
        this.connection = connection;
    }
    async consumeNotify() {
        try {
            const channel = this.channel;
            channel.prefetch(400);
            // 1. create Exchange
            await channel.assertExchange(notificationExchange, 'direct', {
                durable: true
            });
            // 2. create Queue
            // Lỗi ở NotiQueue --> chuyển đến queue liên kết với Exchange DLX và RoutingKey DLX
            const queueResult = await channel.assertQueue(notiQueue, {
                exclusive: false, // cho phép các kết nối khác truy cập đến cùng một hàng đợi
                durable: true,
                deadLetterExchange: notificationExchangeDLX,
                deadLetterRoutingKey: notificationRoutingKeyDLX
            });
            // 3. bindQueue (gắn Queue vào Exchange)
            await channel.bindQueue(queueResult.queue, notificationExchange, notiQueue);
            // 4. consume Queue
            channel.consume(notiQueue, async (msg) => {
                try {
                    // Nghiệp vụ logic
                    const message = JSON.parse(msg.content.toString());
                    console.log('Message: ', message);
                    await notification_service_1.default.handleNotify(message);
                    channel.ack(msg);
                }
                catch (error) {
                    console.error(error);
                    channel.nack(msg, false, false);
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    async consumeNotifyFailed() {
        try {
            const channel = this.channel;
            const notiQueueHandler = 'notificationQueueHotFix';
            // 1. create Exchange
            await channel.assertExchange(notificationExchangeDLX, 'direct', {
                durable: true
            });
            // 2. create Queue riêng của DLX Exchange
            const queueResult = await channel.assertQueue(notiQueueHandler, {
                durable: true,
                exclusive: false
            });
            // 3. bindQueue
            await channel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX);
            channel.get(queueResult.queue, { noAck: true });
            await channel.consume(queueResult.queue, async (msg) => {
                // Nghiệp vụ logic
                console.log('Notification Queue Hot Fix');
                const message = JSON.parse(msg.content.toString());
                console.log('Message: ', message);
                await notification_service_1.default.handleNotify(message);
            }, { noAck: true });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async runNotificationConsumer() {
        await this.connectRabbitMQ();
        await this.consumeNotify()
            .then(() => {
            console.log(`ConsumeNotify started`);
        })
            .catch(err => {
            console.error(`Message Error: ${err.message}`);
        });
        await this.consumeNotifyFailed()
            .then(() => {
            console.log(`ConsumeNotifyFailed started`);
        })
            .catch(err => {
            console.error(`Message Error: ${err.message}`);
        });
    }
    static getInstance() {
        if (!ConsumerNotiService.instance) {
            ConsumerNotiService.instance = new ConsumerNotiService();
            ConsumerNotiService.instance.runNotificationConsumer();
        }
        return ConsumerNotiService.instance;
    }
}
const instanceNoti = ConsumerNotiService.getInstance();
exports.default = instanceNoti;
//# sourceMappingURL=consumerNotification.service.js.map