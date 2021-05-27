//importamos los modulos para crear el servidor

const express = require("express");
const mongoose = require("mongoose");
//importamos routes
const User = require("./routes/user");
const Auth = require("./routes/auth");
const Board = require("./routes/board");
// variable principal  que ejecuta nuestra app
const app = express();

// que usos tiene app
app.use(express.json());
app.use("/api/user/", User);
app.use("/api/auth/", Auth);
app.use("/api/board/", Board);
// variable del puerto de nuestro server sea hosting o local
const port = process.env.PORT || 3001;

// escuchando puerto y desplegado servidor
app.listen(port, () => console.log("Servidor ejecutando en puerto: " + port)); // http://localhost:3001/api/user/registerUser

//conexion con MongoDB
mongoose
  .connect("mongodb://localhost:27017/AgendaVirtual", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Conexion con MongoDB: ON"))
  .catch((err) => console.log("Error al conectar con MongoDB ", err));
