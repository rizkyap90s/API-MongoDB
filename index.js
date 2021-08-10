//? import dependencies
// ////////////////////
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment
const express = require("express");
const app = express();

// ? import routes
// ///////////////
const transactionsRouter = require("./routes/transactions");
const customersRouter = require("./routes/customers");
const employeesRouter = require("./routes/employees");
const goodsRouter = require("./routes/goods");
const suppliersRouter = require("./routes/suppliers");
// ? import error handler
// ///////////////
const errorHandler = require("./middlewares/errorHandler/errorHandler");

//? use json and urlencoded
// ///////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ? use routes
// /////////
app.use("/transactions", transactionsRouter);
app.use("/customers", customersRouter);
app.use("/employees", employeesRouter);
app.use("/goods", goodsRouter);
app.use("/suppliers", suppliersRouter);

// ? if routes not found
// ? make sure to write this code ABOVE app.use(errorHandler)
// ? * means all routes that's not included above
// ? app.all means every calls like get/post/put/delete
app.all("*", async (req, res, next) => {
  try {
    next({
      messages: "Not found",
      statusCode: 404,
    });
  } catch (error) {
    next(error);
  }
});

// ? use error handler
// ///////////////
app.use(errorHandler);

//? listen to port
// ////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening to 3000"));
