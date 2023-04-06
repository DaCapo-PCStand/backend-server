exports.insertRegistration = () => {
    return`
        INSERT
        INTO  tbl_registration
            (
                user_id, 
                stand_id
            )
        VALUE
            (
                ?, ?
            )
    `
}

exports.selectRegistrationById = () => {
    return  `
        SELECT
                A.registration_id
             ,  A.user_id
             ,  B.stand_id
             ,  B.serial_number
          FROM  tbl_registration A
          JOIN  tbl_stand B ON( A.stand_id = B.stand_id )
         WHERE  A.registration_id = ?
    `
}

exports.selectRegistrationByUser = () => {
    return  `
        SELECT
                A.registration_id
             ,  A.user_id
             ,  A.stand_id
          FROM  tbl_registration A
         WHERE  A.user_id = ?
    `
}

exports.selectRegistrationByStand = () => {
    return  `
        SELECT
                A.registration_id
             ,  A.user_id
             ,  A.stand_id
          FROM  tbl_registration A
         WHERE  A.stand_id = ?
    `
}