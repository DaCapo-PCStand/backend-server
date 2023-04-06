const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// '/duplicated' 경로의 get 요청 받을 경우 checkDuplicated 메소드로 연결
router.get('/duplicated', userController.checkDuplicated);
// post 요청을 받을 경우 userController의 registMethod로 연결
router.post('/regist', userController.registUser);
// '/login' 경로로 get 요청을 받을 경우 login 메소드로 연결
router.post('/login', userController.login);

module.exports = router;