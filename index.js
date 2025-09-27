// Clever Chat - Node.js Real-time Chat Application
// Created by Rajan Prajapati
// Modern chat application with Socket.IO and Express

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const path = require('path');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store active users and rooms
let activeUsers = new Map();
let chatRooms = new Map();

// Default room
chatRooms.set('general', {
  id: 'general',
  name: 'General Chat',
  users: new Set(),
  messages: []
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`👋 User connected: ${socket.id}`);

  // User joins with username
  socket.on('join_user', (userData) => {
    const user = {
      id: socket.id,
      username: userData.username || `User_${socket.id.slice(-4)}`,
      joinedAt: new Date(),
      currentRoom: 'general'
    };
    
    activeUsers.set(socket.id, user);
    
    // Join general room by default
    socket.join('general');
    chatRooms.get('general').users.add(socket.id);
    
    // Send welcome message
    socket.emit('welcome_message', {
      message: `Namaste ${user.username}! Clever Chat mein welcome hai! 🎉`,
      timestamp: new Date()
    });
    
    // Notify others about new user
    socket.to('general').emit('user_joined', {
      username: user.username,
      message: `${user.username} chat mein join ho gaya!`,
      timestamp: new Date()
    });
    
    // Send updated user list
    io.to('general').emit('users_update', Array.from(chatRooms.get('general').users)
      .map(id => activeUsers.get(id)?.username)
      .filter(Boolean)
    );
    
    console.log(`✅ ${user.username} joined the chat`);
  });

  // Handle new messages
  socket.on('send_message', (messageData) => {
    const user = activeUsers.get(socket.id);
    if (!user) return;
    
    const message = {
      id: uuidv4(),
      username: user.username,
      text: messageData.text,
      timestamp: new Date(),
      room: user.currentRoom
    };
    
    // Store message in room
    chatRooms.get(user.currentRoom).messages.push(message);
    
    // Broadcast message to room
    io.to(user.currentRoom).emit('receive_message', message);
    
    console.log(`💬 ${user.username}: ${message.text}`);
  });

  // Handle typing indicator
  socket.on('typing_start', () => {
    const user = activeUsers.get(socket.id);
    if (!user) return;
    
    socket.to(user.currentRoom).emit('user_typing', {
      username: user.username,
      isTyping: true
    });
  });

  socket.on('typing_stop', () => {
    const user = activeUsers.get(socket.id);
    if (!user) return;
    
    socket.to(user.currentRoom).emit('user_typing', {
      username: user.username,
      isTyping: false
    });
  });

  // Handle room creation
  socket.on('create_room', (roomData) => {
    const roomId = uuidv4();
    const newRoom = {
      id: roomId,
      name: roomData.name,
      users: new Set(),
      messages: [],
      createdBy: activeUsers.get(socket.id)?.username,
      createdAt: new Date()
    };
    
    chatRooms.set(roomId, newRoom);
    
    // Send updated room list to all users
    io.emit('rooms_update', Array.from(chatRooms.values())
      .map(room => ({
        id: room.id,
        name: room.name,
        userCount: room.users.size
      }))
    );
    
    console.log(`🏠 New room created: ${newRoom.name}`);
  });

  // Handle room joining
  socket.on('join_room', (roomId) => {
    const user = activeUsers.get(socket.id);
    if (!user || !chatRooms.has(roomId)) return;
    
    // Leave current room
    socket.leave(user.currentRoom);
    chatRooms.get(user.currentRoom).users.delete(socket.id);
    
    // Join new room
    socket.join(roomId);
    chatRooms.get(roomId).users.add(socket.id);
    user.currentRoom = roomId;
    
    // Send room messages
    socket.emit('room_messages', chatRooms.get(roomId).messages);
    
    // Send updated user lists
    io.to(roomId).emit('users_update', 
      Array.from(chatRooms.get(roomId).users)
        .map(id => activeUsers.get(id)?.username)
        .filter(Boolean)
    );
    
    console.log(`🚪 ${user.username} joined room: ${chatRooms.get(roomId).name}`);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      // Remove from current room
      if (chatRooms.has(user.currentRoom)) {
        chatRooms.get(user.currentRoom).users.delete(socket.id);
        
        // Notify others about user leaving
        socket.to(user.currentRoom).emit('user_left', {
          username: user.username,
          message: `${user.username} ne chat chhod diya 👋`,
          timestamp: new Date()
        });
        
        // Send updated user list
        io.to(user.currentRoom).emit('users_update',
          Array.from(chatRooms.get(user.currentRoom).users)
            .map(id => activeUsers.get(id)?.username)
            .filter(Boolean)
        );
      }
      
      activeUsers.delete(socket.id);
      console.log(`👋 ${user.username} disconnected`);
    }
  });
});

// API Routes
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; text-align: center; border: 2px solid #007acc; border-radius: 10px;">
      <h1 style="color: #007acc;">🚀 Clever Chat - Node.js Server</h1>
      <p style="font-size: 18px; margin: 20px 0;">Created by <strong>Rajan Prajapati</strong></p>
      <p style="color: #666; margin: 20px 0;">Real-time Chat Application with Socket.IO</p>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333;">🌟 Features:</h3>
        <ul style="text-align: left; display: inline-block;">
          <li>Real-time messaging with Socket.IO</li>
          <li>Multiple chat rooms</li>
          <li>User typing indicators</li>
          <li>Active user list</li>
          <li>Message history</li>
          <li>Hinglish support</li>
        </ul>
      </div>
      <div style="margin: 30px 0;">
        <p><strong>Server Status:</strong> <span style="color: green;">✅ Running</span></p>
        <p><strong>Active Users:</strong> ${activeUsers.size}</p>
        <p><strong>Chat Rooms:</strong> ${chatRooms.size}</p>
      </div>
      <p style="color: #888; font-size: 14px;">Build aur run karne ke liye README.md check kariye!</p>
    </div>
  `);
});

// Get active users
app.get('/api/users', (req, res) => {
  const users = Array.from(activeUsers.values()).map(user => ({
    username: user.username,
    joinedAt: user.joinedAt,
    currentRoom: user.currentRoom
  }));
  res.json(users);
});

// Get chat rooms
app.get('/api/rooms', (req, res) => {
  const rooms = Array.from(chatRooms.values()).map(room => ({
    id: room.id,
    name: room.name,
    userCount: room.users.size,
    messageCount: room.messages.length
  }));
  res.json(rooms);
});

// Server configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

server.listen(PORT, () => {
  console.log('\n🚀 =================================');
  console.log('🎉 Clever Chat Server Started!');
  console.log('👨‍💻 Created by: Rajan Prajapati');
  console.log(`🌐 Server: http://${HOST}:${PORT}`);
  console.log('⚡ Socket.IO: Ready for real-time chat');
  console.log('🚀 =================================\n');
});

// Export for testing
module.exports = { app, server, io };