const jwt = require("jsonwebtoken");
const senhaJWT = require("../config/security/senhaJwt");
const knex = require("../config/connection/connection");

const validateLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ mensagem: "Usuário não logado" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { id: loggedInUserId } = jwt.verify(token, senhaJWT);
    const loggedInUser = await knex("usuarios").where("id", loggedInUserId);

    if (loggedInUser.length === 0) {
      return res.status(401).json({ mensagem: "Usuário sem permissão" });
    }
    delete loggedInUser[0].senha;
    req.loggedInUser = loggedInUser[0];

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = validateLogin;
