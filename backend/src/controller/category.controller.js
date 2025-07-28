const { validateBody } = require("../helpers/validator");
const { CategoryModel } = require("../models/category.model");

// @desc create category
exports.createCategory = async (req, res) => {
  try {
    const { empty, fieldName } = validateBody(req);
    if (empty) {
      return res.status(401).json({
        msg: `${fieldName} missing`,
      });
    }
    const isExist = await CategoryModel.findOne({
      categoryName: req.body.categoryName,
    });
    if (isExist) {
      res.status(401).json({
        msg: `${isExist.categoryName} already exists try another one`,
      });
    }

    //save category
    const category = await new CategoryModel({
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
    }).save();

    if (!category) {
      return res.status(401).json({
        msg: `${req.body.categoryName} creaet failed`,
      });
    }
    return res.status(201).json({
      msg: `${req.body.categoryName} create successful`,
    });
  } catch (err) {
    return res.status(401).json({
      msg: `error from createCategory controller`,
      error: err,
    });
  }
};

// @desc getAllCategory
exports.getAllCategory = async (_, res) => {
  try {
    const allCategory = await CategoryModel.find({}).select("-__v");
    if (!allCategory) {
      console.log("category not found");

      return res.status(401).json({
        msg: `all category not found`,
      });
    }
    return res.status(200).json({
      msg: `Got all category successfully`,
      data: allCategory,
      status: 200,
    });
  } catch (err) {
    return res.status(401).json({
      msg: `error from getAllCategory controller`,
      error: err,
    });
  }
};

// @desc singleCategory
exports.getSingleCategory = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(401).json({
        msg: `category name missing`,
      });
    }
    const singleCategoryItem = await CategoryModel.findOne({
      categoryName: name,
    });
    if (!singleCategoryItem) {
      return res.status(401).json({
        msg: "single category not found",
      });
    }
    return res.status(200).json({
      msg: `got single category successfully`,
      data: singleCategoryItem,
      status: "ok",
    });
  } catch (err) {
    return res.status(401).json({
      msg: `error from single category controller`,
      error: err,
    });
  }
};

// @desc updateCategory
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({
        msg: `id not found while updateing the category`,
      });
    }
    const category = await CategoryModel.findOne({ _id: id });
    if (!category) {
      return res.status(401).json({
        msg: `category missing while updating the category`,
      });
    }
    category.categoryName = req.body.categoryName || category.categoryName;
    category.categoryDescription =
      req.body.categoryDescription || category.categoryDescription;
    await category.save();
    return res.status(200).json({
      msg: `upadating the category successful`,
      data: category,
      status: "ok",
    });
  } catch (err) {
    console.log(`error frome update category ${err}`);
    return res.status(401).json({
      msg: `error frome update category ${err}`,
    });
  }
};

// @desc deleteCategory
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({
        msg: `cannot delete because id not found`,
      });
    }
    const deletedItem = await CategoryModel.findOneAndDelete({ _id: id });
    if (!deletedItem) {
      return res.status(401).json({
        msg: `category not found to delete`,
      });
    }
    return res.status(200).json({
      msg: `category deleted successfully`,
      data: deletedItem,
      status: "ok",
    });
  } catch (err) {
    return res.status(401).json({
      msg: `Error frome delete category controller`,
      error: err,
    });
  }
};
