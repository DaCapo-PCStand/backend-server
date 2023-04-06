const RegistrationRepository = require('../repositories/registration-repository');
const getConnection = require('../database/connection');

exports.insertRegistration = (info) => {
    return new Promise(async(resolve, reject) => {
        
        // connection 생성
        const connection = getConnection();

        // 트랜잭션 탐지 시작
        connection.beginTransaction();

        try{
            const insertResults = await RegistrationRepository.insertRegistration(connection, info);
            console.log('[registrationService] insertRegistration result :', insertResults);

            const insertedRegistration = await RegistrationRepository.selectRegistrationById(connection, insertResults.insertId);
            console.log('[registrationService] insertedRegistration:', insertedRegistration);
            
            connection.commit();
            resolve(insertedRegistration);
        } catch(err) {
            console.log('[registrationService] insert rollback');
            connection.rollback();
        } finally {
            console.log('[registrationService] connection closed');
            connection.end();
        }
        
    });
}

// 유저 id로 등록 정보 조회
exports.selectRegistrationByUser = (userId) => {
    return new Promise(async(resolve, reject)=>{
        const connection = getConnection();

        // 등록 정보 조회 repo 호출
        const results = await RegistrationRepository.selectRegistrationByUser(connection, userId);

        // 커넥션 종료
        connection.end();

        resolve(results);
    })
}