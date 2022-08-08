import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserEmail,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getUserBalance,
  withdraw,
  getCashierHistory,
  getNetworkFee,
  placeBet,
  getBetDataByUser,
  cashOut,
  getLeaderboardData,
  getClosedBedDataByUser,
  depositCheck,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/users").post(registerUser).get(protect, admin, getUsers);
router.post("/users/login", authUser);
router
  .route("/users/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/users/checkdeposit')
  .get(protect, depositCheck)
router
  .route("/users/balance")
  .get(protect, getUserBalance);
router
  .route("/users/withdraw")
  .put(protect, withdraw);
router
  .route("/users/networkfee")
  .get(protect, getNetworkFee);
router
  .route("/users/cashierhistory")
  .get(protect, getCashierHistory);
router
  .route('/users/placebet')
  .post(protect, placeBet);
router
  .route('/users/getbetdata')
  .get(protect, getBetDataByUser);
router
  .route("/users/email")
  .put(protect, updateUserEmail);
router 
  .route('/users/cashout')
  .put(protect, cashOut)
router
  .route('/users/leaderboard')
  .get(getLeaderboardData)
router
  .route('/users/closedbets')
  .get(protect, getClosedBedDataByUser)
router
  .route("/users/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
