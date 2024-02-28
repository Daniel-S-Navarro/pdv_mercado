const express = require("express");
const {
  registerUser,
  login,
  detailProfileUser,
  editUserProfile,
} = require("../controllers/user");
const validateRequestBody = require("../intermediary/validateRequestBody");
const {
  schemaRegisterUser,
  schemaLogIn,
} = require("../schema/validateRegisterUser");
const { listCategories } = require("../controllers/categories");
const validateLogin = require("../intermediary/validateAutentication");
const schemaEditUser = require("../schema/validateEditUser");
const valedateRegisterProducts = require("../schema/validateRegisterProducts");
const {
  registerProducts,
  editProdutcs,
  listProducts,
  detailProducts,
  deleteProduct,
} = require("../controllers/products");
const valedateEditProducts = require("../schema/validateEditProducts");
const schemaRegisterClient = require("../schema/validateRegisterClient");
const {
  registerClient,
  listClient,
  detailClient,
  editClient,
} = require("../controllers/client");
const schemaEditClient = require("../schema/validateEditClient");
const route = express();

// ROTAS

route.post("/user", validateRequestBody(schemaRegisterUser), registerUser);
route.get("/categoria", listCategories);
route.post("/login", validateRequestBody(schemaLogIn), login);
route.get("/usuario", validateLogin, detailProfileUser);
route.put(
  "/usuario",
  validateLogin,
  validateRequestBody(schemaEditUser),
  editUserProfile
);
route.post(
  "/produto",
  validateLogin,
  validateRequestBody(valedateRegisterProducts),
  registerProducts
);

route.put(
  "/produto/:id",
  validateLogin,
  validateRequestBody(valedateEditProducts),
  editProdutcs
);

route.get("/produto", validateLogin, listProducts);

route.get("/produto/:id", validateLogin, detailProducts);

route.delete("/produto/:id", validateLogin, deleteProduct);

route.post(
  "/cliente",
  validateLogin,
  validateRequestBody(schemaRegisterClient),
  registerClient
);

route.put(
  "/cliente/:id",
  validateLogin,
  validateRequestBody(schemaEditClient),
  editClient
);
route.get("/cliente", validateLogin, listClient);

route.get("/cliente/:id", validateLogin, detailClient);

module.exports = route;
