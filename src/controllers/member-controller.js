const HttpStatus = require('http-status');
const MemberService = require('../services/member-service.js');
const PasswordBcrypt = require('../auth/password-bcrypt.js');
const JwtService = require('../auth/jwt-service.js');

// 회원 정보 리스트 조회 요청을 서비스에 전달하고 반환된 결과물을 응답하는 async 메소드 export 
exports.findAllMembers = async(req, res, next) => {

    // findAllMembers 서비스를 호출하여 로직이 처리될 때 까지 기다린 후
    // 반환된 회원 정보 리스트를 results 변수에 담는다.
    const results = await MemberService.fidAllMembers();

    //  Http 상태 코드(200)와 함께 읽어온 회원 정보 리스트를 응답한다. 
    res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'successfully found all members',
        results: results
    });
}

// 회원가입 요청을 전달하고 반환된 결과물을 응답
exports.registMember = async(req, res, next) => {

    const memberInfo = req.body;
    // 패스워드를 암호화하여 변수에 담음
    memberInfo.memberPassword = await PasswordBcrypt.encrypt(memberInfo.memberPassword);

    // req.body 값을 파라미터로 전달
    const results = await MemberService.registMember(req.body);

    //  Http 상태 코드(200)와 함께 읽어온 회원 정보 리스트를 응답한다. 
    res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'successfully regist member',
        results: results
    });
}

// ID 중복 확인 
exports.checkDuplicated = async(req, res, next) => {
    // body 데이터를 JS객체에 담음
    const jsonBody = req.body;

    console.log(jsonBody.targetId); 
    // 정해진 포맷으로 데이터를 전달했는지 확인
    if(jsonBody.targetId === undefined){
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: 'failed check duplicated : 데이터 포맷 불일치'
        })
    } else {
        // 대상 ID를 targetId 객체에 담음
        const targetId = jsonBody.targetId;

        // 중복 확인 서비스 호출
        const results = await MemberService.checkDuplicated(targetId);

        // 중복 여부 결과 응답
        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "successfully check duplicated or not of targetId",
            results: results
        })
    }
    

    
}  



// 로그인 API
exports.login = async(req, res, next) => {
    const body = req.body;
    console.log('[member-controller] body : ', body);
    
    // 파라미터가 제대로 전달되었는지 확인
    if(body.id=== "" || body.id === undefined || body.password === undefined){
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: '파라미터 입력 오류'
        })
    } else {
       const results = await MemberService.selectMemberPasswordById(body.id);

       const correct = (results.memberPassword !== undefined) ? await PasswordBcrypt.verify(body.password, results.memberPassword) : false;


       if(!correct){
            res.status(HttpStatus.UNAUTHORIZED).json({
                status: HttpStatus.UNAUTHORIZED,
                message: 'failed login',
                results: '아이디 또는 비밀번호가 일치하지 않습니다'
            });
       } else {
        // access 토큰 발급
        const token = JwtService.sign({id : body.id})
        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: 'successfully login',
            accessToken: token
        });
       }
    }
}