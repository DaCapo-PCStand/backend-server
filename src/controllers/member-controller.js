const HttpStatus = require('http-status');
const MemberService = require('../services/member-service.js');
const PasswordBycript = require('../auth/password-bycript');

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
    memberInfo.memberPassword = await PasswordBycript.encrypt(memberInfo.memberPassword);

    // req.body 값을 파라미터로 전달
    const results = await MemberService.registMember(req.body);

    //  Http 상태 코드(200)와 함께 읽어온 회원 정보 리스트를 응답한다. 
    res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'successfully regist member',
        results: results
    });
}