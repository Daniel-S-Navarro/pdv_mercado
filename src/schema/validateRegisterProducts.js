const joi = require("joi");

const valedateRegisterProducts = joi.object({
  descricao: joi.string().required().messages({
    "string.empty": "O campo descrição é Obrigatório!",
    "any.required": "O campo descrição é Obrigatório!",
  }),
  quantidade_estoque: joi.number().min(0).required().messages({
    "number.empty": "O campo quantidade é Obrigatório!",
    "any.required": "O campo quantidade é Obrigatório!",
    "number.min": "O campo quantidade não pode ser negativo",
  }),
  valor: joi.number().required().min(0).messages({
    "number.empty": "O campo valor é Obrigatório!",
    "any.required": "O campo valor é Obrigatório!",
    "number.min": "O campo valor não pode ser negativo",
  }),
  categoria_id: joi.number().required().messages({
    "number.empty": "O campo categoria é Obrigatório!",
    "any.required": "O campo categoria é Obrigatório!",
  }),
});

module.exports = valedateRegisterProducts;
