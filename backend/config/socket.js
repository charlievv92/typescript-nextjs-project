const { Server } = require("socket.io");

let io;
const userSocketMap = {};

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // React 앱 주소
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {

    // 사용자 로그인 이벤트 처리
    socket.on("user-login", (email) => {
      if (!email) {
        console.error("email이 제공되지 않았습니다.");
        return;
      }
      userSocketMap[email] = socket.id; // 사용자 ID와 소켓 ID 매핑
      console.log(`사용자 ${email} 연결됨.`);
    });

    // 로그아웃 시 매핑 제거
    socket.on("user-logout", (email) => {
      if (userSocketMap[email] === socket.id) {
        delete userSocketMap[email];
        console.log(`사용자 ${email} 로그아웃 처리됨.`);
      }
    });

    // 연결 해제 시 매핑 제거
    socket.on("disconnect", () => {
      for (const [email, socketId] of Object.entries(userSocketMap)) {
        if (socketId === socket.id) {
          delete userSocketMap[email];
          console.log(`소켓 연결 끊김: ${email}`);
        }
      }
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO가 초기화되지 않았습니다.");
  }
  return io;
};

module.exports = { initializeSocket ,getIO };