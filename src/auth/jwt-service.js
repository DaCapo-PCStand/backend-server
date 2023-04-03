const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretkey = process.env.SECRET_KEY;

const options = {
    expiresIn: '24h'
}

// 토큰 발급
exports.sign = (payload) => {
    console.log(secretkey);
    // jwt 토큰 발급
    return jwt.sign(payload, secretkey, options);
}

// 토큰 검증
exports.verify = (token) => {
    // 추후에 만료 검사를 위해 ignoreExpiration:false 옵션을 부여할 예정
    // 즉, 현재는 만료 여부를 따지지 않고 복호화해줌
    return jwt.verify(token, secretkey, (err, decoded)=>{
        if(err) {
            console.error(err);
            return;
        }

        console.log('toekn 복호화 결과: ' , decoded);
        return decoded;
    })
    
}

// 토큰 만료
exports.expire = (token) => {
    // 토큰 복호화
    const decoded = jwt.decode(token); 
    // 현재 시간에서 10초 전으로 만료시간 설정 
    const newExpireTime =  Math.floor(Date.now() / 1000) -10;
    // 복호화객체의 만료 시간 변경 => 현재 시간에서 10초 전으로 변경되기때문에 만료됨
    decoded.exp = newExpireTime;
}
