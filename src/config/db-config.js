// dotenv 모듈 임포트
const dotenv = require('dotenv');

// .env 파일에 정의된 키:벨류 값을 process.env로 로드
dotenv.config();
console.log(process.env);

// process.env에 담긴 연결 정보를 객체 형식으로 반환
module.exports = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
}