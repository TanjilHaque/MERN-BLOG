const express = require("express");
require("dotenv").config();
const app = express();

const userController = require("./controller/user.controller");
const categoryController = require("./controller/category.controller");

//body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//auth routes
app.post("/registration", userController.registration);
app.post("/login", userController.login);

//category routes
app.post("/create-category", categoryController.createCategory);

module.exports = { app };
