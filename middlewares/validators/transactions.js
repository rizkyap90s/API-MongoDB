const validator = require("validator");
const { ObjectId } = require("mongodb");
const connection = require("../../models");

exports.transactionValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (!validator.isInt(req.body.quantity)) {
      errorMessages.push("Quantity must be a number");
    }

    if (errorMessages.length > 0) {
      return next({ messages: errorMessages, statusCode: 400 });
    }

    // find goods
    const good = await connection
      .db("sales_morning")
      .collection("goods")
      .findOne({ _id: ObjectId(req.body.id_good) });

    if (!good) {
      return next({ message: "Good not found", statusCode: 400 });
    }
    //  price is decimal, so it needs to convert to string then to number
    const total =
      parseFloat(req.body.quantity) * parseFloat(good.price.toString());

    req.body = {
      id_customer: ObjectId(req.body.id_customer),
      id_employee: ObjectId(req.body.id_employee),
      quantity: eval(req.body.quantity),
      good: good,
      total,
    };

    next();
  } catch (error) {
    next(error);
  }
};
