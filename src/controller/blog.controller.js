const { BlogModel } = require("../models/blog.model");
const { validateBody } = require("../helpers/validator");
exports.createBlog = async (req, res) => {
  try {
    const { empty, fieldName } = validateBody;
    if (empty) {
      return res.status(401).json({
        msg: `${fieldName} missing`,
      });
    }
    const isExist = await BlogModel.findOne({
      blogTitle: req.body.blogTitle,
    });
    if (isExist) {
      res.status(401).json({
        msg: `${isExist.blogTitle} already exists try another one`,
      });
    }
    //save blog
    const saveBlog = await new BlogModel({
      blogTitle: req.body.blogTitle,
      blogDescription: req.body.blogDescription,
      image: `http://localhost:4000/blog/${req.file.filename}`,
    }).save();
    if (!saveBlog) {
      return res.status(501).json({
        msg: `blog cannot be saved in create blog controller`,
        error: err,
      });
    }
    return res.status(201).json({
      msg: `blog saved successfully in create blog controller`,
      data: saveBlog,
    });
  } catch (err) {
    return res.status(401).json({
      msg: `error from create blog controller`,
      error: err,
    });
  }
};
