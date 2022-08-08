import mongoose from "mongoose";

const houseWalletSchema = mongoose.Schema(
  {
    bitcoin:  {
      address: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      }
    },
    ethereum: {
      address: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      }
    },
    solana: {
      address: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      }
    }
  },
  {
    timestamps: true,
  }
);

const HouseWallet = mongoose.model("HouseWallet", houseWalletSchema);

export default HouseWallet;
