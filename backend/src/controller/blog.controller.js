const { BlogModel } = require("../models/blog.model");
const { validateBody } = require("../helpers/validator");
const fs = require("fs");
const path = require("path");

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

exports.getAllBlog = async (req, res) => {
  console.log("getAll blogs e dhukse");
  try {
    const allBlogs = await BlogModel.find();
    if (!allBlogs) {
      return res.status(401).json({
        msg: `all blogs not found`,
      });
    }
    return res.status(201).json({
      msg: `all blogs found`,
      data: allBlogs,
    });
  } catch (err) {
    return res.status(401).json({
      msg: `error from get all blog controller`,
      error: err,
    });
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({
        msg: `blog id not found`,
        error: err,
      });
    }
    const singleBlog = await BlogModel.findById({ _id: id });
    if (!singleBlog) {
      return res.status(401).json({
        msg: `single blog not found`,
      });
    }
    return res.status(201).json({
      msg: `single blog found successfully`,
      data: singleBlog,
      status: "ok",
    });
  } catch (err) {
    return res.status(401).json({
      msg: `error from single blog controller`,
      error: err,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(401).json({
        msg: `blog not found`,
        error: err,
      });
    }
    if (req.body?.blogTitle) {
      blog.blogTitle = req.body?.blogTitle;
    }
    if (req.body?.blogDescription) {
      blog.blogDescription = req.body?.blogDescription;
    }

    if (req.file) {
      try {
        const oldImagePart = blog.image.split("/");
        const oldImageName = oldImagePart[oldImagePart.length - 1];
        const targetPath = path.join("public", "temp", oldImageName);
        fs.unlinkSync(targetPath);
      } catch (err) {
        return res.status(401).json({
          msg: `Old image deletion failed`,
          error: err,
        });
      }
      blog.image = `http://localhost:4000/blog/${req.file?.filename}`;
    } else {
      blog.image = blog.image;
    }
    await blog.save();
    return res.status(200).json({
      msg: "Blog updated successfully",
      updatedBlog: blog,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      msg: `error from update blog controller`,
      error: err,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(401).json({
        msg: `blog not found from the id while deleteing`,
      });
    }

    try {
      const oldImagePart = blog.image.split("/");
      const oldImageName = oldImagePart[oldImagePart.length - 1];
      const targetPath = path.join("public", "temp", oldImageName);
      fs.unlinkSync(targetPath);
    } catch (err) {
      return res.status(401).json({
        msg: `Old image deletation failed`,
      });
    }

    const deleteItem = await BlogModel.findByIdAndDelete(id);
    return res.status(201).json({
      msg: `blog deleted successfully`,
      data: deleteItem,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      msg: `error from delete blog controller`,
      error: err,
    });
  }
};
