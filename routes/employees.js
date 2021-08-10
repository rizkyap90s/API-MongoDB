const {
	getAllEmployees,
	getEmployeeById,
	createEmployee,
	updateEmployee,
	deleteEmployee,
} = require("../controllers/employees");
const { nameFieldValidator } = require("../middlewares/validators/employees");

const router = require("express").Router();

router.route("/").get(getAllEmployees).post(nameFieldValidator, createEmployee);

router
	.route("/:id")
	.get(getEmployeeById)
	.put(nameFieldValidator, updateEmployee)
	.delete(deleteEmployee);

module.exports = router;
