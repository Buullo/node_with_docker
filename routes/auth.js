const express = require('express');

const router = express.Router();

const { validateRegister, validateLogin, validateUpdateProfile } = require('../validators/auth')
const { register, login, getInfo, updateProfile } = require('../controllers/auth.controller')
const { authenticate } = require('../middlewares/auth.middleware')

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/info', authenticate, getInfo);
router.put('/updateProfile', authenticate, validateUpdateProfile, updateProfile);


module.exports = router