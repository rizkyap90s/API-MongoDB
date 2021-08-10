const { ObjectId } = require("mongodb");
const connection = require("../models");

class Goods {
  async getAllGoods(req, res, next) {
    try {
      const data = await connection
        .db("sales_morning")
        .collection("goods")
        .find()
        .toArray();
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getGoodById(req, res, next) {
    try {
      const data = await connection
        .db("sales_morning")
        .collection("goods")
        .findOne({
          _id: new ObjectId(req.params.id),
        });

      if (!data) {
        return next({ message: "good not found", statusCode: 400 });
      }
      const findSupplier = await connection
        .db("sales_morning")
        .collection("suppliers")
        .findOne({ _id: ObjectId(data.id_supplier) });

      delete data.id_supplier;
      data.supplier = findSupplier;

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createGoods(req, res, next) {
    try {
      const newData = await connection
        .db("sales_morning")
        .collection("goods")
        .insertOne(req.body);

      const data = await connection
        .db("sales_morning")
        .collection("goods")
        .findOne({ _id: newData.insertedId });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateGood(req, res, next) {
    try {
      const data = await connection
        .db("sales_morning")
        .collection("goods")
        .findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: req.body });

      res.status(201).json({ data: data.value });
    } catch (error) {
      next(error);
    }
  }
  async deleteGood(req, res, next) {
    try {
      const deleteGood = await connection
        .db("sales_morning")
        .collection("goods")
        .deleteOne({ _id: ObjectId(req.params.id) });

      if (deleteGood.deletedCount === 0) {
        return next({ message: "good not found", statusCode: 404 });
      }
      res.status(200).json({ data: `data ${req.params.id} has deleted` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Goods();
