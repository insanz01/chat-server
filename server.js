const io = require("socket.io")(3000);

const users = {};

io.on("connection", (socket) => {
  // socket.on("new-user", (name) => {
  //   users[socket.id] = name;
  //   socket.broadcast.emit("user-connected", name);
  // });
  // socket.on("send-chat-message", (message) => {
  //   socket.broadcast.emit("chat-message", {
  //     message: message,
  //     name: users[socket.id],
  //   });
  // });
  // socket.on("disconnect", () => {
  //   socket.broadcast.emit("user-disconnected", users[socket.id]);
  //   delete users[socket.id];
  // });

  socket.on("newUser", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("userConnected", name);
  });
  // socket.on("sendChatMessage", (message) => {
  //   socket.broadcast.emit("chatMessage", {
  //     message: message,
  //     name: users[socket.id],
  //   });
  // });
  socket.on("joinRoom", (roomId, userName) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("userConnected", userName);
    socket.on("sendChatMessage", (message) => {
      io.to(roomId).emit("chatMessage", message);
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("userDisconnected", users[socket.id]);
    delete users[socket.id];
  });
});
