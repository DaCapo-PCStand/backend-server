const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretkey = process.env.SECRET_KEY;

const options = {
    expiresIn: '1h'
}

// 토큰 발급
exports.sign = (payload) => {
    // jwt 토큰 발급
    return jwt.sign(payload, secretkey, options);
}

// 토큰 검증
exports.verify = (token) => {
    return new Promise((resolve, reject)=>{
        jwt.verify(token, secretkey, {ignoreExpiration:false}, (err, decoded)=>{
            if(err) {
                console.error(err);
                reject(err);
            }
    
    
            console.log('toekn 복호화 결과: ' , decoded);
            resolve(decoded);
        })
    }) 
    
}