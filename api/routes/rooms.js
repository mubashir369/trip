import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  selectedRoomData,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//create
router.post("/:hotelId", verifyAdmin, createRoom);

//update
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", verifyUser, updateRoomAvailability);
//delete
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);
//get
router.get("/:id", getRoom);
//getAll
router.get("/", getRooms);
router.get('/selectedRoom/:id',verifyUser,selectedRoomData)

export default router;
