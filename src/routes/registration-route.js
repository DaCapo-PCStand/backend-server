const express = require('express');
const router = express.Router();
const RegistrationController = require('../controllers/registration-controller');

router.post('/', RegistrationController.registStand);


module.exports = router;