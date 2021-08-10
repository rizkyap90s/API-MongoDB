const validator = require("validator");
const { ObjectId } = require("mongodb");
const connection = require("../../models");

exports.goodsValidator = async (req, res, next) => {
  try {
    const errorMessages = [];
    if (!validator.isInt(req.body.price)) {
      errorMessages.push("price must be number");
    }

    if (errorMessages.length > 0) {
      return next({ messages: errorMessages, statusCode: 400 });
    }

    //find supplier
    const supplier = await connection
      .db("sales_morning")
      .collection("suppliers")
      .findOne({ _id: ObjectId(req.body.id_supplier) });

    if (!supplier) {
      return next({ message: "supplier doesn't exist", statusCode: 400 });
    }

    req.body = {
      name: req.body.name,
      price: eval(req.body.price),
      supplier: supplier,
    };
    next();
  } catch (error) {
    next(error);
  }
};
