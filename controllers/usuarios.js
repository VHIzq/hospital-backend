const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/user');

const getUsuarios = async(req, res) => {
  
  const usuarios = await Usuario.find({}, 'nombre email role google');
  
  res.json({
    ok: true,
    usuarios
  });
}

const crearUsuarios = async(req, res = response) => {
  //console.log(req.body);
  const {email, password, nombre} = req.body;

  try {

    const existeEmail = await Usuario.findOne({email});

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario registrado con ese email'
      });
    }

    const usuario = new Usuario(req.body);

    //*encode password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //*Save user
    await usuario.save();

    res.json({
      ok: true,
      usuario
    });  
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado. Revisar logs'
    })
  }
}

module.exports = {
  getUsuarios,
  crearUsuarios
}