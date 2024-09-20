const { Server } = require('socket.io');

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // This allows all origins, but you should configure CORS properly in production.
        }
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Listen for incoming messages from the client
        socket.on('sendMessage', (messageData) => {
            console.log('Message received:', messageData);

            // Broadcast the message to all connected clients
            io.emit('receiveMessage', messageData);
        });

        // Handle when a user disconnects
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
};

module.exports = initializeSocket;
