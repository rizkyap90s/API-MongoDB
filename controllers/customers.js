const { ObjectId } = require("mongodb");
const connection = require("../models");

class Customers {
  async getAllCustomers(req, res, next) {
    try {
      const data = await connection
        .db("sales_morning")
        .collection("customers")
        .find()
        .toArray();

      if (data.length === 0) {
        return next({ statusCode: 404, messages: ["Customers not found"] });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getOneCustomer(req, res, next) {
    try {
      const data = await connection
        .db("sales_morning")
        .collection("customers")
        .findOne({
          _id: ObjectId(req.params.id),
        });

      if (!data) {
        return next({ statusCode: 404, messages: ["Customers not found"] });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createCustomer(req, res, next) {
    try {
      const newData = await connection
        .db("sales_morning")
        .collection("customers")
        .insertOne(req.body);

      const data = await connection
        .db("sales_morning")
        .collection("customers")
        .findOne({ _id: newData.insertedId });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateCustomers(req, res, next) {
    try {
      const updateData = await connection
        .db("sales_morning")
        .collection("customers")
        .findOneAndUpdate(
          { _id: ObjectId(req.params.id) },
          {
            $set: {
              name: req.body.name,
            },
          }
        );
      if (!updateData.value) {
        return next({
          message: `Customer with id ${req.params.id} is not found`,
          status: 404,
        });
      }
      res.status(201).json({ data: updateData.value });
    } catch (err) {
      next(err);
    }
  }

  async deleteCustomer(req, res, next) {
    try {
      const deletedData = await connection
        .db("sales_morning")
        .collection("customers")
        .deleteOne({ _id: ObjectId(req.params.id) });

      if (deletedData.deletedCount === 0) {
        return next({ message: "Data not found", statusCode: 404 });
      }

      res.status(200).json({ data: `Data with id ${req.params.id} deleted` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Customers();
