
const Usuario = require('../models/user');

const getUsuarios = (req, res) => {
  res.json({
    ok: true,
    usuarios: []
  });
}

const crearUsuarios = async(req, res) => {
  //console.log(req.body);
  const {email, password, nombre} = req.body;

  const usuario = new Usuario(req.body);

  await usuario.save();

  res.json({
    ok: true,
    //usuario: usuario
    usuario
  });
}

module.exports = {
  getUsuarios,
  crearUsuarios
}