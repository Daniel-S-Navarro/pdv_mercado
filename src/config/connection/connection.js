require("dotenv").config();

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    database: "loja",
    user: "postgres",
    password: "dd200800",
  },
});

module.exports = knex;
