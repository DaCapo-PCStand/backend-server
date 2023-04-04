const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member-controller');

// '/duplicated' 경로의 get 요청 받을 경우 checkDuplicated 메소드로 연결
router.get('/duplicated', memberController.checkDuplicated);
// post 요청을 받을 경우 memberController의 registMethod로 연결
router.post('/regist', memberController.registMember);
// '/login' 경로로 get 요청을 받을 경우 login 메소드로 연결
router.post('/login', memberController.login);

module.exports = router;