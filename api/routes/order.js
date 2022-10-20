import express from "express";
import {
  getAllOrderByUser,
  getAllOrders,
  getOrder,
} from "../controllers/orderController.js";
const router = express.Router();
router.get("/orders", getAllOrders);
router.get("/orders/:id", getAllOrderByUser);
router.get('/:id',getOrder)
export default router;
