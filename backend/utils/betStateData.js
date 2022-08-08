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
                    } catch(err) {
                        console.log(err);
                    }
                } 
                let plusMin = betData.updownFlag == 'up' ? 1 : -1;
                let priceMove = parseFloat(((betData.entryPrice - coinPrice) / coinPrice * 100).toFixed(2));
                let ROI = parseFloat((plusMin * priceMove * 9 / 10).toFixed(3));
                let PnL = parseFloat((ROI * betData.wager / 100).toFixed(3));
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