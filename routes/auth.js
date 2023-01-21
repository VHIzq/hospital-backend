//? /api/login

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = ('../middlewares/validar-campos.js')
const { login } = require('../controllers/auth');

const router = Router();

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = routerl

