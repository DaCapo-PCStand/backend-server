const StandRepository = require('../repositories/stand-repository');
const getConnection = require('../database/connection');

// 시리얼 번호로 stand 정보 조회
exports.findStandByNumber = (serialNumber) => {
    return new Promise(async(resolve, reject) => {
        
        // connection 생성
        const connection = getConnection();

        // 조회 repo 호출
        const results = await StandRepository.selectStandByNumber(connection, serialNumber);
        console.log('[stand-serivce] findStandByNumber : ', results);
        connection.end();
        
        // 조회 결과 반환
        resolve(results);
        
    })
}