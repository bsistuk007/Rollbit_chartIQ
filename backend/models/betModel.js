import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const betSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    betCoinType: {
      type: String,
      required: true,
    },
    updownFlag: { //set up or down true: up, false: down
      type: String,
      required: true,
    },
    entryPrice: {
      type: Number,
      required: true,
    },
    wager: {
      type: Number,
      required: true
    },
    bustPrice: {
      type: Number,
      required: true
    },
    multiplier: {
      type: Number,
      required: true
    },
    exitPrice: {
      type: Number,
    },
    PnL: {
      type: Number,
    },
    ROI: {
      type: Number,
    },
    betState: { //active bet/cashed out/busted
      type: String,
      required: true,
      default: "active"
    },
    dateTime: {
      type: Date,
      requred: true,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

const Bet = mongoose.model("Bet", betSchema);

export default Bet;
