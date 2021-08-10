const express = require("express");
const router = express.Router();

const { supplierValidator } = require("../middlewares/validators/suppliers");

const SupplierController = require("../controllers/suppliers");

router.get("/", SupplierController.getAllSuppliers);
router.get("/:id", SupplierController.getOneSupplier);
router.post("/", supplierValidator, SupplierController.createSupplier);
router.put("/:id", supplierValidator, SupplierController.updateSupplier);
router.delete("/:id", SupplierController.deleteSupplier);

module.exports = router;
