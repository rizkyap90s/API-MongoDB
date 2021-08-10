const validator = require("validator");
const { ObjectId } = require("mongodb");

exports.supplierValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (validator.isEmpty(req.body.name)) {
      errorMessages.push("Name can not be empty!");
    }

    next();
  } catch (error) {
    next(error);
  }
};
