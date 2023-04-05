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

            let stand = {};
            if(results.length === 1){
                stand = new StandDTO(results[0]);
            }
            // 조회 결과 반환 
            resolve(stand);
        })
    })
}
