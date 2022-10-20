import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
  {
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    refId:{
        type:String
    },
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel"
    },
    rooms:[{number:Number,price:{type:Number}}],
    days:{
        type:String
    },
    amount:{
        type:Number
    },
    status:{
        type:String
    },
    startDate:{
        type:String
    },
    endDate:{
        type:String
    },  

    bookedDate:{
        type:String
    },
    paymentType:{
        type:String
    }
   
  },
  { timestamps: true }
);
export default mongoose.model("Order", OrderSchema);
