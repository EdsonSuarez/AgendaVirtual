// modulo jwt
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // revisamos el header, en autorizacion
    let jwtToken = req.header("Authorization"); 
    if(!jwtToken) return res.status(400).send("Autorizacion rechazada, no hay token");
    // si existe el jwt vamos a separar el payload
    jwtToken = jwtToken.split(" ")[1];
    if (!jwtToken) return res.status(401).send("Autorizacion rechazada, no hay token");
    try {
        // revisamos palabra secreta
        const payload = jwt.verify(jwtToken, "secretJWT");
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).send("Auorizacion rechazada, token no valido");
    }
};

module.exports = auth;