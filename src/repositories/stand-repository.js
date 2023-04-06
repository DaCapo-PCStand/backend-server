const standQuery = require('../database/stand-query');
const StandDTO = require('../dto/stand-response-dto');
// 거치대 등록 정보 insert
exports.selectStandByNumber = (connection, serialNumber) => {
    return new Promise((resolve, reject) => {
        connection.query(
            standQuery.selectStandByNumber(), 
            [serialNumber],
            (err, results, fields) => {
            
            // 에러 발생시 로그 출력 후 reject
            if(err) {
                console.log('selectStandByNumber repo err', err);
                reject(err);
            }

            // 쿼리 결과를 콘솔로 확인
            console.log('selectStandByNumber repo results: ', results);

            let stands = [];
            for(let i=0; i<results.length; i++) {
                stands.push(new StandDTO(results[i]));
            }
            // 조회 결과 반환 
            resolve(stands);
        })
    })
}
