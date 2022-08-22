import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

function ConfirmAutoBet() {
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [stopProfitPrice, setStopProfitPrice] = useState();
    const [stopProfitPriceSelect, setStopProfitPriceSelect] = useState(false);
    const [stopProfitAmountSelect, setStopProfitAmountSelect] = useState(false);
    const [stopLossPriceSelect, setStopLossPriceSelect] = useState(false);
    const [stopLossAmountSelect, setStopLossAmountSelect] = useState(false);
    const stopProfitPriceElement = useRef();
    const [stopLossPrice, setStopLossPrice] = useState();
    const stopLossPriceElement = useRef();
    const [stopProfitAmount, setStopProfitAmount] = useState();
    const stopProfitAmountElement = useRef();
    const [stopLossAmount, setStopLossAmount] = useState();
    const stopLossAmountElement = useRef();
    const [stopLossMessage, setStopLossMessage] = useState(null);
    const [stopProfitMessage, setStopProfitMessage] = useState(null);

    const notify = (message) => toast.success(message, {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    useEffect(() => {
        var limit = wager * multiplier * 0.0006;
        limit = limit > 0.01 ? parseFloat(limit.toFixed(2)) : 0.01;
        var messageState = false;
        if( limit > parseFloat(stopLossAmount)) {
            setStopLossMessage("Wager is too large for selected multiplier for stop loss price");
            messageState = true;
        } 
        if(stopLossAmount > wager) {
            setStopLossMessage("Stop loss price cannot be through bust price");
            messageState = true;
        }

        if(betUpDownFlag == 'up' && parseFloat(selectionCoinPrice) < parseFloat(stopLossPrice)) {
            if(!messageState)
                setStopLossMessage("Trigger price is too close to current price");
            messageState = true;
        } 
        if(betUpDownFlag == 'down' && parseFloat(selectionCoinPrice) > parseFloat(stopLossPrice)) {
            if(!messageState)
                setStopLossMessage("Trigger price is too close to current price");
            messageState = true;
        }
        if(betUpDownFlag == 'up' && (parseFloat(bustPrice) + parseFloat(bustPrice / 2000 / multiplier)) > stopLossPrice && stopLossPrice) {
            if(!messageState)
                setStopLossMessage("Trigger price is too close to bust price");
            messageState = true;
        } 
        if(betUpDownFlag == 'down' && (parseFloat(bustPrice) + parseFloat(bustPrice / 2000 / multiplier)) < stopLossPrice && stopLossPrice) {
            if(!messageState)
                setStopLossMessage("Trigger price is too close to bust price");
            messageState = true;
        } 
        if(document.activeElement === stopLossPriceElement.current || stopLossPriceSelect) {
            let PnL = (stopLossPrice - selectionCoinPrice) / selectionCoinPrice * 9 /10 * wager * multiplier;
            if(messageState) {
                setStopLossAmount('')
            } else{
                setStopLossAmount(Math.abs(PnL));
                setStopLossMessage(null);
            }
        }
        if(document.activeElement === stopLossAmountElement.current || stopLossAmountSelect) {
            var plusMin = betUpDownFlag == "up" ? -1 : 1;
            let stopPrice = parseFloat(plusMin * stopLossAmount * 10 / 9 / wager / multiplier * selectionCoinPrice) + parseFloat(selectionCoinPrice);
            setStopLossPrice(Math.abs(stopPrice));

            if( !messageState) {
                setStopLossMessage(null);
            }
        }        
    }, [stopLossAmount, stopLossPrice, selectionCoinPrice, betUpDownFlag]);
    
    useEffect(() => {
        var messageState = false;
        if(betUpDownFlag == "up" && selectionCoinPrice > stopProfitPrice && stopProfitPrice) {
            setStopProfitMessage("Trigger price is too close to current price");
            messageState = true;
        } 
        if(betUpDownFlag == "down" && selectionCoinPrice < stopProfitPrice && stopProfitPrice) {
            setStopProfitMessage("Trigger price is too close to current price");
            messageState = true;
        }         
        if(document.activeElement === stopProfitPriceElement.current || stopProfitPriceSelect) {
            let PnL = (stopProfitPrice - selectionCoinPrice) / selectionCoinPrice * 9 / 10 * wager * multiplier;
            if(!messageState) {
                setStopProfitMessage(null)
                setStopProfitAmount(Math.abs(PnL));
            }
        }
        if(document.activeElement === stopProfitAmountElement.current || stopProfitAmountSelect) {
            let stopPrice = 0;
            if(betUpDownFlag == 'up') {
                stopPrice = parseFloat(stopProfitAmount * 10 / 9 / wager / multiplier * selectionCoinPrice) + parseFloat(selectionCoinPrice);
            } else {
                stopPrice = parseFloat(selectionCoinPrice) - parseFloat(stopProfitAmount * 10 / 9 / wager / multiplier * selectionCoinPrice)
            }
            if(!messageState){
                setStopProfitMessage(null)
            }
            setStopProfitPrice(stopPrice);
        }
    }, [stopProfitPrice, stopProfitAmount, selectionCoinPrice, betUpDownFlag])

    const confirmBet = () => {
        if(userInfo == null) {
            notify('You can place bet after log in');
            return;
        }
        setBetMsg(null);
        var params = {
            betCoinType: selectionCoinType,
            updownFlag: betUpDownFlag,
            entryPrice: selectionCoinPrice,
            wager,
            bustPrice,
            multiplier,
            autoStopProfitState: false,
            autoStopLossState: false,
            autoStopProfitAmount: 0,
            autoStopLossAmount: 0,
        }
        if(betType == 'auto') {
            if(stopProfitMessage != null || stopLossMessage != null)
                return false;
            if(stopProfitAmount){
                params.autoStopProfitState = true;
                params.autoStopProfitAmount = stopProfitAmount;
                
            }
            if(stopLossAmount) {
                params.autoStopLossState = true;
                params.autoStopLossAmount = stopLossAmount;
            }    
        }
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
            params: params
        };
        axios.post('/api/users/confirmautobet', params, config).then(function(res) {
            if(res.status == 200) {
                notify('Place Bet Success');
            }
        })
        .catch(function(err){
            console.log(err)
        });
    }

    return (
        <>
            <ToastContainer 
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={`w-full sm:ml-4 ${betType==='auto'? "block":"hidden"}`}>
                <h3 className="bet-text">
                    Take profit at price / profit
                </h3>
                <div className="flex">
                    <div className={`bet-auto-default-input bet-auto-profit-input  ${stopProfitPriceSelect ? 'bet-auto-profit-input-select' : ''}`}>
                        <NumberFormat
                            thousandSeparator={true}
                            getInputRef={stopProfitPriceElement}
                            // ref={stopProfitPriceElement}
                            placeholder="Price"
                            prefix={""}
                            className="setting-email-input-box !text-white"
                            inputMode="numeric"
                            decimalScale={2}
                            allowNegative={false}
                            defaultValue={""}
                            value={stopProfitPrice}
                            onValueChange={(values) => {
                                const { floatValue } = values;
                                setStopProfitPrice(floatValue);
                                if(document.activeElement === stopProfitPriceElement.current && floatValue != undefined){
                                    setStopProfitPriceSelect(true);
                                    setStopProfitAmountSelect(false);
                                }
                            }}
                        />
                    </div>
                    <div className={`bet-auto-default-input bet-auto-profit-input ${stopProfitAmountSelect ? 'bet-auto-profit-input-select' : ''}`}>
                        <div className="pr-1">
                            +$
                        </div>
                        <NumberFormat
                            thousandSeparator={true}
                            getInputRef={stopProfitAmountElement}
                            // ref={stopProfitAmountElement}
                            placeholder="Profit"
                            prefix={""}
                            className="setting-email-input-box"
                            inputMode="numeric"
                            decimalScale={2}
                            allowNegative={false}
                            defaultValue={""}
                            value={stopProfitAmount}
                            onValueChange={(values) => {
                                const { floatValue } = values;
                                setStopProfitAmount(floatValue);
                                // if(floatValue)
                                if(document.activeElement === stopProfitAmountElement.current && floatValue != undefined){
                                    setStopProfitPriceSelect(false);
                                    setStopProfitAmountSelect(true);
                                }
                            }}
                        />
                    </div>
                </div>
                { stopProfitMessage == null ? (
                    <></>
                ) : (
                    <div className='mx-1 my-2 text-[#ff4949] text-[12px] '>
                        {stopProfitMessage}
                    </div>
                ) }
                <h3 className="bet-text">
                    Close bet at price / loss
                </h3>
                <div className="flex mb-2">
                    <div className={`bet-auto-default-input bet-auto-loss-input ${stopLossPriceSelect ? 'bet-auto-loss-input-select' : ''}`}>
                        <NumberFormat
                            thousandSeparator={true}
                            // ref={stopLossPriceElement}
                            getInputRef={stopLossPriceElement}
                            placeholder="Price"
                            prefix={""}
                            className="setting-email-input-box !text-white"
                            inputMode="numeric"
                            decimalScale={2}
                            allowNegative={false}
                            defaultValue={""}
                            value={stopLossPrice}
                            onValueChange={(values) => {
                                const { floatValue } = values;
                                setStopLossPrice(floatValue);
                                // if(floatValue)
                                if(document.activeElement === stopLossPriceElement.current && floatValue != undefined) {
                                    setStopLossPriceSelect(true);
                                    setStopLossAmountSelect(false);
                                }
                            }}
                        />
                    </div>
                    <div className={`bet-auto-default-input bet-auto-loss-input ${stopLossAmountSelect ? 'bet-auto-loss-input-select' : ''}`}>
                        <div className="pr-1">
                            -$
                        </div>
                        <NumberFormat
                            thousandSeparator={true}
                            getInputRef={stopLossAmountElement}
                            // ref={stopLossAmountElement}
                            placeholder="Loss"
                            prefix={""}
                            className="setting-email-input-box"
                            inputMode="numeric"
                            decimalScale={2}
                            allowNegative={false}
                            defaultValue={""}
                            value={stopLossAmount}
                            onValueChange={(values) => {
                                const { floatValue } = values;
                                setStopLossAmount(floatValue);
                                // if(floatValue)
                                if(document.activeElement === stopLossAmountElement.current && floatValue != undefined) {
                                    setStopLossAmountSelect(true)
                                    setStopLossPriceSelect(false);
                                }
                            }}
                        />
                    </div>
                </div>
                { stopLossMessage == null ? (
                    <></>
                ) : (
                    <div className='mb-2 text-[#ff4949] text-[12px] '>
                        {stopLossMessage}
                    </div>
                ) }
            </div>
        </>
    );
}

export default ConfirmAutoBet