# Coders4Coders (C4C) Platform

A real-time multiplayer coding platform for learning, competing, and having fun with code.

## 🎮 Games

- **Code Duel**: 1v1 real-time coding battles
- **Bug Hunter**: Race to fix bugs in broken code
- **Guess the Output**: Predict what the code will print

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. **Install root helper dependency**

```bash
npm install
```

2. **Install client and server dependencies**

```bash
npm run setup
```

3. **Start both apps from project root**

```bash
npm run dev
```

4. **Open** http://localhost:3000

### Manual alternative

If you prefer separate terminals manually:

1. **Install dependencies**

```bash
cd client && npm install
cd ../server && npm install
```

2. **Start the server**

```bash
cd server && npm run dev
```

3. **Start the client** (in a new terminal)

```bash
cd client && npm run dev
```

4. **Open** http://localhost:3000

## 🏗️ Architecture

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, Socket.io
- **Real-time**: WebSocket-based game synchronization

## 📁 Project Structure

```
c4c/
├── client/           # Next.js frontend
│   ├── app/          # Pages (App Router)
│   ├── components/   # React components
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Utilities
│   └── store/        # Zustand state
├── server/           # Node.js backend
│   └── src/
│       ├── socket/   # Socket.io handlers
│       ├── game/     # Game logic
│       └── types/    # TypeScript types
└── README.md
```

## 🎯 Features

- ✅ Modern, responsive UI
- ✅ Real-time multiplayer
- ✅ Server-authoritative game logic
- ✅ Code validation with test cases
- ✅ Animated countdown and results
- ✅ Score system with time bonus

## 🛠️ Development

### Root (Recommended)

```bash
npm run dev          # Run server + client together
npm run dev:server   # Run only server
npm run dev:client   # Run only client
npm run build        # Build both projects
```

### Client

```bash
cd client
npm run dev     # Development server
npm run build   # Production build
npm run lint    # Lint code
```

### Server

```bash
cd server
npm run dev     # Development server with hot reload
npm run build   # Compile TypeScript
npm start       # Production server
```

---

Built with ❤️ by Coders4Coders
