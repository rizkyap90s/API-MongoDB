const { ObjectId } = require("mongodb");
const connection = require("../models");

class Employees {
	async getAllEmployees(req, res, next) {
		try {
			const getData = await connection
				.db("sales_morning")
				.collection("employees")
				.find()
				.toArray();
			res.status(200).json({ data: getData });
		} catch (err) {
			next(err);
		}
	}

	async getEmployeeById(req, res, next) {
		try {
			const getData = await connection
				.db("sales_morning")
				.collection("employees")
				.findOne({ _id: ObjectId(req.params.id) });

			if (!getData) {
				return next({
					message: `Employee with id ${req.params.id} is not found`,
					status: 404,
				});
			}

			res.status(200).json({ data: getData });
		} catch (err) {
			next(err);
		}
	}

	async createEmployee(req, res, next) {
		try {
			const createData = await connection
				.db("sales_morning")
				.collection("employees")
				.insertOne({ name: req.body.name });
			const getData = await connection
				.db("sales_morning")
				.collection("employees")
				.findOne({ _id: createData.insertedId });
			res.status(201).json({ data: getData });
		} catch (err) {
			next(err);
		}
	}

	async updateEmployee(req, res, next) {
		try {
			const updateData = await connection
				.db("sales_morning")
				.collection("employees")
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
					message: `Employee with id ${req.params.id} is not found`,
					status: 404,
				});
			}
			res.status(201).json({ data: updateData.value });
		} catch (err) {
			next(err);
		}
	}

	async deleteEmployee(req, res, next) {
		try {
			const deleteData = await connection
				.db("sales_morning")
				.collection("employees")
				.deleteOne({ _id: ObjectId(req.params.id) });

			if (deleteData.deletedCount == 0) {
				return next({
					message: `Employee with id ${req.params.id} is not found`,
					status: 404,
				});
			}
			res.status(200).json({
				message: `Employee with id ${req.params.id} has been deleted`,
			});
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new Employees();
