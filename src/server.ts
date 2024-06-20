import 'dotenv/config';
import './database/init.mongodb';
import './services/consumerNotification.service';
import './models/root.model';
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import NotificationService from './services/notification.service';

const app = express();

const server = http.createServer(app);

export const io = new Server(server, {
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
new NotificationService(io);

const PORT = process.env.PORT || 4056;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
