//? /api/login

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');

const router = Router();

router.post('/',
  [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').isEmail(),
  ],
  login)

module.exports = router;
