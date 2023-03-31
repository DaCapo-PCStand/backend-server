//  DB 연결 객체 관련 모듈 불러오기
const getConnection = require('../database/connection');
// member 레파지토리 모듈 불러오기
const MemberRepository = require('../repositories/member-repository.js');

exports.fidAllMembers = () => {
    return new Promise((resolve, reject) => {
        // DB 연결 객체 생성 후 connection 변수에 할당
        const connection = getConnection();
        
        // DB 연결 객체를 member 레파지토리 로직에 전달해 반환된 결과를 results 변수에 할당
        const results = MemberRepository.selectAllMembers(connection);

        // DB 연결 종료
        connection.end();

        // 회원 정보 리스트 조회 결과를 반환함
        resolve(results); 

    }) 


}


exports.registMember = (memberInfo) => {
    return new Promise(async (resolve, reject) => {

        console.log("[memberService] registMember meberInfo :", memberInfo)
        // DB 연결 객체 생성 후 connection 변수에 할당
        const connection = getConnection();

        // 연결 객체가 트랜잭션 처리를 하도록 설정
        connection.beginTransaction();

        try {
            // 회원 정보를 insert한 후 결과를 results 변수에 할당
            const results = await MemberRepository.insertMemberInfo(connection, memberInfo);
            // console.log('[member-service] insertMemberInfo result :', results);
            
            // 회원 ID로 정보를 조회한 결과를 checkResult 변수에 할당
            const insertedMember = await MemberRepository.selectMemberById(connection, memberInfo.memberId);
            
            // 에러 없이 insert 후 조회까지 마쳤다면 commit 한다
            connection.commit();
            console.log('[member-service] insert commit');
            
            // console.log('[member-service] selectMemberById result :', checkResult);
            resolve(insertedMember); 


        } catch(err) {
            // insert 중 에러발생시 롤백
            connection.rollback();
            console.log('[member-service] insert rollback');
        } finally {
            connection.end();
            console.log('[member-service] connection closed');
        }

    }) 


}

exports.checkDuplicated = (targetId)=>{
    return new Promise(async (resolve, reject)=>{
        const connection = getConnection();
        
        const results =await MemberRepository.selectMemberById(connection, targetId);
        console.log('[member-service] select member by id result: ', results);

        // id select 결과가 비워져 있을 경우 중복 X
        if(results.length>0){
            resolve(true)
        } else {
            resolve(false)
        }
    });
}