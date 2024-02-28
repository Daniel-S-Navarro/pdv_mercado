const knex = require("../config/connection/connection");

// CADASTRAR PRODUTO

const registerProducts = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const id = categoria_id;

  try {
    const categoryFound = await knex("categorias").where({ id });

    if (categoryFound.length < 1) {
      return res.status(404).json({ message: "Categoria Inexistente" });
    }

    const newProduct = {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    };

    await knex("produtos").insert(newProduct);

    return res
      .status(201)
      .json({ mensagem: "Produto cadastrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

// EDITAR PRODUTO

const editProdutcs = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;

  try {
    const idValidate = await knex("produtos").where({ id });

    if (idValidate.length < 1) {
      return res.status(404).json({ message: "Produto Inexistente" });
    }

    const existingCategory = await knex("categorias").where({ id });

    if (existingCategory.length < 1) {
      return res.status(404).json({ message: "Produto Inexistente" });
    }

    const updateProduct = {
      descricao,
      quantidade_estoque,
      valor,
    };

    const updateProducts = await knex("produtos").update(updateProduct);

    return res
      .status(201)
      .json({ mensagem: "Produto atualizado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

// LISTAR PRODUTOS

const listProducts = async (req, res) => {
  try {
    const products = await knex("produtos");

    if (products.length < 1) {
      return res
        .status(404)
        .json({ message: "Não existem produtos cadastrados" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

// DETALHAR PRODUTOS

const detailProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const productsId = await knex("produtos").where({ id });

    if (productsId.length < 1) {
      return res.status(404).json({ message: "Produto Inexistente" });
    }
    return res.status(200).json(productsId);
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

// EXCLUIR PRODUTO POR ID

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productId = await knex("produtos").where({ id });

    if (productId.length < 1) {
      return res.status(404).json({ message: "Produto Inexistente" });
    }

    const delProduct = await knex("produtos")
      .del()
      .where({ id })
      .returning("*");

    return res.status(200).json({ mensagem: "Produto excluido com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

module.exports = {
  registerProducts,
  editProdutcs,
  listProducts,
  detailProducts,
  deleteProduct,
};
