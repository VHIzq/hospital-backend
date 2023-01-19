  //? /api/usuarios
  
  const { Router } = require('express');
  const { getUsuarios } = require('../controllers/usuarios');
  const { crearUsuarios } = require('../controllers/usuarios');

  const router = Router();

  router.get('/', getUsuarios);

  router.post('/', crearUsuarios)

  module.exports = router;