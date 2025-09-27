# 🚀 Clever Chat - Node.js Real-time Chat Application

**Created by Rajan Prajapati** 👨‍💻

Real-time chat application built with Node.js, Express, and Socket.IO! 

## ✨ Features

- 💬 **Real-time messaging** - Socket.IO ke saath instant chat
- 🏠 **Multiple chat rooms** - Different rooms mein chat kar sakte hai
- 👥 **Active users list** - Kaun online hai dekh sakte hai 
- ⌨️ **Typing indicators** - Pata chal jata hai kaun type kar raha hai
- 📝 **Message history** - Purane messages bhi save rehte hai
- 🌏 **Hinglish support** - Hindi aur English dono use kar sakte hai
- 🎨 **Modern UI** - Clean aur responsive design

## 🛠️ Technologies Used

- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web framework for Node.js
- **Socket.IO** - Real-time communication
- **UUID** - Unique ID generation
- **CORS** - Cross-origin requests
- **HTML/CSS/JavaScript** - Frontend

## 📁 Project Structure

```
clever-chat-nodejs-rajan/
├── 📄 package.json          # Dependencies aur scripts
├── 📄 index.js              # Main server file
├── 📄 README.md             # Ye documentation file
└── 📁 public/               # Static files (HTML, CSS, JS)
    ├── 📄 index.html        # Frontend HTML
    ├── 📄 style.css         # Styling
    └── 📄 script.js         # Client-side JavaScript
```

## ⚡ Quick Start

### 1. Prerequisites

Pehle ye check kar lo ki installed hai:

- **Node.js** (version 14 ya usse latest)
- **npm** (Node Package Manager)

### 2. Installation

```bash
# Repository clone karo
git clone https://github.com/RAJAN-115/clever-chat-nodejs-rajan.git

# Project directory mein jao
cd clever-chat-nodejs-rajan

# Dependencies install karo
npm install
```

### 3. Run karo

```bash
# Development mode mein run karo
npm run dev

# Ya production mode mein
npm start
```

### 4. Browser mein kholo

Server start hone ke baad ye URL kholo:
```
http://localhost:3000
```

## 🔥 Available Scripts

```bash
npm start       # Production server start karo
npm run dev     # Development server with auto-restart
npm test        # Tests run karo
```

## 📡 API Endpoints

### HTTP Routes

- `GET /` - Server status aur info page
- `GET /api/users` - Active users ki list
- `GET /api/rooms` - Available chat rooms

### Socket.IO Events

#### Client to Server Events:
- `join_user` - User ka join karna
- `send_message` - Naya message bhejana
- `typing_start` - Typing indicator on
- `typing_stop` - Typing indicator off
- `create_room` - Naya room banana
- `join_room` - Room mein join karna

#### Server to Client Events:
- `welcome_message` - Welcome message
- `receive_message` - Naya message receive
- `user_joined` - Naya user join hua
- `user_left` - User ne chhod diya
- `users_update` - Users list update
- `user_typing` - Typing status

## 🌟 Usage Examples

### Basic Chat

```javascript
// Client-side Socket.IO connection
const socket = io();

// User ko join kara do
socket.emit('join_user', {
    username: 'Rajan'
});

// Message bhejna
socket.emit('send_message', {
    text: 'Hello everyone!'
});

// Message receive karna
socket.on('receive_message', (message) => {
    console.log(`${message.username}: ${message.text}`);
});
```

## 🔧 Configuration

### Environment Variables

```env
PORT=3000                    # Server port
HOST=localhost              # Server host
NODE_ENV=production         # Environment
```

### Custom Settings

`index.js` file mein ye settings change kar sakte hai:

```javascript
// CORS settings
const io = socketIo(server, {
  cors: {
    origin: "*",              # Allowed origins
    methods: ["GET", "POST"]  # Allowed methods
  }
});

// Server configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
```

## 🚀 Deployment

### Heroku pe deploy karne ke liye:

```bash
# Heroku CLI install karo
# Heroku account banao

# Heroku app create karo
heroku create clever-chat-rajan

# Code push karo
git push heroku main

# App open karo
heroku open
```

### Railway/Render pe bhi deploy kar sakte hai:

1. GitHub repo connect karo
2. Build command: `npm install`
3. Start command: `npm start`
4. Port: `$PORT` environment variable use karo

## 🐛 Troubleshooting

### Common Issues:

**1. Port already in use:**
```bash
# Different port use karo
PORT=3001 npm start
```

**2. Dependencies not installed:**
```bash
# Dependencies dobara install karo
rm -rf node_modules package-lock.json
npm install
```

**3. Socket.IO connection issues:**
```javascript
// CORS properly configure karo
// Firewall check karo
```

## 🤝 Contributing

Contributions welcome hai! Please follow karo:

1. Fork this repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Rajan Prajapati**
- GitHub: [@RAJAN-115](https://github.com/RAJAN-115)
- Project: [clever-chat-nodejs-rajan](https://github.com/RAJAN-115/clever-chat-nodejs-rajan)

## 🙏 Acknowledgments

- Socket.IO team for amazing real-time library
- Node.js community
- Express.js framework
- All the developers jo open source contribute karte hai

## 📊 Stats

- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Real-time**: Socket.IO
- **Package Manager**: npm
- **Version Control**: Git

---

**Happy Coding! 🎉**

*Made with ❤️ by Rajan Prajapati*

*Agar koi issue hai to GitHub pe issue create kar do, main jaldi reply karunga! 😊*