const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member-controller');

// patch 요청이 들어올 경우 modify 메소드로 연결한다
router.patch('/', memberController.modifyMemberInfo);

module.exports = router;