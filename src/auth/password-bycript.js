const bcrypt = require('bcrypt');

// 패스워드를 전달 받아 암호화하여 반환하는 메소드 객체 
exports.encrypt = (password) => {
    // 동기적으로 동작되어야하는 메소드이기 때문에 Promise 객체로 반환한다
    return new Promise ((resolve, reject)=>{
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function(err, encripted){

            if(err){
                console.log('패스워드 암호화 에러 발생 : ', err);
                reject(err);
            }

            // 에러가 발생하지 않았다면 암호화된 패스워드를 resolve한다
            resolve(encripted);
        });
    })
};

// 암호화된 패스워드를 받아 일치 여부를 반환하는 메소드 객체
exports.verify = (inputPassword, encriptedPassword)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.compare(inputPassword, encriptedPassword, function(err, result){
             // 비교 중 에러 발생시 reject
            if(err){
                console.log('패스워드 검증 에러 발생 :', err);
                reject(err);
            }
            
            // 에러가 발생하지 않았다면 결과값을 반환한다
            resolve(result);
        })
    });
};