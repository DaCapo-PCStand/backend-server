const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member-controller');

// memberRouter로 '/' 경로의 get 요청을 전달 받을 경우 memberController의 findAllMembers 메소드를 실행한다
router.get('/', memberController.findAllMembers);
// post 요청을 받을 경우 memberController의 registMethod로 연결
router.post('/', memberController.registMember);

module.exports = router;