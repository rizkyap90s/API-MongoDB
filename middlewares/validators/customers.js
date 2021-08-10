const validator = require("validator");
const { ObjectId } = require("mongodb");

exports.customerValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (validator.isEmpty(req.body.name)) {
      errorMessages.push("Name must not be empty!");
    }

    req.body = {
      name: req.body.name,
    };

    next();
  } catch (error) {
    next(error);
  }
};
