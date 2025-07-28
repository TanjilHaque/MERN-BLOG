const { UserModel } = require("../models/user.model");
exports.registration = async (req, res) => {
  try {
    const { userName, email, password, phoneNumber } = req.body;
    if (!userName) {
      return res.status(401).json({
        msg: "userName missing",
      });
    }
    if (!email) {
      return res.status(401).json({
        msg: "email missing",
      });
    }
    if (!password) {
      return res.status(401).json({
        msg: "password missing",
      });
    }
    if (!phoneNumber) {
      return res.status(401).json({
        msg: "phoneNumber missing",
      });
    }

    const isExist = await UserModel.findOne({ email: email });
    if (isExist) {
      return res.status(401).json({
        msg: `${email} already exists`,
      });
    }

    //now save the data
    UserModel.create({
      userName,
      email,
      password,
      phoneNumber,
      ...req.body,
    });

    return res.status(200).json({
      msg: "Registration Successful",
    });
  } catch (err) {
    console.log(`Error from registration controller ${err}`);
    res.status(501).json({
      msg: "Error from registration controller",
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const isExist = await UserModel.findOne({
      $and: [
        {
          email: req.body.email,
          password: req.body.password,
        },
      ],
    });
    if (!isExist) {
      return res.status(401).json({
        msg: `email/password invalid`,
      });
    }

    return res.status(200).json({
      msg: "Login Successful",
    });
  } catch (err) {
    console.log("error from login controller, ", err);
  }
};
