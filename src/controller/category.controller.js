const { validateBody } = require("../helpers/validator");

exports.createCategory = async (req, res) => {
  try {
    const { empty, fieldName } = validateBody(req);
    if (empty) {
      return res.status(401).json({
        msg: `${fieldName} missing`,
      });
    }
  } catch (err) {
    return res.status(401).json({
      msg: `error from createCategory controller`,
      error: err,
    });
  }
};
