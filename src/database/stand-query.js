exports.selectStandByNumber = () => {
    return `
        SELECT
                A.stand_id
             ,  A.serial_number
             ,  A.ip_address
          FROM  tbl_stand A
         WHERE  A.serial_number = ?
    `;
}