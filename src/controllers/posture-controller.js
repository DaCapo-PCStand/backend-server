const PostureService = require('../services/posture-service');
const HttpStatus = require('http-status');

exports.addPostureLog = async(req, res, next) => {
    const { userId } = req.payload;
    const { logDate, sittingTime, straightTime, badTime } = req.body;


    if( !userId && !logDate && !sittingTime && !straightTime && !badTime) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: '데이터 포맷 불일치'
        });
    } else {
        try {
            const results = await PostureService.insertPostureLog({
                logDate : logDate,
                sittingTime : sittingTime,
                straightTime : straightTime,
                badTime : badTime,
                userId : userId
            });
    
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully add posture-ananlysis-log',
                results: results[0]
            }) 
        } catch(err) {
            res.status(500).json({
                status: 500,
                message: '알 수 없는 에러 발생! 윤서를 찾아주세요'
            })
        }
    }

}


exports.findPostureLogs = async(req, res, next) => {
    const { userId } = req.payload;
    const { date } = req.query;

    console.log(userId, date);

    if( !userId && !date) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: '데이터 포맷 불일치'
        });
    } else {

        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: 'successfully find posture-ananlysis-log list',
            results: {
                week : await PostureService.findPostureLogOfWeek({
                    userId : userId,
                    lastDate : date
                }),
                day : await PostureService.findPostureLogOfDay({
                    userId : userId,
                    date : date
                })
            }
        }) 
    }

}