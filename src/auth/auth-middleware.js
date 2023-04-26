const JwtService = require('../auth/jwt-service');
const HttpStatus =  require('http-status');
exports.authMiddleware = async (req, res, next) => {
    console.log(typeof req.header('Authorization'));
  
    // 헤더로부터 토큰 읽기 
    const accessToken = req.header('Authorization').split('Bearer ')[1];

    console.log(accessToken);
    // 토큰 유무 확인
    if(!accessToken){
        res.status(HttpStatus.UNAUTHORIZED).json({
            status : HttpStatus.UNAUTHORIZED,
            message : '토큰이 없습니다',
            results: {isAuth: false, isExp : false}
        }) 
    } 

    // 토큰 만료 확인 및 복호화
    let payload;
    try{
        payload = await JwtService.verify(accessToken);
        console.log('access token payload :', payload);
        req.payload = payload;
        next();
    } catch(err) {
        console.log()
        res.status(HttpStatus.UNAUTHORIZED).json({
            status : HttpStatus.UNAUTHORIZED,
            message: err.message,
            results: {isAuth: false, isExp : true}
        })
    }

} 