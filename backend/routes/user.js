// importamos los modulos necesarios
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//  Register User - async await POST
router.post("/registerUser", async (req, res) => {
  // validamos que el correo exista
  let user = await User.findOne({ email: req.body.email });
  // si el usuario ya existe mostramos un mensaje
  if (user) return res.status(400).send("El usuario ya existe");
  // encriptamos el password
  const hash = await bcrypt.hash(req.body.password, 10);
  // guardamos los datos del usuario
  user = new User({
    name: req.body.name,
    lastName: req.body.lastname,
    user: req.body.user,
    phone: req.body.phone,
    email: req.body.email,
    password: hash,
  });
  const result = await user.save();
  if (result) {
    //jwt
    const jwtToken = user.generateJWT();
    res.status(200).send({jwtToken});
  } else {
    return res.status(400).send("Error al registrar el usuario");
  }
});

//exportamos
module.exports = router;