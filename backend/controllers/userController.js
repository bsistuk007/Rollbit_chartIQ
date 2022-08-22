import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Cashier from "../models/cashierModel.js";
import Bet from "../models/betModel.js";
import solanaWeb3 from "@solana/web3.js";
import CoinKey from "coinkey";
import ethWallet from 'ethereumjs-wallet';
import bs58 from 'bs58';
import axios from 'axios';
import web3 from "web3";
import bitcoinfees from 'bitcoinfees-21co';
import feeutil from 'bitcoin-util-fee';
import HouseWallet from "../models/houseWallet.js";
import CryptoAccount from "send-crypto";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isEmailVerified: user.isEmailVerified,
      isPrivate: user.isPrivate,
      isFacode: user.isFacode,
      balance: user.balance,
      walletInfo: {
        bitcoinAddress: user.walletInfo.bitcoin.address,
        ethereumAddress: user.walletInfo.ethereum.address,
        solanaAddress: user.walletInfo.solana.address
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const usernameExits = await User.findOne({username});

  if(usernameExits) {
    res.status(400);
    throw new Error("display name is already taken")
  }

  const emailExits = await User.findOne({ email });

  if (emailExits) {
    res.status(400);
    throw new Error("email is already used");
  }
  const bitcoinWallet = new CoinKey.createRandom(); 
  const etheremWallet = ethWallet['default'].generate();
  const solanaWallet = solanaWeb3.Keypair.generate();

  const user = await User.create({
    username,
    email,
    password,
    walletInfo: {
      bitcoin: {
        address: bitcoinWallet.publicAddress,
        privateKey: bs58.encode(bitcoinWallet.privateKey)
      },
      ethereum: {
        address: etheremWallet.getAddressString(),
        privateKey: bs58.encode(etheremWallet.getPrivateKey())
      },
      solana: {
        address: solanaWallet.publicKey.toBase58(),
        privateKey: bs58.encode(solanaWallet.secretKey)
      }
    }
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      isEmailVerified: user.isEmailVerified,
      isPrivate: user.isPrivate,
      isFacode: user.isFacode,
      balance: user.balance,
      walletInfo: {
        bitcoinAddress: user.walletInfo.bitcoin.address,
        ethereumAddress: user.walletInfo.ethereum.address,
        solanaAddress: user.walletInfo.solana.address
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isEmailVerified: user.isEmailVerified,
      isPrivate: user.isPrivate,
      isFacode: user.isFacode,
      balance: user.balance,
      walletInfo: {
        bitcoinAddress: user.walletInfo.bitcoin.address,
        ethereumAddress: user.walletInfo.ethereum.address,
        solanaAddress: user.walletInfo.solana.address
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


// @desc    Update user profile
// @route   PUT /api/users/email
// @access  Private
const updateUserEmail = asyncHandler(async (req, res) => {
  console.log('emailasdf');
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const type = req.body.type;
  if (user) {
    if(type === "email" && req.body.newEmail) { //set email update
      const emailExits = await User.findOne({ email: req.body.newEmail });
      if (emailExits) {
        res.status(400);
        throw new Error("email is already used");
      }
      user.email = req.body.newEmail;
    }
    if(type === "password" && req.body.oldPassword && req.body.newPassword){
      const oldPassword = req.body.oldPassword;
      if(await user.matchPassword(oldPassword)){
        const newPassword = req.body.newPassword;
        user.password = newPassword;
      } else {
        res.status(400);
        throw new Error("existing password doesn't match");
      }
    }
    if(type === "private") {
      user.isPrivate = req.body.isPrivate;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isEmailVerified: updatedUser.isEmailVerified,
      isPrivate: updatedUser.isPrivate,
      isFacode: updateUser.isFacode,
      isAdmin: updatedUser.isAdmin,
      balance: updatedUser.balance,
      walletInfo: {
        bitcoinAddress: user.walletInfo.bitcoin.address,
        ethereumAddress: user.walletInfo.ethereum.address,
        solanaAddress: user.walletInfo.solana.address
      },
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


//@desc check new deposit state
//@route Get /api/users/checkdeposit
//@access Private
const depositCheck = asyncHandler(async (req, res) => {
  console.log('deposit check');
  const user = await User.findById(req.user._id);
  if(!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const bitcoinAddress = user.walletInfo.bitcoin.address;
  const ethereumAddress = user.walletInfo.ethereum.address;
  const solanaAddress = user.walletInfo.solana.address;
  var balance = user.balance;
  const depositHistory = await Cashier.find({ user_id: user._id, cashierFlag: true }).exec();
  var bitcoinPrice = 0;
  var ethereumPrice = 0;
  var solanaPrice = 0;
  // var coinPriceUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Csolana%2Cethereum&vs_currencies=usd";
  try{
    var coinPriceUrl = 'https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT","SOLUSDT"]';
    const {data} = await axios.get(coinPriceUrl);
    bitcoinPrice = data[0].price;
    ethereumPrice = data[1].price;
    solanaPrice = data[2].price;
  }catch(err){
    res.status(404);
    throw new Error("get coin price error");
  }
  
  var bitcoinTxHashes = [];
  var ethereumTxHashes = [];
  var solanaTxHashes = [];
  depositHistory.forEach(history => {
    if(history.coinType == "bitcoin"){
      bitcoinTxHashes.push(history.txHash);
    }
    if(history.coinType == "ethereum") {
      ethereumTxHashes.push(history.txHash);
    }
    if(history.coinType == "solana"){
      solanaTxHashes.push(history.txHash)
    }
  });

  //get Ethereum Deposit Balance
  const ethereumUrl = 'https://api.etherscan.io/api?module=account&action=txlist&address='+ethereumAddress+'&page=1&offset=10&apikey=XA8CVSNEQN1F8CTD8FADCQ4F4KGPXVUVQQ&sort=desc';
  try{
    const {data} = await axios.get(ethereumUrl);
    var txList = data.result;
    var coinType = "ethereum";
    var creditAmount = 0;
    var amount = 0;
    //todo: get ehter current price
    for (let index = 0; index < txList.length; index++) {
      var tx = txList[index];
      if(tx.from.toLowerCase() == user.walletInfo.ethereum.address.toLowerCase())
        continue;
      var txHash = tx.hash;
      if(ethereumTxHashes.indexOf(txHash) == -1){
        amount = tx.value * Math.pow(10, -18);
        creditAmount = amount * ethereumPrice;
        var cashierDoc = new Cashier({ 
          user_id: req.user._id,
          username: user.username,
          cashierFlag: true,
          txHash: txHash,
          coinType: coinType,
          amount: amount,
          creditAmount: parseFloat(creditAmount.toFixed(2)),
        });
        await cashierDoc.save();
        balance += creditAmount;
      } else {
        break;
      }
    }
  } catch(err){
    console.error(err)
  }

  //get Solana Deposit Balance
  const solanaUrl = 'https://public-api.solscan.io/account/solTransfers?account='+solanaAddress;
  try{
    const { data } = await axios.get(solanaUrl);
    var txList = data.data;
    var coinType = "solana";
    var creditAmount = 0;
    var amount = 0;
    for (let index = 0; index < txList.length; index++) {
      var tx = txList[index];
      if(tx.src == user.walletInfo.solana.address)
        continue;
      var txHash = tx.txHash;
      if(solanaTxHashes.indexOf(txHash) == -1){
        amount = tx.lamport * Math.pow(10, -9);
        creditAmount = amount * solanaPrice;
        var cashierDoc = new Cashier({ 
          user_id: req.user._id,
          username: user.username,
          cashierFlag: true,
          txHash: txHash,
          coinType: coinType,
          amount: amount,
          creditAmount: parseFloat(creditAmount.toFixed(2)),
        });
        await cashierDoc.save();
        balance += creditAmount;
      } else {
        break;
      }
    }
  } catch(err) {
    console.error(err)
  }

  //get Bitcoin Deposit Balance
  const bitcoinUrl = 'https://chain.api.btc.com/v3/address/'+ bitcoinAddress +'/tx';
  try{
    const { data } = await axios.get(bitcoinUrl)
    if(data.data.list){
      var txList = data.data.list;
      var coinType = "bitcoin";
      var creditAmount = 0;
      var amount = 0;
      for (let index = 0; index < txList.length; index++) {
        var tx = txList[index];
        if(tx.balance_diff < 0)
          continue;
        var txHash = tx.hash;
        if(bitcoinTxHashes.indexOf(txHash) == -1){
          amount = tx.balance_diff * Math.pow(10, -9);
          creditAmount = amount * bitcoinPrice;
          var cashierDoc = new Cashier({ 
            user_id: req.user._id,
            username: user.username,
            cashierFlag: true,
            txHash: txHash,
            coinType: coinType,
            amount: amount,
            creditAmount: parseFloat(creditAmount.toFixed(2)),
          });
          await cashierDoc.save();
          balance += creditAmount;
        } else {
          break;
        }
      }
    }
  } catch(err){
    console.error(err)
  }
  user.balance = parseFloat(balance.toFixed(2));
  await user.save();
  if (user) {
    res.json({
      balance: user.balance,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user balance
// @route   GET /api/users/balance
// @access  Private
const getUserBalance = asyncHandler(async (req, res) => {
  console.log('getUserBalance');
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      balance: user.balance,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Place Bet
//@route post /api/users/placebet
//@access Private
const placeBet = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(!user) {
    res.status(404);
    throw new Error("User not found");
  }
  try{
    var betDoc = { 
      user_id: req.user._id,
      username: user.username,
      betCoinType: req.body.betCoinType,
      updownFlag: req.body.updownFlag,
      entryPrice: req.body.entryPrice,
      wager: req.body.wager,
      bustPrice: req.body.bustPrice,
      multiplier:req.body.multiplier,
      exitPrice: 0,
      PnL: 0,
      RoI: 0,
      betState: 'active',
      autoStopProfitState: req.body.autoStopProfitState,
      autoStopLossState: req.body.autoStopLossState,
      autoStopProfitAmount: req.body.autoStopProfitAmount,
      autoStopLossAmount: req.body.autoStopLossAmount,      
    }
    const bet = await Bet.create(betDoc);
    const balance = user.balance - parseFloat(req.body.wager);
    user.balance = balance;
    await user.save();
    res.json(bet)
  } catch(err){
    console.log(err)
    res.status(404);
    throw new Error("place bet error");
  }
})

//@desc get closed bet data by user
//@route get /api/users/closedbetdata
//@access Private
const getClosedBedDataByUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(!user) {
    res.status(404);
    throw new Error("User not found");
  }
  try {
    const closedBetData = await Bet.find({ betState: {$ne : 'active'}, user_id: user._id }).sort({dateTime: 'desc'}).limit(15).exec();
    res.json(closedBetData);
  } catch (err){
    res.json([])
    console.log(err)
  }
})

//@desc get Leaderboard
//@route get /api/users/leaderboard
//@access Private
const getLeaderboardData = asyncHandler (async (req, res) => {
  // const user = await User.findById(req.user._id);
  // if(!user) {
  //   res.status(404);
  //   throw new Error("User not found");
  // }
  try {
    var leaderboardData = await Bet.find({betState: "cashed out", PnL: {$gte: 0}}).sort({PnL: 'desc'}).limit(15).exec();
    res.json(leaderboardData);
  } catch (err){
    console.log(err)
    res.json([]);
  }
})

//@desc Get Bet Data(Active Bets/Closed Bets/Public Bets/LeaderBoard)
//@route get /api/users/getbetdata
//@access Private
const getBetDataByUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(!user) {
    res.status(404);
    throw new Error("User not found");
  }
  try{
    const activeBetData = await Bet.find({ user_id: user._id, betState: 'active' }).exec();
    const closedBetData = await Bet.find({user_id: user._id, betState: {$ne: 'active'}}).exec();
    res.json({
      activeBetData: activeBetData,
      closedBetData: closedBetData
    });
  } catch(err) {
    console.log(err)
    res.status(404);
    throw new Error("Get Bet Data error");
  }
})

//@desc cashOut action
//@route PUT /api/users/cashout
//access Private
const cashOut = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.user._id);
  if(!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const ROI = req.body.ROI;
  const PnL = req.body.PnL;
  const betId = req.body.betId;
  const exitPrice = req.body.exitPrice;
  const betData = await Bet.findById(betId);
  if(!betData && betData.betState != 'active') {
    res.status(404);
    throw new Error('Bet Data Not Found');
  }
  betData.betState = 'cashed out';
  betData.ROI = ROI;
  betData.PnL = PnL;
  betData.exitPrice = exitPrice;
  var deltaBalance = parseFloat(betData.wager) + parseFloat(PnL);
  user.balance = user.balance + deltaBalance;
  try{
    await betData.save();
    await user.save();
    res.send(JSON.stringify({
      status: "success",
      message: "success cashout",
    }))
  } catch(err) {
    console.log(err)
  }
  //todo cashier modal update
})

// @desc    withdraw
// @route   PUT /api/users/withdraw
// @access  Private
const withdraw = asyncHandler(async (req, res) => {
  console.log("withdraw")
  const user = await User.findById(req.user._id);
  if(!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const houseWallet = await HouseWallet.find().all();
  if(!houseWallet) {
    res.status(404);
    throw new Error("Housewallet error");
  }
  const houseWalletInfo = houseWallet[0];
  const balance = user.balance;
  const type = req.body.type;
  const withdrawCoinAmount = req.body.coinAmount;
  const creditAmount = parseFloat(req.body.amount);
  const withdrawAddress = req.body.address;
  if( balance < req.body.amount ) {
    res.send(JSON.stringify({
      status: "fail",
      message: "insufficient balance",
    }))
  }
  var houseWalletAddress = "";
  var houseWalletPrivateKey = "";
  if(type == 'btc') { //Withdrawal coin type is in case BTC
    houseWalletAddress = houseWalletInfo.bitcoin.address;
    houseWalletPrivateKey = bs58.decode(houseWalletInfo.bitcoin.password);
  }
  if(type == 'eth') {
    houseWalletAddress = houseWalletInfo.ethereum.address;
    houseWalletPrivateKey = bs58.decode(houseWalletInfo.ethereum.password);
  }
  if(type == 'sol') {
    houseWalletAddress = houseWalletInfo.solana.address;
    houseWalletPrivateKey = bs58.decode(houseWalletInfo.solana.password);
  }
  // if(houseWalletAddress == "" || houseWalletPrivateKey == "") {
  //   res.status(404);
  //   throw new Error("Housewallet address error");
  // }

  if(type == "eth" || type == "btc") {
    try{
      const networkConfig = type == 'eth' ? 'ropsten' : 'testnet';
      const account = new CryptoAccount(houseWalletPrivateKey, {network: networkConfig});
  
      const txHash = await account
        .send(withdrawAddress, withdrawCoinAmount, type.toUpperCase())
        .on("transactionHash", function(result) {
          console.log("TX", result)
        })
        .on("confirmation", function(result) {
          console.log("confirmation", result);
      });
      var coinType = type == "btc" ?  "bitcoin" : "ethereum";
      var cashierDoc = new Cashier({ 
        user_id: req.user._id,
        username: user.username,
        cashierFlag: false,
        txHash: txHash,
        coinType: coinType,
        amount: withdrawCoinAmount,
        creditAmount: parseFloat(creditAmount.toFixed(2)),
      });
      const balance = user.balance - parseFloat(creditAmount);
      user.balance = balance;
      await user.save();
      await cashierDoc.save();
      res.send(JSON.stringify({
        status: "success",
        message: "Withdraw successful!",
      }))
    } catch(err) {
      console.log(err)
    }
  }

  if(type == "sol") {
    console.log('sol withdraw')
    const networkConfig = "testnet"; //mainnet-beta
    let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(networkConfig));
    let transaction = new solanaWeb3.Transaction()
    const HouseW = solanaWeb3.Keypair.fromSecretKey(houseWalletPrivateKey)
    
    transaction.add(solanaWeb3.SystemProgram.transfer(
			{
				fromPubkey: HouseW.publicKey,
				toPubkey: new solanaWeb3.PublicKey(withdrawAddress),
				lamports: Math.ceil(solanaWeb3.LAMPORTS_PER_SOL * withdrawCoinAmount)
			}
		))
    var signature = await solanaWeb3.sendAndConfirmTransaction( connection, transaction, [HouseW] )
    if(signature){
      try{
        let transactionStatus = await connection.confirmTransaction(signature);
        if(transactionStatus.value.err == null) {
          var cashierDoc = new Cashier({ 
            user_id: req.user._id,
            username: user.username,
            cashierFlag: false,
            txHash: signature,
            coinType: "solana",
            amount: withdrawCoinAmount,
            creditAmount: parseFloat(creditAmount.toFixed(2)),
          });
          
          const balance = user.balance - parseFloat(creditAmount);
          user.balance = balance;
          await user.save();
          const cashierSave = await cashierDoc.save();
          console.log("cahiserSave ", cashierSave)
          res.send(JSON.stringify({
            status: "success",
            message: "Withdraw successful!",
          }))
        }
      } catch(err) {
        console.log(err);
      }
		}
  }
  
})

//@desc Get all cahiser(deposit/withdraw) data by coinType
//@route GET /api/users/cashierhistory
//@access Private/Admin
const getCashierHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const cashierFlag = req.query.cashierType == 'deposits' ? true: false; // true/false: deposit/withdraw history
  const coinType = req.query.coinType; // bitcoin/ethereum/solana
  const cashierHistory = await Cashier.find({
                                              user_id: user._id,
                                              cashierFlag: cashierFlag,
                                              coinType: coinType,
                                            }).sort({dateTime: 'desc'}).exec();
  res.json(cashierHistory);
})

//@desc Get Network Fee
//@route GET /api/users/networkfee
//@access Private/Admin
const getNetworkFee = asyncHandler(async (req, res) => {
  const coinType = req.query.coinType;
  try{
    if(coinType == "eth") {
      const fee = 1.5;
      res.json({networkFee: fee});
      // const gasAmount = 21000;
      // const gasPrice = await web3.eth.getGasPrice();
      // console.log(gasPrice);
      // const fee = gasPrice * gasAmount;
      // console.log(fee);
      // res.json({networkFee: fee})
    }   
    if(coinType == 'btc') {
      const fee = 4.5;
      res.json({networkFee: fee});
      // const getCurrentFees = () =>
      //   bitcoinfees.FeesApi.recommended().then(res => res.fastestFee)
      // const process = () => {
      //     const number_of_input = 1;
      //     const number_of_output = 2;
      //     const satoshi = feeutil.p2pkh_tx_calc_fee(number_of_input, number_of_output)
      //     console.log("P2PKH fee %d satoshi", satoshi)
      // }
      
      // getCurrentFees().then(fee => {
      //     feeutil.BASE_SATOSHI_PER_BYTE = fee; // initialize satoshi/byte rate
      //     process()
      // })
    }
    if(coinType == 'sol') {
      const fee = 0.0025;
      res.json({networkFee: fee});
    }
  } catch(err){
    res.status(404);
    throw new Error("get fee error");
  }
  
  
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isEmailVerified: updatedUser.isEmailVerified,
      isPrivate: updatedUser.isPrivate,
      isFacode: updatedUser.isFacode,
      isAdmin: updatedUser.isAdmin,
      balance: updatedUser.balance,
      walletInfo: {
        bitcoinAddress: user.walletInfo.bitcoin.address,
        ethereumAddress: user.walletInfo.ethereum.address,
        solanaAddress: user.walletInfo.solana.address
      },
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
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
};
