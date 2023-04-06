const express = require('express');
const app = express();

const {authMiddleware} = require('./src/auth/auth-middleware');

// 모든 도메인으로부터 CORS 방식의 HTTP 요청 허용
const cors = require('cors');
app.use(cors());

// http 요청의 body가 JSON 형태일 경우 JS 객체로 변환시켜줌
app.use(express.json());

// '/' 경로의 요청을 indexRouter로 연결
const indexRouter = require('./src/routes/index-route');
app.use('/', indexRouter);

// '/user' 경로의 요청을 userRouter로 연결
const userRouter =require('./src/routes/user-route.js');
app.use('/user', authMiddleware,  userRouter);

// '/stand' 경로의 요청을 standRouter로 연결
const registrationRouter = require('./src/routes/registration-route');
app.use('/stand-registration', authMiddleware, registrationRouter);

app.listen(8819, () => {
  console.log(`listening on port ${8819}`)
})
