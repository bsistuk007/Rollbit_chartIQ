import React, { useEffect, useState } from 'react';
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
import { SET_ADD_ACTIVE_BET_RECORD } from '../../configs';

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
        const params = {
            betCoinType: selectionCoinType,
            updownFlag: betUpDownFlag,
            entryPrice: selectionCoinPrice,
            wager,
            bustPrice,
            multiplier,
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
            }
        })
        .catch(function(err){
            console.log(err)
        });
    }

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
                            <div className="bet-auto-default-input bet-auto-profit-input">
                                <input type="text" placeholder="Price"/>
                            </div>
                            <div className="bet-auto-default-input bet-auto-profit-input">
                                <div className="pr-1">
                                    +$
                                </div>
                                <input type="text" color="success" placeholder="Profit"/>
                            </div>
                        </div>
                        <h3 className="bet-text">
                            Close bet at price / loss
                        </h3>
                        <div className="flex mb-4">
                            <div className="bet-auto-default-input bet-auto-loss-input">
                                <input type="text" placeholder="Price"/>
                            </div>
                            <div className="bet-auto-default-input bet-auto-loss-input">
                                <div className="pr-1">
                                    -$
                                </div>
                                <input type="text" color="danger" placeholder="Loss"/>
                            </div>
                        </div>
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
                    <div className='mb-4 text-[#ff4949]  '>
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