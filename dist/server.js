"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require("dotenv/config");
require("./database/init.mongodb");
require("./services/consumerNotification.service");
require("./models/root.model");
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const notification_service_1 = __importDefault(require("./services/notification.service"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: [
            process.env.CLIENT_URL_LOCAL,
            process.env.ADMIN_URL_LOCAL,
            process.env.CLIENT_URL,
            process.env.ADMIN_URL
        ]
    },
    pingTimeout: 60000
});
// Run notification service
new notification_service_1.default(exports.io);
const PORT = process.env.PORT || 4056;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map