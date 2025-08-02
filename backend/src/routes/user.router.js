import express from 'express';
import {  getOutgoingFriendRequest, acceptFriendRequest, getFriendRequest, getMyFriends, getRecommendedUsers, sendFriendRequest } from '../controllers/user.controllers.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();


router.use(protectRoute); //apply this to all routes

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.get("/friend-requests", getFriendRequest);
router.get("/outgoing-friend-requests", getOutgoingFriendRequest);



export default router;