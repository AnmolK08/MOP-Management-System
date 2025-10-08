import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const activeUsers = new Map();

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    const userId = socket.handshake.query.userId;
    if (userId) {
        activeUsers.set(userId, socket.id);
    }

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        if (userId) {
            activeUsers.delete(userId);
        }
    });
});

export { server, io, app };