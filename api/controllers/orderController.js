import Order from "../models/Order.js";
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {}
};
export const getAllOrderByUser = async (req, res) => {
  try {
    console.log("Dsd");
    const orders = await Order.find({ userId: req.params.id }).populate(
      "hotelId"
    );
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
  }
};
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("hotelId")
      .populate("userId", "-password");

    res.status(200).json({ order });
  } catch (error) {}
};
