const knex = require("../config/connection/connection");

const listCategories = async (req, res) => {
  try {
    listCategory = await knex.select("*").from("categorias");
    return res.status(200).json(listCategory);
  } catch (error) {
    return res.status(500).json({ mensagem: "erro no servidor" });
  }
};

module.exports = {
  listCategories,
};
