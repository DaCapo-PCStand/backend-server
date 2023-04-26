const postureQuery = require('../database/posture-query');
const PostureLogDTO = require('../dto/posture-log-response-dto');
exports.insertPostureLog = (connection, data) => {
    return new Promise((resolve, reject) => {
        connection.query(
            postureQuery.insertPostureLog(), 
            [data.logDate, data.sittingTime, data.straightTime, data.badTime, data.userId],
            (err, results, fields) => {
            
            // 에러 발생시 로그 출력 후 reject
            if(err) {
                console.log('selectStandByNumber repo err', err);
                reject(err);
            }

            // 쿼리 결과를 콘솔로 확인
            console.log('selectStandByNumber repo results: ', results);

            // 조회 결과 반환 
            resolve(results);
        })
    })
}


exports.selectPostureLogsOfWeek = (connection, {userId, lastDate}) => {
    return new Promise((resolve, reject) => {
        connection.query(
            postureQuery.seletPostureLogOfWeek(), 
            [lastDate, lastDate, userId],
            (err, results, fields) => {
            
            // 에러 발생시 로그 출력 후 reject
            if(err) {
                console.log('findPostureLogOfWeek repo err', err);
                reject(err);
            }

            // 쿼리 결과를 콘솔로 확인
            console.log('findPostureLogOfWeek repo results: ', results);

            // 조회 결과 dto 변환
            let logs = [];
            for(var i=0; i<results.length; i++) {
                logs.push(new PostureLogDTO(results[i]));
            }
            // 조회 결과 반환 
            resolve(logs);
        })
    })
}


exports.selectPostureLogsOfDay = (connection, {userId, date}) => {
    return new Promise((resolve, reject) => {
        connection.query(
            postureQuery.seletPostureLogOfDay(), 
            [date, userId],
            (err, results, fields) => {
            
            // 에러 발생시 로그 출력 후 reject
            if(err) {
                console.log('findPostureLogOfDay repo err', err);
                reject(err);
            }

            // 쿼리 결과를 콘솔로 확인
            console.log('findPostureLogOfDay repo results: ', results);

            // 조회 결과 dto 변환
            let logs = [];
            for(var i=0; i<results.length; i++) {
                logs.push(new PostureLogDTO(results[i]));
            }
            // 조회 결과 반환 
            resolve(logs);
        })
    })
}



exports.selectPostureLogById = (connection, id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            postureQuery.selectPostureLogById(), 
            [id],
            (err, results, fields) => {
            
            // 에러 발생시 로그 출력 후 reject
            if(err) {
                console.log('findPostureLogOfDay repo err', err);
                reject(err);
            }

            // 쿼리 결과를 콘솔로 확인
            console.log('findPostureLogOfDay repo results: ', results);

            // 조회 결과 dto 변환
            let logs = [];
            for(var i=0; i<results.length; i++) {
                logs.push(new PostureLogDTO(results[i]));
            }
            // 조회 결과 반환 
            resolve(logs);
        })
    })
}


