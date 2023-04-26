const userQuery = require('../database/user-query');
const UserDTO = require('../dto/user-response-dto');


// 특정 ID의 회원 정보 조회 repo
exports.selectUserById = (connection, userId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            userQuery.selectUserById(), 
            [userId],
            (err, results, fields) => {
            console.log('[user-repository] selectUserById');
            
            // 에러 발생시 로그 출력 후 reject
            if(err) {
                console.log('selectUserById repo err', err);
                reject(err);
            }

            // 쿼리 결과를 콘솔로 확인
            console.log('repo results: ', results);

            let users = [];
            for(let i=0; i<results.length; i++){
                users.push(new UserDTO(results[i]));
            }
        
            // 조회 결과 반환 
            resolve(users);
        })
    })
}

exports.insertUserInfo = (connection, userInfo) => {
    return new Promise((resolve, reject) => {
        // DB연결 객체를 이용해 회원정보 삽입 쿼리 날려 그 결과를 응답 받는다
        connection.query(
            userQuery.insertUserInfo(),
            // userInfo의 각 속성 값을 쿼리의 인수로 전달함
            [userInfo.userId, userInfo.userPassword, userInfo.userName],
            (err, results, fields) => {
            
                // 에러 발생시 로그 출력 후 reject
                if(err) {
                    console.log('err', err);
                    reject(err);
                }

                // 쿼리 결과를 콘솔로 확인
                console.log('repo results: ', results);

                // 결과 반환
                resolve(results);
            }
        )
    })
}

// 패스워드 조회 
// exports.selectUserPasswordById = (connection, userId)=>{
//     return new Promise((resolve, reject)=>{
//         connection.query(
//             userQuery.selectMembPasswordById(),
//             [userId],
//             (err, results, fields)=>{
//                 if(err){
//                     console.log('패스워드 조회 중 에러 발생');
//                     reject(err);
//                 }

//                 console.log('repo results: ', results);
//                 // 조회 결과 반환
//                 let password = {};
//                 if(results.length === 1) {
//                     password = new UserDTO(results[0]);
//                 } 
//                 resolve(password);
//             }
//         )
//     });
// }

exports.updateUserInfo= (connection, userInfo) => {
    return new Promise((resolve, reject)=>{
        connection.query(
            userQuery.updateUserInfo(),
            [userInfo.newName, userInfo.userId],
            (err, results, fields)=>{
                if(err) {
                    console.log(err);
                    reject(err);
                }

                console.log('[user-repo] results :', results);
                resolve(results);
            }
        )
    })
}