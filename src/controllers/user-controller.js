const HttpStatus = require('http-status');
const UserService = require('../services/user-service.js');
const PasswordBcrypt = require('../auth/password-bcrypt.js');
const JwtService = require('../auth/jwt-service.js');

// 회원 정보 조회
exports.findUserInfo = async(req, res, next) => {
    const { userId } = req.payload ;

    const results = await UserService.selectUserById(userId);
    console.log('[user-controller] findUserInfo :' ,results.length);

    if(results.length) {
        const user = results[0]

        // 중요 정보 제거 
        delete user.userPassword;
        delete user.userId;    
        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: 'successfully find user ',
            results:user
        });
    } else {

         res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: '존재하지 않는 유저 입니다'
        });
    }


}



// 회원가입 요청을 전달하고 반환된 결과물을 응답
exports.registUser = async(req, res, next) => {

    const { userId, userPassword, userName } = req.body;

    // 입력 데이터 포맷 검사
    if(!userId || !userPassword || !userName){
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: 'failed check duplicated : 데이터 포맷 불일치'
        })
    } else {
        if(await UserService.checkDuplicated(userId)){
            res.status(HttpStatus.UNAUTHORIZED).json({
                status: HttpStatus.UNAUTHORIZED,
                message: '아이디가 중복 됩니다'
            });
        } else {
            // req.body 값을 파라미터로 전달
            const results = await UserService.registUser({
                // 패스워드를 암호화하여 변수에 담음
                userPassword: await PasswordBcrypt.encrypt(userPassword),
                userId : userId,
                userName : userName
            });

            // 중요 정보 제거 
            delete results[0].userPassword;
            delete results[0].userId; 

            //  Http 상태 코드(200)와 함께 읽어온 회원 정보 리스트를 응답한다. 
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully regist user',
                results: results[0]
                });
            }
        }

        

   
}

// ID 중복 확인 
exports.checkDuplicated = async(req, res, next) => {
    // 쿼리 데이터를 JS객체에 담음
    const { targetId } = req.query;
    console.log('targetId :', targetId);

    // 정해진 포맷으로 데이터를 전달했는지 확인
    if(!targetId){
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: 'failed check duplicated : 데이터 포맷 불일치'
        })
    } else {

        // 중복 확인 서비스 호출
        const results = await UserService.checkDuplicated(targetId);

        // 중복 여부 결과 응답
        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "successfully check duplicated",
            // id select 결과가 비워져 있을 경우 중복 X
            results: results
        })
    }
}  



// 로그인 API
exports.login = async(req, res, next) => {
    const { userId, userPassword } = req.body;
    
    console.log(req.body);
    // 파라미터가 제대로 전달되었는지 확인
    if(!userId || !userPassword){
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: '파라미터 입력 오류'
        })
    } else {
        const results = await UserService.selectUserById(userId);
        console.log("[user-controller] selectUserById :", results);
        const correct = (results.length<1) ? false : await PasswordBcrypt.verify(userPassword, results[0].userPassword) ;


       if(!correct){
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                message: 'failed login',
                results: '아이디 또는 비밀번호가 일치하지 않습니다'
            });
       } else {
        // access 토큰 발급
        const token = JwtService.sign({userId : results[0].userId});
        res.status(HttpStatus.OK).
            header('Authorization', 'Bearer '+token).
            json({
                status: HttpStatus.OK,
                message: 'successfully login'
            });
       }
    }
}


// 회원정보 수정 API
exports.modifyUserInfo = async (req, res, next)=>{
    const { userId } = req.payload;
    const { newName } = req.body;
    
    // 파라미터가 제대로 전달되었는지 확인
    if(!newName){
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: '파라미터 입력 오류'
        })
    } else {
        const results = await UserService.modifyUsesrInfo({userId: userId, newName: newName});
        
        // 패스워드 정보 제거
        delete results[0].userPassword;

        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: 'successfully modify user info',
            results: results[0]
        });
    }


}