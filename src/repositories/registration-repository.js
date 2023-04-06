const registrationQuery = require('../database/registration-query');
const RegistrationDTO = require('../dto/registration-response-dto');

// 거치대 등록 정보 insert
exports.insertRegistration = (connection, info) => {
    return new Promise((resolve, reject) => {
        connection.query(
            registrationQuery.insertRegistration(), 
            [info.userId, info.standId],
            (err, results, fields) => {
            
            // 에러 발생시 로그 출력 후 reject
            if(err) {
                console.log('insertRegistration repo err', err);
                reject(err);
            }

            // 쿼리 결과를 콘솔로 확인
            console.log('insertRegistration repo results: ', results);

            // 조회 결과 반환 
            resolve(results);
        })
    })
}


// 등록 id로 등록 정보 조회
exports.selectRegistrationById = (connection, registrationId) => {
    return new Promise((resolve, reject)=>{
       connection.query(
        registrationQuery.selectRegistrationById(),
        [registrationId],
        (err, results, fields) => {
            if(err) {
                console.log('registration repo err');
                reject(err);
            }

            console.log('selectRegistrationById repo results :', results);

            let registration = {};
            if(results.length === 1) {
                registration = new RegistrationDTO(results[0]);
            }

            resolve(registration);
        }
       ) 
    });
} 

exports.selectRegistrationByStand = (connection, standId) => {
    return new Promise((resolve, reject)=>{
       connection.query(
        registrationQuery.selectRegistrationByStand(),
        [standId],
        (err, results, fields) => {
            if(err) {
                console.log('registration repo err');
                reject(err);
            }

            console.log('selectRegistrationById repo results :', results);

            let registration = {};
            if(results.length === 1) {
                registration = new RegistrationDTO(results[0]);
            }

            resolve(registration);
        }
       ) 
    });
} 

// 특정 회원의 거치대 등록 정보 조회
exports.selectRegistrationByUser = (connection, userId) => {
    return new Promise((resolve, reject)=>{
        connection.query(
            registrationQuery.selectRegistrationByUser(),
            [userId],
            (err, results, fields)=>{
                if(err) {
                    console.log("selectRegistrationByUser repo err");
                    reject(err);
                }

                console.log("selectRegistrationByUser repo results:", results);
                let registration;
                if(results.length >= 1) {
                    registration = new RegistrationDTO(results[0]);
                }
                resolve(registration);
            }
        )
    });
}