# Vibecode Portfolio

A full-stack portfolio website with a React frontend and Node.js backend.

## Project Structure

```
vibecode-portfolio/
├── client/           # React Vite frontend
├── server/           # Node.js TypeScript backend
├── package.json      # Root package.json for managing both projects
└── README.md         # This file
```

## Setup Instructions

1. Clone the repository:
```bash
git clone <your-repo-url>
cd vibecode-portfolio
```

2. Install dependencies for all projects:
```bash
npm run install-all
```

3. Create environment files:
   - For the client: Create `.env` in the client directory
   - For the server: Create `.env` in the server directory

4. Start development servers:
```bash
# Start both client and server
npm run dev

# Or start them separately
npm run client    # Start only the client
npm run server    # Start only the server
```

## Available Scripts

- `npm run install-all`: Install dependencies for all projects
- `npm run dev`: Start both client and server in development mode
- `npm run client`: Start only the client
- `npm run server`: Start only the server

## Environment Variables

### Client (.env in client directory)
```
VITE_API_URL=http://localhost:5000
```

### Server (.env in server directory)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vibecode-portfolio
``` 