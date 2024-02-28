const joi = require("joi");

const schemaEditClient = joi.object({
  nome: joi.string().required().messages({
    "string.empty": "O campo nome é Obrigatório!",
    "string.base": "Formato de nome inválido!",
    "any.required": "O campo nome é Obrigatório!",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "O campo email é Obrigatório!",
    "string.email": "Email inválido!",
    "any.required": "O campo email é Obrigatório!",
  }),
  cpf: joi
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .required()
    .messages({
      "string.empty": "O campo CPF é Obrigatório!",
      "string.base": "Formato do CPF inválido!",
      "string.pattern.base": "Formato do CPF inválido!",
      "any.required": "O campo CPF é Obrigatório!",
    }),
  cep: joi
    .string()
    .length(9)
    .regex(/^\d{5}-\d{3}$/)
    .messages({
      "string.length": "Formato do CEP inválido!",
      "string.base": "Formato do CEP inválido!",
    }),
  rua: joi.string(),
  numero: joi.number(),
  bairro: joi.string(),
  cidade: joi.string(),
  estado: joi.string(),
});

module.exports = schemaEditClient;
