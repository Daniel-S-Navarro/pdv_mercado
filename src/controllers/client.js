const knex = require("../config/connection/connection");

// CADASTRAR CLIENTE

const registerClient = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  try {
    const singleEmail = await knex("clientes").where({ email }).where({ cpf });
    if (singleEmail.length > 0) {
      return res.status(404).json({ message: "Email ou CPF já cadastrado" });
    }

    const NewClient = {
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    };
    await knex("clientes").insert(NewClient);
    return res
      .status(201)
      .json({ mensagem: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

// EDITAR CLIENTE

const editClient = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  const { id } = req.params;

  try {
    const clientId = await knex("clientes").where({ id });

    if (clientId.length < 1) {
      return res.status(404).json({ message: "Cliente não cadastrado" });
    }

    const singleEmail = await knex("clientes").where({ email });

    if (singleEmail.length > 0) {
      return res.status(404).json({ message: "Email já cadastrado" });
    }

    const singleCpf = await knex("clientes").where({ cpf });

    if (singleCpf.length > 0) {
      return res.status(404).json({ message: "CPF já cadastrado" });
    }

    const client = {
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    };
    const ClientUpdate = await knex("clientes").update(client);
    return res
      .status(200)
      .json({ mensagem: "Cliente Atualizado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

// LISTAR CLIENTE

const listClient = async (req, res) => {
  try {
    const clientList = await knex("clientes");
    return res.status(200).json(clientList);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

// DETALHAR CLIENTE

const detailClient = async (req, res) => {
  const { id } = req.params;
  try {
    const clientId = await knex("clientes").where({ id });

    if (clientId < 1) {
      return res.status(404).json({ message: "Cliente não cadastrado" });
    }
    return res.status(200).json(clientId);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

module.exports = {
  registerClient,
  editClient,
  listClient,
  detailClient,
};
