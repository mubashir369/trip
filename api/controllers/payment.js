import { instance } from "../index.js";
import crypto from "crypto";
export const checkOut = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({ success: true, order });
};

export const paymentVerification = async (req, res) => {
    console.log(req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RZP_SECRET_KEY)
    .update(body.toString())
    .digest("hex");
  if (razorpay_signature === expectedSignature) {
    
    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({ success: false });
  }
};
