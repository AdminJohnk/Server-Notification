'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const { RABBITMQ_URL } = process.env;
class RabbitMQ {
    static instance;
    connection;
    channel;
    constructor() { }
    async connect() {
        try {
            this.connection = await amqplib_1.default.connect(RABBITMQ_URL);
            this.channel = await this.connection.createChannel();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    closeConnection() {
        try {
            setTimeout(() => {
                this.connection.close();
                process.exit(0);
            }, 500);
        }
        catch (error) {
            console.log('Error closing RabbitMQ connection', error);
            throw error;
        }
    }
    static async getInstance() {
        if (!RabbitMQ.instance) {
            RabbitMQ.instance = new RabbitMQ();
            await RabbitMQ.instance.connect();
        }
        return RabbitMQ.instance;
    }
}
exports.RabbitMQ = RabbitMQ;
//# sourceMappingURL=init.rabbit.js.map