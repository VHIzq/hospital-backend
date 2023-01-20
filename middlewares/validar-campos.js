
const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
  
  const errores = validationResult(req);
  const existenErrores = !errores.isEmpty();

  if (existenErrores) {
    return res.status(400).json({
      ok: false,
      errors: errores.mapped()
    });
  }

  next();
}

module.exports = {
  validarCampos
}