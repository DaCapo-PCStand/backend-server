//  DB 연결 객체 관련 모듈 불러오기
const getConnection = require('../database/connection');
// user 레파지토리 모듈 불러오기
const UserRepository = require('../repositories/user-repository.js');


exports.registUser = (userInfo) => {
    return new Promise(async (resolve, reject) => {

        console.log("[userService] registUser userInfo :", userInfo)
        // DB 연결 객체 생성 후 connection 변수에 할당
        const connection = getConnection();

        // 연결 객체가 트랜잭션 처리를 하도록 설정
        connection.beginTransaction();

        try {
            // 회원 정보를 insert한 후 결과를 results 변수에 할당
            await UserRepository.insertUserInfo(connection, userInfo);

            
            // 회원 ID로 정보를 조회한 결과를 checkResult 변수에 할당
            const insertedUser = await UserRepository.selectUserById(connection, userInfo.userId);
            console.log('[user-service] insertedUser :', insertedUser);

            // 에러 없이 insert 후 조회까지 마쳤다면 commit 한다
            connection.commit();
            console.log('[user-service] insert commit');
            
            resolve(insertedUser); 


        } catch(err) {
            // insert 중 에러발생시 롤백
            connection.rollback();
            console.log('[user-service] insert rollback');
        } finally {
            connection.end();
            console.log('[user-service] connection closed');
        }

    }) 


}

exports.checkDuplicated = (targetId)=>{
    return new Promise(async (resolve, reject)=>{
        const connection = getConnection();
        
        const results =await UserRepository.selectUserById(connection, targetId);
        console.log('[user-service] selectUserById result: ', results);

    
        resolve(results.length ? true : false);
       
    });
}

exports.selectUserById = (userId)=>{
    return new Promise(async(resolve, reject)=>{
        // 커넥션 객체 생성
        const connection = getConnection();

        // 패스워드 조회 repo 호출
        const results = await UserRepository.selectUserById(connection, userId);
        console.log('[user-service] select user by id results: ', results);

        // 조회 결과 반환
        resolve(results);

    })
}


// 회원 정보 수정 서비스 로직
exports.modifyUsesrInfo = (info) => {
    return new Promise(async (resolve, reject) => {
        // DB 연결 객체 생성 후 connection 변수에 할당
        const connection = getConnection();

        // 연결 객체가 트랜잭션 처리를 하도록 설정
        connection.beginTransaction();

        try {
            // 회원 정보를  후 결과를 results 변수에 할당
            await UserRepository.updateUserInfo(connection, info);
            
            // 회원 ID로 정보를 조회한 결과를 updatedUser 변수에 할당
            const updatedUser = await UserRepository.selectUserById(connection, info.userId);
            
            // 에러 없이 update 후 조회까지 마쳤다면 commit 한다
            connection.commit();
            console.log('[user-service] update commit');
        
            resolve(updatedUser); 


        } catch(err) {
            // insert 중 에러발생시 롤백
            connection.rollback();
            console.log('[user-service] update rollback');
        } finally {
            connection.end();
            console.log('[user-service] connection closed');
        }

    }) 

}