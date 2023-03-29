const express = require('express');
const app = express();

// 모든 도메인으로부터 CORS 방식의 HTTP 요청 허용
const cors = require('cors');
app.use(cors());

// http 요청의 body가 JSON 형태일 경우 JS 객체로 변환시켜줌
app.use(express.json());

// '/auth' 경로의 요청을 authRouter로 연결
// const authRouter =require('./src/routes/auth-route.js');
// app.use('/auth', authRouter);

// '/member' 경로의 요청을 memberRouter로 연결
const memberRouter =require('./src/routes/member-route.js');
app.use('/member', memberRouter);


app.listen(8819, () => {
  console.log(`listening on port ${8819}`)
})
