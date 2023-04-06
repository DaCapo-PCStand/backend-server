// 회원 정보 리스트 조회 쿼리문
// exports.selectAllUsers = () => {
//     return `
//         SELECT
//                 A.user_id
//              ,  A.user_name
//              ,  A.signup_datetime
//           FROM  tbl_user A
//     `;
// }

// ID로 회원 정보 조회 쿼리문
exports.selectUserById = () => {
  return `
      SELECT
              A.user_id
           ,  A.user_name
           ,  A.signup_datetime
           ,  A.user_password
        FROM  tbl_user A
       WHERE  A.user_id = ?
  `;
}

// 회원 정보 삽입 쿼리문
// '?'를 사용하면 connection 객체를 통해 전달된 인수가 순서대로 대입된다 
exports.insertUserInfo = () => {
    return `
        INSERT  
          INTO  tbl_user
             (
                user_id,
                user_password,
                user_name
             )
        VALUES
             (
                ?, ?, ?
             )
    `;
}

// ID로 패스워드 조회
// exports.selectUserPasswordById = () => {
//    return `
//        SELECT
//                A.user_password
//          FROM  tbl_user A
//         WHERE  A.user_id = ?
//    `;
//  }
 

exports.updateUserInfo = () => {
   return  `
      UPDATE
              tbl_user A
        SET   A.user_name = ?
      WHERE   A.user_id = ?
   `;
}