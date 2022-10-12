import express from "express";
import { checkOut, paymentVerification } from "../controllers/payment.js";
const router = express.Router();

router.post("/checkout",checkOut);
router.post('/paymentVerification',paymentVerification)
router.get('/getKey',(req,res)=>res.json({key:process.env.RZP_KEY}))

export default router;
