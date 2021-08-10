const express = require("express");

const { goodsValidator } = require("../middlewares/validators/goods");
const {
  createGoods,
  getAllGoods,
  getGoodById,
  updateGood,
  deleteGood,
} = require("../controllers/goods");

const router = express.Router();

router.get("/", getAllGoods);
router.get("/:id", getGoodById);
router.post("/", goodsValidator, createGoods);
router.put("/:id", goodsValidator, updateGood);
router.delete("/:id", deleteGood);

module.exports = router;
