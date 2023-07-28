const express =require("express");
const cookieParser = require("cookie-parser");
const cookieRouter = require("./src/routers/cookie/cookie_router");

const sessionRouter = require("./src/routers/session/session_router");
const session = require("express-session");
const sessionConfig = require("./config/cookie_session/config");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.set("views", "./src/views");
app.set("view engine", "ejs");


app.use(cookieParser("아무값이나키로설정") ); //이 값을 토대로 쿠키를 암호화해서 사용자에게 보내주겠다
app.use(session(sessionConfig.sessionConfig));

app.use("/cookie", cookieRouter); //미들웨어
app.use("/session",sessionRouter);


app.listen(3000, ()=>{console.log("3000 서버 구동");});