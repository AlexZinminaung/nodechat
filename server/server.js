
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const socketHandler = require('./socket/socket')
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 3000;


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});

// middlewares
// CORS for HTTP routes
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));



app.get('/', (req, res) => {
    res.send("This is Home Route")
})

// add socket handler here
socketHandler(io);




server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
})
