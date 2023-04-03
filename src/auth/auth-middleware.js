const JwtService = require('../auth/jwt-service');
const HttpStatus =  require('http-status');
exports.authMiddleware = async (req, res, next) => {
    console.log(req.header('Authorization'));
    const accessToken = req.header('Authorization').split('Bearer ')[1];
    if(!accessToken){
        res.status(HttpStatus.UNAUTHORIZED).json({
            status : HttpStatus.UNAUTHORIZED,
            message : '토큰이 없습니다'
        }) 
    } 

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
            message: err.message
        }).redirect('/login');
    }

} 