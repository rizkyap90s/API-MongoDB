const { ObjectId } = require("mongodb");
const connection = require("../models");

class Suppliers {
  async getAllSuppliers(req, res, next) {
    try {
      const data = await connection
        .db("sales_morning")
        .collection("suppliers")
        .find()
        .toArray();

      if (data.length === 0) {
        return next({ statusCode: 404, messages: ["Suppliers is not found"] });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getOneSupplier(req, res, next) {
    try {
      const data = await connection
        .db("sales_morning")
        .collection("suppliers")
        .findOne({
          _id: ObjectId(req.params.id),
        });

      if (!data) {
        return next({ statusCode: 404, messages: ["Supplier is not found"] });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createSupplier(req, res, next) {
    try {
      const newData = await connection
        .db("sales_morning")
        .collection("suppliers")
        .insertOne(req.body);

      const data = await connection
        .db("sales_morning")
        .collection("suppliers")
        .findOne({ _id: newData.insertedId });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateSupplier(req, res, next) {
    try {
      const updateData = await connection
        .db("sales_morning")
        .collection("suppliers")
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
          message: `Supplier with id ${req.params.id} is not found`,
          status: 404,
        });
      }
      res.status(201).json({ data: updateData.value });
    } catch (err) {
      next(err);
    }
  }

  async deleteSupplier(req, res, next) {
    try {
      const deletedData = await connection
        .db("sales_morning")
        .collection("suppliers")
        .deleteOne({ _id: ObjectId(req.params.id) });

      if (deletedData.deletedCount === 0) {
        return next({ message: "Data is not found", statusCode: 404 });
      }

      res.status(200).json({ data: `Data with id ${req.params.id} deleted` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Suppliers();
