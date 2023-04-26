
exports.insertPostureLog = ()=>{
    return `
        INSERT
          INTO  tbl_posture_log
             (
                log_date , sitting_time,
                straight_time, bad_time, user_id
             )
        VALUES 
             (
                DATE_FORMAT(?, '%Y-%m-%d'), 
                TIME_FORMAT(?, '%H:%i:%s'),
                TIME_FORMAT(?, '%H:%i:%s'),
                TIME_FORMAT(?, '%H:%i:%s'),
                ?
             )
    `;
}
exports.selectPostureLogById = ()=>{
    return `
        SELECT
                A.log_id
             ,  DATE_FORMAT(A.log_date, '%Y-%m-%d') AS log_date
             ,  A.sitting_time
             ,  A.straight_time
             ,  A.bad_time
          FROM  tbl_posture_log A
         WHERE  A.log_id = ?
    `
}
exports.seletPostureLogOfWeek = ()=> {
    return `
        SELECT 
                DATE_FORMAT(A.log_date, '%Y-%m-%d') AS log_date
             ,  SEC_TO_TIME(SUM(TIME_TO_SEC(A.sitting_time))) AS sitting_time
             ,  SEC_TO_TIME(SUM(TIME_TO_SEC(A.bad_time))) AS straight_time
             ,  SEC_TO_TIME(SUM(TIME_TO_SEC(A.straight_time))) AS bad_time
          FROM  tbl_posture_log A 
         WHERE  (
                   A.log_date 
                   BETWEEN DATE_ADD(?,INTERVAL -1 WEEK)
                   AND DATE_FORMAT(?, '%Y-%m-%d') 
                ) 
                AND A.user_id = ?
         GROUP  BY A.log_date;
    `;
}

exports.seletPostureLogOfDay = ()=> {
    return `
        SELECT 
                DATE_FORMAT(A.log_date, '%Y-%m-%d') AS log_date
             ,  SEC_TO_TIME(SUM(TIME_TO_SEC(A.sitting_time))) AS sitting_time
             ,  SEC_TO_TIME(SUM(TIME_TO_SEC(A.bad_time))) straight_time
             ,  SEC_TO_TIME(SUM(TIME_TO_SEC(A.straight_time))) AS bad_time
          FROM  tbl_posture_log A 
         WHERE  A.log_date = DATE_FORMAT(?, '%Y-%m-%d') 
                AND A.user_id = ?
         GROUP  BY A.log_date;
    `;
}