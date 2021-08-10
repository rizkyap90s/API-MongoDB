const express = require("express");
const router = express.Router();

// ? import validator
const { customerValidator } = require("../middlewares/validators/customers");

// ? import controller
// ////////////////////
const CustomerController = require("../controllers/customers");

// ? set up routes
// ///////////////
router.get("/", CustomerController.getAllCustomers);
router.get("/:id", CustomerController.getOneCustomer);
router.post("/", customerValidator, CustomerController.createCustomer);
router.put("/:id", customerValidator, CustomerController.updateCustomers);
router.delete("/:id", CustomerController.deleteCustomer);

module.exports = router;
