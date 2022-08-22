import Bet from '../models/betModel.js';

const getBetStatisticsData = (async (priceData) => {
    try {
        let activeBetData = await Bet.find({ betState: 'active' }).exec();
        var resultActiveBets = [];
        if(activeBetData) {
            for(let i = 0 ; i <  activeBetData.length; i++) {
                let betData = activeBetData[i];
                let coinPrice = getCoinPrice(priceData, betData.betCoinType);
                
                if(betData.updownFlag == "up" && parseFloat(coinPrice) <= parseFloat(betData.bustPrice)){ // up bet bust case
                    try{
                        betData.betState = 'busted';
                        betData.PnL = -1 * betData.wager;
                        await betData.save();
                        continue;
                    } catch(err) {
                        console.log(err);
                    }
                }
                if(betData.updownFlag == "down" && parseFloat(coinPrice) >= parseFloat(betData.bustPrice)) { //down bet bust case
                    try{
                        betData.betState = 'busted';
                        betData.PnL = -1 * betData.wager;
                        await betData.save();
                        continue;
                    } catch(err) {
                        console.log(err);
                    }
                }
                
                let priceMove = parseFloat(((betData.entryPrice - coinPrice) / coinPrice * 100).toFixed(2));
                let plusMin = betData.updownFlag == 'up' ? 1 : -1;
                if(betData.updownFlag == "up") {
                    plusMin = parseFloat(coinPrice) >= parseFloat(betData.entryPrice) ? 1 : -1;
                }
                if(betData.updownFlag == "down") {
                    plusMin = parseFloat(coinPrice) <= parseFloat(betData.entryPrice) ? 1 : -1;
                }
                let ROI = parseFloat((plusMin * Math.abs(priceMove) * 9 / 10).toFixed(3));
                let PnL = parseFloat((ROI * betData.wager / 100 * parseFloat(betData.multiplier)).toFixed(3));
                if(betData.autoProfitState) { //auto stop profit setted
                    let autoStopProfitAmount = betData.autoStopProfitAmount;
                    if(PnL >= autoStopProfitAmount) {
                        betData.betState = "take profit";
                        betData.PnL = autoStopProfitAmount;
                        betData.ROI = ROI;
                        //todo: calculate balance
                        const user = await User.findById(betData.user._id);
                        if(user) {
                            user.balance = user.balance + betData.wager + PnL;
                            try{
                                await user.save();
                                await betData.save();
                            } catch(err) {
                                console.log(err);
                            }
                        }
                        continue;
                    }
                }
                if(betData.autoStopLossState) { //autoStop loss setted
                    let autoStopLossAmount = betData.autoStopLossAmount;
                    if(PnL <= -1 * autoStopLossAmount) {
                        betData.betState = "stop loss";
                        betData.PnL = -1 * autoStopLossAmount;
                        const user = await User.findById(betData.user._id);
                        if(user) {
                            user.balance = user.balance + betData.wager + PnL;
                            try{
                                await user.save();
                                await betData.save();
                            } catch(err) {
                                console.log(err);
                            }
                        }
                        // await betData.save();
                        continue;
                    }
                } 
                let temp = {
                    id: betData._id,
                    user_id: betData.user_id,
                    username: betData.username,
                    betCoinType: betData.betCoinType,
                    updownFlag: betData.updownFlag,
                    entryPrice: betData.entryPrice,
                    wager: betData.wager,
                    bustPrice: betData.bustPrice,
                    multiplier: betData.multiplier,
                    PnL: PnL,
                    ROI: ROI,
                    autoStopProfitState: betData.autoStopProfitState,
                    autoStopProfitAmount: betData.autoStopProfitAmount,
                    autoStopLossState: betData.autoStopLossState,
                    autoStopLossAmount: betData.autoStopLossAmount
                }
                resultActiveBets.push(temp);
            }
        }
        return resultActiveBets;
        
    } catch( err ) {
        console.log(err);
        return [];
    }
})

const getCoinPrice = (priceData, coinType) => {
    if(priceData.length == 0) {
        return false;
    }
    let coinPrice = priceData[0].price;
    if(coinType == "ETH")
        coinPrice = priceData[1].price;
    if(coinType == "SOL")
        coinPrice = priceData[2].price;
    return coinPrice;
}

export default getBetStatisticsData;