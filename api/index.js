import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import hotelsRouter from './routes/hotels.js'
import roomsRouter from './routes/rooms.js'
import paymentRouter from './routes/payment.js'
import orderRouter from './routes/order.js'
import cors from 'cors'
import Razorpay from 'razorpay'

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected",()=>{
    console.log("MongoDb Disconnected!");
})

export const instance = new Razorpay({
  key_id: process.env.RZP_KEY,
  key_secret: process.env.RZP_SECRET_KEY,
});
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api/users',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/hotels',hotelsRouter)
app.use('/api/rooms',roomsRouter)
app.use('/api/payment',paymentRouter)
app.use('/api/order',orderRouter)
app.use((err,req,res,next)=>{   
    const errorStatus=err.status||500
    const errorMessage=err.message||"Something Wrong!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

app.listen(5000, () => {
    connect()
  console.log("Connect to Backend");
});
