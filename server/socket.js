// socket.js
const socketIO = require("socket.io");

const setupSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: "https://blogbook-v1-1.onrender.com", // Allow frontend connection
            credentials: true,
        }
    });

    io.on("connection", (socket) => {
        // console.log("A new user connected:", socket.id);

        // Listen for new comments
        socket.on("newComment", (commentData) => {
            console.log("New comment received:", commentData);

            // Broadcast the comment to all clients
            io.emit("receiveComment", commentData);
        });

        socket.on("disconnect", () => {
            // console.log("User disconnected:", socket.id);
        });
    });

    return io;
};

module.exports = setupSocket;
