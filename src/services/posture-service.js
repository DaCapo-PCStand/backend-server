const PostureRepository = require('../repositories/posture-repository');
const getConnection = require('../database/connection');



exports.insertPostureLog = (data) => {
    return new Promise(async(resolve, reject) => {
        
        // connection 생성
        const connection = getConnection();

        connection.beginTransaction();
        
        try {
            // 삽입 repo 호출
            const results =  await PostureRepository.insertPostureLog(connection, data);

            console.log('[stand-serivce] insertPostureLog res: ', results);

            const insertedLog = await PostureRepository.selectPostureLogById(connection, results.insertId)
            console.log('[stand-serivce] selectPostureLogById res: ', insertedLog);

            console.log('[stand-serivce] insertPostureLog commit');
            connection.commit();
            resolve(insertedLog);
            

        } catch(err){
            console.log('[stand-serivce] insertPostureLog rollback');
            connection.rollback();
        } finally {
            console.log('[stand-serivce] insertPostureLog connection end');
            connection.end();
        }
    
        
    })
}


exports.findPostureLogOfWeek = (data) => {
    return new Promise(async(resolve, reject) => {
        
        // connection 생성
        const connection = getConnection();

        // 조회 repo 호출
        const results = await PostureRepository.selectPostureLogsOfWeek(connection, data);
        console.log('[stand-serivce] findPostureLogOfWeek : ', results);
        connection.end();
        
        // 조회 결과 반환
        resolve(results);
        
    })
}


exports.findPostureLogOfDay = (data) => {
    return new Promise(async(resolve, reject) => {
        
        // connection 생성
        const connection = getConnection();

        // 조회 repo 호출
        const results = await PostureRepository.selectPostureLogsOfDay(connection,data);
        console.log('[stand-serivce] findPostureLogOfDay : ', results);
        connection.end();
        
        // 조회 결과 반환
        resolve(results);
        
    })
}