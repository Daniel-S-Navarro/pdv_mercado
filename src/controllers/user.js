const knex = require("../config/connection/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../config/security/senhaJwt");

// CADASTRAR USUARIO
const registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const emailExisting = await knex("usuarios").where({ email });

    if (emailExisting.length > 0)
      return res
        .status(400)
        .json({ mensagem: "Esse e-mail ja está cadastrado" });

    const passwordEncryption = await bcrypt.hash(senha, 10);
    const newUser = {
      nome,
      email,
      senha: passwordEncryption,
    };
    await knex("usuarios").insert(newUser);
    return res
      .status(201)
      .json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "erro no servidor" });
  }
};

// FAZER LOGIN
const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const checkEmail = await knex("usuarios").where({ email });
    if (checkEmail <= 0) {
      return res.status(400).json({ mensagem: "Email ou senha inválidos" });
    }

    const checkSenha = await bcrypt.compare(senha, checkEmail[0].senha);
    if (!checkSenha) {
      return res.status(400).json({ mensagem: "Email ou senha inválidos" });
    }

    const token = jwt.sign({ id: checkEmail[0].id }, senhaJwt, {
      expiresIn: "30d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ mensagem: "erro no servidor" });
  }
};

// DETALHAR PERFIL DO USUARIO

const detailProfileUser = async (req, res) => {
  const autorization = req.headers.authorization;

  if (!autorization) {
    return res.status(401).json({ mensagem: "Usuário não autorizado!" });
  }
  const token = autorization.split(" ")[1];
  const id = req.loggedInUser.id;

  try {
    const loggedInUser = await knex("usuarios").where({ id });

    if (loggedInUser.length === 0) {
      return res.status(404).json({ mensagem: "Usuario não cadastrado" });
    }
    delete loggedInUser[0].senha;

    return res.json(loggedInUser);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

// EDITAR PERFIL DO USUÁRIO LOGADO

const editUserProfile = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.loggedInUser;

  try {
    const emailFound = await knex("usuarios").where({ email });

    const passwordEncryption = await bcrypt.hash(senha, 10);

    if (emailFound.length > 0) {
      return res.status(404).json({ message: "Email já cadastrado" });
    }

    const userObj = {
      email: email || user.email,
      nome: nome || user.nome,
      senha: passwordEncryption || user.senha,
    };

    const updateUser = await knex("usuarios").update(userObj);

    return res.status(201).json({ mensagem: "Usuário alterado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

module.exports = {
  registerUser,
  login,
  detailProfileUser,
  editUserProfile,
};
