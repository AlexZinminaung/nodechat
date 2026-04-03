
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const socketHandler = require('./socket/socket')
require('dotenv').config();

const port = process.env.PORT 


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});


app.get('/', (req, res) => {
    res.send("This is Home Route")
})

// add socket handler here
socketHandler(io);




server.listen(3000, () => {
    console.log(`server running at http://localhost:${port}`);
})
