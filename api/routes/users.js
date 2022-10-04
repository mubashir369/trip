import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router=express.Router()
// router.get('/checkauthentication',verifyToken,(req,res,next)=>{
//     res.send("hello user you are logged in")
// })
// router.get('/checkuser/:id',verifyUser,(req,res,next)=>{
//     res.send("hello user you are logged in you can delete your acc")
// })
// router.get('/checkadmin/:id',verifyAdmin,(req,res,next)=>{
//     res.send("hello admin you are logged in you can delete all acc")
// })
//update
router.put("/:id", updateUser);
//delete
router.delete("/:id", deleteUser);
//get
router.get("/:id", getUser);
//getAll
router.get("/",verifyAdmin, getUsers);


export default router