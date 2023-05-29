
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
    WITH RECURSIVE cte AS (
      SELECT 
             DATE_ADD(? , INTERVAL -1 WEEK) AS log_date
       UNION  ALL
      SELECT  
               DATE_ADD(log_date, INTERVAL 1 DAY)
        FROM  cte
       WHERE  log_date < ?
       
   ) 
   SELECT 
         DATE_FORMAT(D.log_date, '%Y-%m-%d') AS log_date
       ,  SEC_TO_TIME(SUM(TIME_TO_SEC(D.sitting_time))) AS sitting_time
       ,  SEC_TO_TIME(SUM(TIME_TO_SEC(D.bad_time))) AS bad_time
       ,  SEC_TO_TIME(SUM(TIME_TO_SEC(D.straight_time))) AS straight_time
     FROM  (
           SELECT 
                 C.log_date
               ,  IFNULL(B.sitting_time, '00:00:00') AS sitting_time
               ,  IFNULL(B.bad_time, '00:00:00')  AS bad_time
               ,  IFNULL(B.straight_time, '00:00:00') AS straight_time
            FROM  (SELECT * FROM  tbl_posture_log A WHERE  A.user_id =?) B
            RIGHT  OUTER JOIN (SELECT log_date FROM cte) C ON B.log_date = C.log_date
         ) D
     GROUP BY D.log_date
     ORDER BY D.log_date
    `;
}

exports.seletPostureLogOfDay = ()=> {
    return `
        SELECT 
                DATE_FORMAT(A.log_date, '%Y-%m-%d') AS log_date
             ,  SEC_TO_TIME(SUM(TIME_TO_SEC(A.sitting_time))) AS sitting_time
             ,  SEC_TO_TIME(SUM(TIME_TO_SEC(A.bad_time))) bad_time
             ,  SEC_TO_TIME(SUM(TIME_TO_SEC(A.straight_time))) AS straight_time
          FROM  tbl_posture_log A 
         WHERE  A.log_date = DATE_FORMAT(?, '%Y-%m-%d') 
                AND A.user_id = ?
         GROUP  BY A.log_date;
    `;
}