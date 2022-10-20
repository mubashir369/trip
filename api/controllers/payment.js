import { instance } from "../index.js";
import crypto from "crypto";
import Order from "../models/Order.js";
export const checkOut = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    // const savedOrder = await newOrder.save();
    const options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {}
};

export const paymentVerification = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const body = order_id + "|" + payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RZP_SECRET_KEY)
    .update(body.toString())
    .digest("hex");
  if (signature === expectedSignature) {
    res.status(200).json({ success: true, payment_id });
  } else {
    res.status(400).json({ success: false });
  }
};
export const createOrder = async (req, res) => {
  try {
    await Order.create(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
