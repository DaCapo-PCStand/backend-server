const express = require('express');
const router = express.Router();
const RegistrationController = require('../controllers/registration-controller');

router.post('/', RegistrationController.registerStand);
router.delete('/:registrationId', RegistrationController.unregisterStand);

module.exports = router;