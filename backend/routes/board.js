const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");

// regitrar actividad sin imagen
router.post("/saveTask", Auth, async (req, res) => {
  // buscamos usuario de la peticion
  const user = await User.findById(req.user._id);
  if (!user) return res.status(401).send("Usuario no autenticado");
  // si el usuario existe procedomos a registrar
  const board = new Board({
    userId: user._id,
    name: req.body.name,
    description: req.body.description
  });
  // guardamos en mongo
  const result = await board.save();
  return res.status(200).send({result});
});

module.exports = router;