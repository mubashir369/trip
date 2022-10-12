import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
const router=express.Router()
//update
router.put("/:id",verifyUser, updateUser);
//delete
router.delete("/:id", deleteUser);
//get
router.get("/:id",verifyUser, getUser);
//getAll
router.get("/",verifyAdmin, getUsers);


export default router