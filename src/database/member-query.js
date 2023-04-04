// 회원 정보 리스트 조회 쿼리문
exports.selectAllMembers = () => {
    return `
        SELECT
                A.member_id
             ,  A.member_name
             ,  A.signup_datetime
          FROM  tbl_member A
    `;
}

// ID로 회원 정보 조회 쿼리문
exports.selectMemberById = () => {
  return `
      SELECT
              A.member_id
           ,  A.member_name
           ,  A.signup_datetime
        FROM  tbl_member A
       WHERE  A.member_id = ?
  `;
}

// 회원 정보 삽입 쿼리문
// '?'를 사용하면 connection 객체를 통해 전달된 인수가 순서대로 대입된다 
exports.insertMemberInfo = () => {
    return `
        INSERT  
          INTO  tbl_member
             (
                MEMBER_ID,
                MEMBER_PASSWORD,
                MEMBER_NAME
             )
        VALUES
             (
                ?, ?, ?
             )
    `;
}

// ID로 패스워드 조회
exports.selectMemberPasswordById = () => {
   return `
       SELECT
               A.member_password
         FROM  tbl_member A
        WHERE  A.member_id = ?
   `;
 }
 

exports.updateMemberInfo = () => {
   return  `
      UPDATE
              tbl_member A
        SET   A.member_name = ?
      WHERE   A.member_id = ?
   `;
}