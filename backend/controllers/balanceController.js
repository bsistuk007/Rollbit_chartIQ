import asyncHandler from "express-async-handler";
// import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Cashier from "../models/cashierModel.js";
import solanaWeb3 from "@solana/web3.js";
// import CoinKey from "coinkey";
// import ethWallet from 'ethereumjs-wallet';
// import bs58 from 'bs58';

// @desc    Get balance
// @route   GET /api/balance
// @access  Private
const getBalance = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const bitcoinAddress = user.walletInfo.bitcoin.address;
  const ethereumAddress = user.walletInfo.ethereum.address;
  const solanaAddress = user.walletInfo.solana.address;
  const balance = user.balance;
  const depositHistory = await Cashier.find({ user_id: user._id, cashierFlag: true }).exec();
  const endpoint = 'https://example.solana-devnet.quiknode.pro/000000/';
  const solanaConnection = new solanaWeb3.Connection(endpoint);
  const getTransactions = async(solanaAddress, numTx) => {
      const pubKey = new solanaWeb3.PublicKey(solanaAddress);
      let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, {limit:numTx});
      transactionList.forEach((transaction, i) => {
          const date = new Date(transaction.blockTime*1000);
          console.log(`Transaction No: ${i+1}`);
          console.log(`Signature: ${transaction.signature}`);
          console.log(`Time: ${date}`);
          console.log(`Status: ${transaction.confirmationStatus}`);
          console.log(("-").repeat(20));
      })
  }
  res.json("Success");
  // if (user) {
  //   res.json({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     isAdmin: user.isAdmin,
  //     isEmailVerified: user.isEmailVerified,
  //     isPrivate: user.isPrivate,
  //     isFacode: user.isFacode,
  //     walletInfo: {
  //       bitcoinAddress: user.walletInfo.bitcoin.address,
  //       ethereumAddress: user.walletInfo.ethereum.address,
  //       solanaAddress: user.walletInfo.solana.address
  //     }
  //   });
  // } else {
  //   res.status(404);
  //   throw new Error("User not found");
  // }
});


export {
  getBalance
};
