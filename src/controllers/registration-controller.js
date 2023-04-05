const HttpStatus = require('http-status');
const RegistrationService = require('../services/registration-service');
const StandService = require('../services/stand-service');

exports.registStand = async(req, res, next) => {
    const { id } = req.payload;
    const { standSerialNumber } = req.body;


    
    if(await RegistrationService.selectRegistrationByMember(id)) {
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
        const { standId } = await StandService.selectStandByNumber(standSerialNumber);
        console.log('[registrationController] find stand : ', standId);
        if(!standId) {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                message: '존재하지 않는 거치대 입니다'
            });
        } else {
            // 등록 정보 저장 서비스 호출
            const results = await RegistrationService.insertRegistration({memberId: id, standId: standId});
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully regist stand',
                results: results
            });
        }
    }

}