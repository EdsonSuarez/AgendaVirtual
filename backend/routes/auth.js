const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//funcion login del usuario
router.post("/login", async (req, res) => {
  //buscamos el correo del usuario
  const user = await User.findOne({ user: req.body.user });
  // validamos si elcorreo trae o no resultados
  if (!user) return res.status(400).send("User o password incorrecto");
  // comparamos el pass que entra con el hash de la DB
  const hash = await bcrypt.compare(req.body.password, user.password);
  // validamos si el pass coincide o no
  if (!hash) return res.status(400).send("User o password incorrecto");
  // devolvemos el token
  const jwtToken = user.generateJWT();
  return res.status(200).send({ jwtToken });
});

module.exports = router;
