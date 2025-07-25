const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const userController = require("./controller/user.controller");
const categoryController = require("./controller/category.controller");
const blogController = require("./controller/blog.controller");
const upload = require("./middleware/multer.middleware");
//body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//auth routes
app.post("/registration", userController.registration);
app.post("/login", userController.login);

//category routes
app.post("/create-category", categoryController.createCategory);
app.get("/get-all-category", categoryController.getAllCategory);
app.get("/single-category/:name", categoryController.getSingleCategory);
app.put("/update-category/:id", categoryController.updateCategory);
app.delete("/delete-category/:id", categoryController.deleteCategory);

//blog routes
app.post("/create-blog", upload.single("image"), blogController.createBlog);

app.use("/blog", express.static("public/temp"));

module.exports = { app };
