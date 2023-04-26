const HttpStatus = require('http-status');
const RegistrationService = require('../services/registration-service');
const StandService = require('../services/stand-service');

// 거치대 등록 API
exports.registerStand = async(req, res, next) => {
    const { userId } = req.payload;
    const { standSerialNumber } = req.body;


    
    if((await RegistrationService.findRegistrationByUser(userId)).length) {
        // 해당 회원이 이미 등록된 거치대가 있다면 
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: '이미 거치대가 등록된 상태입니다'
        });
    } else if(!standSerialNumber) { 
        // 시리얼 넘버가 넘어오지 않았다면
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: '등록할 거치대의 시리얼 번호를 입력해주세요'
        });

    } else {
        // DB에 등록된 거치대의 시리얼 번호인지 확인
        const findResults = await StandService.findStandByNumber(standSerialNumber);
        // console.log('[registrationController] find stand : ', standId);
        if(!findResults.length) {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                message: '존재하지 않는 거치대 입니다'
            });
        } else if((await RegistrationService.findRegistrationByStand(findResults[0].standId)).length) {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                message: '이미 등록된 거치대 입니다'
            });
        } else {
            // 등록 정보 저장 서비스 호출
            const results = await RegistrationService.registerStand({userId: userId, standId: findResults[0].standId});
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully regist stand',
                results: results[0]
            });
        }
    }

}


// 거치대 등록 해제 API
exports.unregisterStand = async(req, res, next) => {
    const { registrationId } = req.params;

    console.log('registrationId :', registrationId);

    try {
        const results = await RegistrationService.unregisterStand(registrationId);

        if(results) {
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully unregister stand'
            }) 
        } else {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                message: '유효하지 않는 등록 정보 입니다'
            });
        }
    } catch(err) {
        res.status(500).json({
            status: 500,
            message: '알 수 없는 에러 발생! 윤서를 찾아주세요'
        })
    }


}

// 유저 ID로 거치대 등록 정보 조회 API
exports.findRegistrationByUser =  async (req, res, next) => {
    const { userId } = req.payload;
    
    const results = await RegistrationService.findRegistrationByUser(userId);
    console.log('[registration-controller] findRegistrationByUser results : ', results);
    // if(results.length) {
    //     delete results[0].userId
    // }
    res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: '조회 성공',
        results: results
    });
}