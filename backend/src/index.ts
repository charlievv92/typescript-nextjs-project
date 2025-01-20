
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "#src/modules/redisClient.js";
import { swaggerUI, swaggerDocs } from "#src/modules/swagger.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import passport from "#src/config/passport";
import authRouter from "#src/routes/authRouter.js";
import boardRouter from "#src/routes/boardRouter.js";
import http from "http";
import { initializeSocket, getIO } from "#src/config/socket.js";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});
const app = express();
const PORT = process.env.port || 8000;

// 정적 파일 사용
app.use(express.static(path.join(__dirname, "/public")));

// CORS 설정
app.use(
  cors({
    origin: process.env.CLIENT_APP_URL, // 클라이언트의 도메인
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

// swagger UI 설정
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//json사용
app.use(bodyParser.json());
//쿠키갱신용
app.use(cookieParser());

// 로그인 세션 설정
app.use(
  session({
    //store: new RedisStore({ client: redisClient, ttl: 3600 }), // Redis에 세션 저장 ttl은 세션만료시간(초) , disableTouch: true 하면 TTL갱신 비활성화. 혹은 쿠키도 같이 리프레쉬 할지 결정해야함
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false, // 변경되지 않은 세션은 저장하지 않음
    saveUninitialized: false, // 초기화되지 않은 세션은 저장하지 않음
    cookie: {
      httpOnly: true,
      secure: false, // HTTPS가 아니므로 false
      sameSite: "lax",
      maxAge: 1 * 60 * 60 * 1000, // 1시간(ms)
    },
  })
);
/*
//세션이나 쿠키가 존재 할경우 요청이 있을때 쿠키 지속시간을 갱신합니다.
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  console.log(process.env.CLIENT_APP_URL);
  const io = getIO();

  if (req.originalUrl.startsWith("/api/auth/status")) {
    // 쿠키 리프레쉬
    if (req.session?.passport?.user) {
      console.log("Session:", req.session);
      console.log("Cookies:", req.cookies);
      req.session.touch(); // 세션 만료 시간을 갱신
      res.cookie("connect.sid", req.cookies["connect.sid"], {
        httpOnly: true,
        secure: false, // HTTPS 사용 시 true
        sameSite: "lax",
        maxAge: 1 * 60 * 60 * 1000, // 1시간(ms)
      });
      console.log("쿠키 만료 시간이 갱신되었습니다.");
    } else {
      // 세션이 없는 경우 처리
      console.log("세션이없음(비로그인)");
      if (!req.cookies["connect.sid"]) {
        io.emit("session-expired");
        console.log("쿠키없음, Context setUser Null");
      }
    }
  }

  next();
});
*/
// Passport 초기화
app.use(passport.initialize());
app.use(passport.session()); // Passport 세션 연결

//라우팅 별도 파일로 분리
app.use("/api/auth", authRouter);
app.use("/api/board", boardRouter);

app.get("/", (req: Request, res: Response) => {
  /*
  const sqlQuery = "INSERT INTO requested (rowno) VALUES (1)";
  db.query(sqlQuery, (err: Error, result: any) => {
    res.send("Success!!");
  });
  */
  console.log("Request received");
});

// 서버 실행
const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
  // 서버 실행 후 명세서를 확인할 수 있는 URL
  console.log("Swagger docs available at http://localhost:8000/api-docs");
});
