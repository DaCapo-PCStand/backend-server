const memberQuery = require('../database/member-query');
const MemberDTO = require('../dto/member-response-dto');

// 모든 회원 정보 리스트 조회
exports.selectAllMembers = (connection) => {
    return new Promise((resolve, reject) => {
        // DB연결 객체를 이용해 회원 정보 리스트 조회 쿼리 날려 조회 결과를 응답 받는다
        connection.query(memberQuery.selectAllMembers(), (err, results, fields) => {
            
            // 에러 발생시 로그 출력 후 reject
            if(err) {
                console.log('err', err);
                reject(err);
            }

            // 쿼리 결과를 콘솔로 확인
            console.log('repo results: ', results);


            // 쿼리 결과를 회원 DTO 포맷에 맞춰 members 배열에 저장
            const members = []; // memers 배열 생성 및 초기화
            for(let i = 0; i < results.length; i++){
                members.push(new MemberDTO(results[i])); 
            }

            // members 배열을 반환
            resolve(members);
        })
    })
}

// 특정 ID의 회원 정보 조회 repo
exports.selectMemberById = (connection, memberId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            memberQuery.selectMemberById(), 
            [memberId],
            (err, results, fields) => {
            console.log('[member-repository] selectMemberById');
            
            // 에러 발생시 로그 출력 후 reject
            if(err) {
                console.log('selectMemberById repo err', err);
                reject(err);
            }

            // 쿼리 결과를 콘솔로 확인
            console.log('repo results: ', results);

            // 조회 결과 반환 
            resolve(results);
        })
    })
}

exports.insertMemberInfo = (connection, memberInfo) => {
    return new Promise((resolve, reject) => {
        // DB연결 객체를 이용해 회원정보 삽입 쿼리 날려 그 결과를 응답 받는다
        connection.query(
            memberQuery.insertMemberInfo(),
            // memberInfo의 각 속성 값을 쿼리의 인수로 전달함
            [memberInfo.memberId, memberInfo.memberPassword, memberInfo.memberName],
            (err, results, fields) => {
            
                // 에러 발생시 로그 출력 후 reject
                if(err) {
                    console.log('err', err);
                    reject(err);
                }

                // 쿼리 결과를 콘솔로 확인
                console.log('repo results: ', results);

                // members 배열을 반환
                resolve(results);
            }
        )
    })
}