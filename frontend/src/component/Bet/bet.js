import React, { useEffect, useRef, useState } from 'react';
import SvgDown from '../Svg/svgdown';
import SvgUp from '../Svg/svgup';
import coinimg from './../../assets/img/coin.webp';
import Slider from './slider';
// import numeral from 'numeral';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBalance } from "./../../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { SET_ADD_ACTIVE_BET_RECORD, SET_SELECTION_STATISTICS_TAB } from '../../configs';

function Bet() {
    const dispatch = useDispatch();
    const MAX_VAL = 1000;
    const sliderStepValue = [1,2,5,10,20,50,100,200,500,1000];
    const [sliderStep, setSliderStep] = useState(3);
    const withValueLimit = ({ floatValue }) => floatValue <= MAX_VAL;
    const [betType, setBetType] = useState('manual');
    const [wager, setWager] = useState(10);
    const [multiplier, setMultiplier] = useState(10);
    const [betUpDownFlag, setUpDownFlag] = useState('up'); //value: up/down
    const [selectionCoinPrice, setSelectionCoinPrice] = useState();
    const [bustPrice, setBustPrice] = useState();
    const [betMsg, setBetMsg] = useState(null);
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
    const coinPrice = useSelector((state) => state.coinPrice);
    const { bitcoinPrice, ethereumPrice, solanaPrice, apePrice, adaPrice } = coinPrice;
    const { selectionCoinType } = useSelector(state => state.coin);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userBalance = useSelector((state) => state.userBalance);
    const { balanceInfo } = userBalance;
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

    const changeWagerAmount = (multiple) => {
        setWager(wager * multiple);
    }

    const sliderChange = (e) => {
        let multiplierValue = sliderStepValue[e.target.value];
        setMultiplier(multiplierValue)
        setSliderStep(e.target.value);
    }

    const placeBet = () => {
        if(userInfo == null) {
            notify('You can place bet after log in');
            return;
        }
        if(balanceInfo.balance < wager) {
            setBetMsg('Insufficient balance');
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
        axios.post('/api/users/placebet', params, config).then(function(res) {
            if(res.status == 200) {
                notify('Place Bet Success');
                dispatch(getUserBalance());
                dispatch({type: SET_ADD_ACTIVE_BET_RECORD, payload: res.data});
                dispatch({type: SET_SELECTION_STATISTICS_TAB, payload: 'active'})
            }
        })
        .catch(function(err){
            console.log(err)
        });
    }

    useEffect(() => {
        if(betType == 'manual'){
            setStopProfitPrice('');
            setStopProfitPriceSelect(false);
            setStopProfitAmount('');
            setStopProfitAmountSelect(false);
            setStopLossPrice('');
            setStopLossPriceSelect(false);
            setStopLossAmount('');
            setStopLossAmountSelect(false);
        }
    }, [betType])

    useEffect(() => {
        switch(selectionCoinType) {
            case "BTC":
                setSelectionCoinPrice(bitcoinPrice);
                break;
            case "ETH":
                setSelectionCoinPrice(ethereumPrice);
                break;
            case "SOL":
                setSelectionCoinPrice(solanaPrice);
                break;
            case "APE":
                setSelectionCoinPrice(apePrice);
                break;
            case "ADA":
                setSelectionCoinPrice(adaPrice);
                break;
            default:
                break;
        }
        const deltaBust = (selectionCoinPrice - (selectionCoinPrice/2000)) / multiplier;
        if(betUpDownFlag == 'up'){
            setBustPrice(parseFloat((selectionCoinPrice-deltaBust).toFixed(3)))
        } else {
            setBustPrice(parseFloat((parseFloat(selectionCoinPrice) + parseFloat(deltaBust)).toFixed(3)));
        }
    }, [selectionCoinType, coinPrice])

    useEffect(()=> {
        var step = 3;
        for(let i = 0; i < sliderStepValue.length; i++) {
            if(multiplier < sliderStepValue[i]){
                step = i-1;
                break;
            }
        }
        setSliderStep(step);
    }, [multiplier])

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
            <div className={`bet-setting ${betType==='manual'? "bet-manual":"bet-auto"}`}>
                <div>
                    <div className="flex">
                        <div className={`login-register-set ${betType==='manual'? "login-register-set-active":""} !text-sm !not-italic`} onClick={()=>setBetType('manual')}>Manual</div>
                        <div className={`login-register-set ${betType==='auto'? "login-register-set-active":""} !text-sm !not-italic`} onClick={()=>setBetType('auto')}>Auto</div>
                    </div>
                </div>
                <div className='block sm:flex'>
                    <div className='w-full'>
                        <h3 className='bet-text'>WILL THE PRICE GO UP OR DOWN?</h3>
                        <div className='flex items-center mx-[-10px]'>
                            <button className={`bet-default-btn ${betUpDownFlag === 'up' ? "bet-up-btn" : "" }  w-3/6 mx-[10px]`} onClick={()=>setUpDownFlag('up')}>
                                <SvgUp></SvgUp>
                                <span className='ml-2'>UP</span>
                            </button>
                            <button className={`bet-default-btn ${betUpDownFlag === 'down' ? "bet-down-btn" : "" }  w-3/6 mx-[10px]`} onClick={()=>setUpDownFlag('down')}>
                                <SvgDown></SvgDown>
                                <span className='ml-2'>DOWN</span>
                            </button>
                        </div>
                        <h3 className='bet-text'>WAGER</h3>
                        <div>
                            <div className="deposition-input-box">
                                <div className='flex'>
                                    <img src={coinimg} alt="Coin" className="inline min-w-[20px] w-[20px]"/>
                                    <span className='px-2'>$</span>
                                </div>
                                <NumberFormat
                                    thousandSeparator={true}
                                    prefix={""}
                                    className="setting-email-input-box"
                                    inputMode="numeric"
                                    decimalScale={2}
                                    allowNegative={false}
                                    defaultValue={'10.00'}
                                    value={wager}
                                    onValueChange={(values) => {
                                        const { floatValue } = values;
                                        setWager(floatValue);
                                    }}
                                />
                                {/* <NumericInput className='setting-email-input-box'></NumericInput> */}
                                {/* <input className='setting-email-input-box' type="text" name="number" id="rollbit-field-104800" value={wager} onChange={e=>wagerChange(e)} /> */}
                                <div className='flex items-center'>
                                    <div className='bet-wager-set' onClick={()=>{changeWagerAmount(0.5);}}>1/2</div>
                                    <div className='bet-wager-set' onClick={()=>{
                                        changeWagerAmount(2);
                                    }}>x2</div>
                                </div>
                            </div>
                        </div>
                        <h3 className='bet-text'>
                            PAYOUT MULTIPLIER
                        </h3>
                        <div className="flex">
                            <div className="deposition-input-box bet-payout-input">
                                <div className='flex'>
                                    <span className='px-2 bet-payout-color'>x</span>
                                </div>
                                <NumberFormat
                                    thousandSeparator={true}
                                    prefix={""}
                                    className="setting-email-input-box"
                                    inputMode="numeric"
                                    decimalScale={2}
                                    allowNegative={false}
                                    defaultValue={'10.00'}
                                    isAllowed={withValueLimit}
                                    value={multiplier}
                                    onValueChange={(values) => {
                                        const { floatValue } = values;
                                        setMultiplier(floatValue);
                                    }}
                                />
                                {/* <input className='setting-email-input-box' type="text" name="number" id="rollbit-field-104800" /> */}
                            </div>
                            <div className="pl-4">
                                <span className='bet-payout-color !font-thin'>
                                    Bust Price:
                                </span>
                                <div className='!font-thin'>
                                    {Intl.NumberFormat().format(bustPrice)}
                                </div>
                            </div>
                        </div>
                        <div className='my-4'>
                            {/* <Form.Range bsPrefix=''></Form.Range> */}
                            {/* <Slider></Slider> */}
                            <div className="slidecontainer">
                                <input type="range" min="0" max="9" className="slider" id="myRange" value={sliderStep} onChange={e=>sliderChange(e)}/>
                                <div className="flex justify-between">
                                    <div>x1 · <span className="text-[#72F238]">Safe</span></div>
                                    <div><span className="text-[#FF4949]">Wild</span> · x1000</div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                       
                    </div>
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
                    {/* <div className="w-full ml-3">
                        <div className="css-10y98l0">
                            <input type="text" placeholder="Price"/>
                        </div>
                        <div className="css-10dnob5">
                            <div className="css-1bb3wc8">
                                -$
                            </div>
                            <input type="text" color="danger" placeholder="Loss"/>
                        </div>
                    </div> */}
                    {/* <div>

                    </div> */}
                    {/* <div>
                        insufficient balance
                    </div> */}
                </div>
                { betMsg == null ? (
                    <></>
                ) : (
                    <div className='mx-1 mb-4 text-[#ff4949]  '>
                        {betMsg}
                    </div>
                ) }
                <div>
                    <button className={`${betUpDownFlag === "up" ? "bet-green-btn" : "bet-red-btn"} mt-30px w-full`} tabIndex="-1" onClick={()=>{placeBet();}}>
                        <span className={`${betUpDownFlag === "up" ? "bet-green-btn-1" : "bet-red-btn-1"}`}></span>
                        <span className={`${betUpDownFlag === "up" ? "bet-green-btn-2" : "bet-red-btn-2"}`}></span>
                        <span className={`${betUpDownFlag === "up" ? "bet-green-btn-3" : "bet-red-btn-3"}`}></span>
                        <span className={`${betUpDownFlag === "up" ? "bet-green-btn-4" : "bet-red-btn-4"}`}>Place Bet</span>
                    </button>
                </div>
            </div>
        </>
    );
}
  
export default Bet;