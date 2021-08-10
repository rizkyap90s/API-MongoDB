const express = require("express");
const router = express.Router();

//? import validator
// ////////////////////
const {
  transactionValidator,
} = require("../middlewares/validators/transactions");

// ? import controller
// ////////////////////
const {
  createTransaction,
  getAllTransactions,
  getOneTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions");

// ? set up routes
// ///////////////
router.get("/", getAllTransactions);
router.get("/:id", getOneTransaction);
router.post("/", transactionValidator, createTransaction);
router.put("/:id", transactionValidator, updateTransaction);
router.delete("/:id", deleteTransaction);

/* 
* another way
router.route('/').post(createTransaction)
                .get(getAllTransactions)
*/

module.exports = router;
