import express from "express";
const router = express.Router();
import {
    getBalance
} from "../controllers/balanceController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/balance")
  .get(protect, getBalance)
  ;

export default router;
