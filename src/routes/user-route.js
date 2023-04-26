const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// patch 요청이 들어올 경우 modify 메소드로 연결한다
router.patch('/', userController.modifyUserInfo);

// 유저 정보 조회 요청 라우팅
router.get('/', userController.findUserInfo);


module.exports = router;