import express from 'express';
import { signup, login, logout, onboarding } from '../controllers/auth.controllers.js'; // imports the function from the controllers folder
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login',  login);
router.post('/logout', logout);
router.post('/onboarding',protectRoute, onboarding);
//check if user is logged in
router.get("/me", protectRoute,(req,res)=>{
    res.status(200).json({success:true, user: req.user}); //password not visible as cut from req.user in middleware
})
export default router;