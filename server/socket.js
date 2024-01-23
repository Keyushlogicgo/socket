const handleSocket = async (io) => {
  io.on("connection", (socket) => {
    console.log(`socket connection: ${socket.id}`);

    socket.on("join", (id) => {
      const joinedRooms = Array.from(socket.rooms);
      joinedRooms.forEach((room) => {
        if (room !== socket.id) socket.leave(room);
      });
      socket.join(id);
    });

    socket.on("disconnect", (id) => {
      console.log(`socket disconnected: ${id}`);
    });
  });
};
export default handleSocket;
