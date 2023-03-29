// mysql 모듈 불러오기
const mysql = require('mysql');
// DB 연결 정보 모듈 불러오기
const connectionInfo = require('../config/db-config');

// 연결 정보 콘솔 log 찍기
console.log(connectionInfo);

// 연결 객체를 반환하는 메소드 객체를 export
module.exports = () => {
    // 연결 정보를 파라미터로 전달해 DB 연결 객체를 생성하여 리턴한다
    return mysql.createConnection(connectionInfo);
}