const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/user');
const { generarJWt } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, 'nombre email role google');

  res.json({
    ok: true,
    usuarios,
  });
};

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado',
      });
    }

    const usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar usuario
    await usuario.save();

    // Generar el TOKEN - JWT

    const token = await generarJWt(usuario.id);

    res.json({
      ok: true,
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs',
    });
  }
};

const actualizarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe un usuario con ese Id',
      });
    }

    //*updating
    const { password, google, email, ...campos } = req.body;

    const esDiferenteEmail = usuarioDB.email !== email;
    const existeEmail = await Usuario.findOne({ email });

    if (esDiferenteEmail && existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya exisge un usuario con ese email',
      });
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};

const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese Id',
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.status(200).json({
      ok: true,
      msg: 'Usuario borrado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  borrarUsuario,
  actualizarUsuario,
};
