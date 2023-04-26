const express = require('express');
const router = express.Router();
const PostureController = require('../controllers/posture-controller');

router.post('/', PostureController.addPostureLog);
router.get('/', PostureController.findPostureLogs);

module.exports = router;