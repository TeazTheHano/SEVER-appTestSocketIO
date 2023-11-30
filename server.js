const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();

const io = socketIo(server, {
    cors: {
        // origin: "http://localhost",
        origin: "27.72.88.46", // Include the protocol (http://) here
        methods: ["GET", "POST"]
    }
});

const PORT = 3111; 

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (message, ack) => {
        console.log('Received message:', message);
        io.emit('message', message);
        if (ack) {
            ack(true); // Send acknowledgment back to the client
        }
    });


    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

io.on('error', (error) => {
    console.error('Socket.IO error:', error);
});


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
