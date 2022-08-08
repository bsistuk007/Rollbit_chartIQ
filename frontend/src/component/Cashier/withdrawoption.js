import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from "react-redux";
import StarCharacter from '../Common/starcharacter';
import coinimg from './../../assets/img/coin.webp';
import bitcoinimg from './../../assets/img/bitcoin.png';
import ethereumimg from './../../assets/img/ethereum.png';
import solanaimg from './../../assets/img/solana.png';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import SvgLoading from '../Svg/svgloading';
import { getUserBalance } from "./../../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import { validate } from 'bitcoin-address-validation';
import ethereum_address from 'ethereum-address';
import { PublicKey } from '@solana/web3.js';

function WithdrawOption(props) {
    const dispatch = useDispatch();
    const [usd, setUsd] = useState();
    const [coin, setCoin] = useState();
    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [withdrawAddress, setWithdrawAddress] = useState("");
    const [feeMessage, setFeeMessage] = useState(null);
    const [withdrawAddressMessage, setWithdrawAddressMessage] = useState(null);
    const [coinMessage, setCoinMessage] = useState(null);
    const [networkFee, setNetworkFee] = useState();
    // const userLogin = useSelector((state) => state.userLogin);
    // const { userInfo } = userLogin;
    const coinPrice = useSelector((state) => state.coinPrice);
    const { bitcoinPrice, ethereumPrice, solanaPrice } = coinPrice;
    const [ withdrawCoinType, setWithdrawCoinType ] = useState();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

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

    const setUsdValue = (coinValue) => {
        var usdValue = 0;
        switch(props.withdrawCoin) {
            case 'btc':
                usdValue = bitcoinPrice * coinValue + networkFee;
                break;
            case 'eth':
                usdValue = ethereumPrice * coinValue + networkFee;
                break;
            case 'sol':
                usdValue = solanaPrice * coinValue + networkFee;
                break;
        }
        setUsd(usdValue.toFixed(2));
    }

    const setCoinValue = (usdValue) => {
        if(usdValue < networkFee) {
            setFeeMessage('Insufficient amount to cover withdrawal fee');
            return;
        } else {
            setFeeMessage(null);
        }
        var coinValue = 0;
        switch(props.withdrawCoin) {
            case 'btc':
                coinValue = (usdValue - networkFee) / bitcoinPrice;
                break;
            case 'eth':
                coinValue = (usdValue - networkFee) / ethereumPrice;
                break;
            case 'sol':
                coinValue = (usdValue - networkFee) / solanaPrice;
                break;
        }

        setCoin(coinValue);
    }

    const validateSolAddress = (solAddress) => {
        try{
            let pubkey = new PublicKey(solAddress)
            let  isSolana =  PublicKey.isOnCurve(pubkey.toBuffer())
            return isSolana 
        } catch(error){
            return false
        }
    }

    const withdrawAction = () => {
        if(withdrawAddress == "" || !coin){
            if(withdrawAddress == "") {
                setWithdrawAddressMessage('This field is required');
            }
            if(!coin) {
                setCoinMessage('This field is required');
            }
            return;
        }
        if(props.withdrawCoin == 'btc' && validate(withdrawAddress) == false) {
            setWithdrawAddressMessage('Invalid Withdraw Address');
            return;
        }
        if(props.withdrawCoin == 'eth' && ethereum_address.isAddress(withdrawAddress) == false) {
            setWithdrawAddressMessage('Invalid Withdraw Address');
            return;
        }
        if(props.withdrawCoin == 'sol' && validateSolAddress(withdrawAddress) == false) {
            setWithdrawAddressMessage('Invalid Withdraw Address');
            return;
        }
        setWithdrawAddressMessage(null);
        setCoinMessage(null);   
        const params = {
            type: props.withdrawCoin,
            amount:usd,
            coinAmount: coin,
            address:withdrawAddress,
            bitcoinPrice,
            ethereumPrice,
            solanaPrice
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
            params: params
        };
        setWithdrawLoading(true);
        axios.put('/api/users/withdraw', params, config).then(function(response) {
            if(response.data.status == 'success') {
                dispatch(getUserBalance());
                setWithdrawLoading(false);
                notify(response.data.message)
            }
            if(response.data.status == 'fail') {
                setWithdrawLoading(false);
                setFeeMessage(response.data.message);
            }
        })
        .catch(function(err){
            console.log(err)
        });
        // dispatch(withdraw({ type: props.withdrawCoin, amount: usd, coinAmount:coin,  address: withdrawAddress, bitcoinPrice, ethereumPrice, solanaPrice}));
        // withdraw()
        return;
    }

    const getNetworkFee = () => {
        const params = {
            coinType: props.withdrawCoin
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
            params: params
        };
        axios.get('/api/users/networkfee', config)
            .then(function(response) {
                if(response.status == 200) {
                    setNetworkFee(response.data.networkFee);
                }
            })
            .catch(function(err){
                console.log(err)
            });
    }

    useEffect(() => {
        getNetworkFee();
        const interval = setInterval(() => {
            getNetworkFee();
        }, 30000)
        switch(props.withdrawCoin) {
            case 'btc':
                setWithdrawCoinType('Bitcoin');
                break;
            case 'eth':
                setWithdrawCoinType('Ethereum');
                break;
            case 'sol':
                setWithdrawCoinType('Solana');
                break;
            default:
                setWithdrawCoinType('Bitcoin');
                break;
        }
        return () => {
            clearInterval(interval);
          };
    }, [])

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
            <div>
                <div className=" mt-4 p-4 sm:rounded-xl sm:bg-[#1A1D29]">
                    <div className="flex flex-col sm:flex-row sm:text-[16px]">
                        <div>
                            Please enter the {withdrawCoinType} wallet address you wish to receive the funds on. Once confirmed, the withdrawal is usually processed within a few minutes.
                        </div>
                    </div>
                    <p className="uppercase mt-5 mb-3">RECEIVING {withdrawCoinType} ADDRESS <StarCharacter></StarCharacter></p>
                    <div className="setting-email-box">
                        <input className='setting-email-input-box' type="text" name="text" placeholder={`Paste your ${withdrawCoinType} wallet address here`}
                        value={withdrawAddress}
                        onChange={(e) =>{
                                    setWithdrawAddress(e.target.value);
                                    if(e.target.value)
                                        setWithdrawAddressMessage(null);
                                } 
                            }
                        />
                    </div>
                    {withdrawAddressMessage && <div className="text-[#ff4949] mt-2 text-[14px]">{withdrawAddressMessage}</div>}
                    <div>
                        <p className="uppercase text-bold whitespace-nowrap mt-4 mb-3">
                            Withdrawal Amount <StarCharacter></StarCharacter>
                        </p>
                    </div>
                    <div>
                        <div className="flex flex-col items-start md:items-center md:flex-row">
                            <div className="deposition-input-box !h-[50px]">
                                <div className='flex'>
                                    <img src={coinimg} alt="Coin" className="inline min-w-[20px] w-[20px]"/>
                                    <span className='px-1 text-md'>$</span>
                                </div>
                                <NumberFormat
                                    thousandSeparator={true}
                                    prefix={""}
                                    className="setting-email-input-box"
                                    inputMode="numeric"
                                    decimalScale={10}
                                    allowNegative={false}
                                    defaultValue={''}
                                    value={usd}
                                    // value={calcUsd}
                                    onValueChange={(values) => {
                                        const { floatValue } = values;
                                        setUsd(floatValue);
                                        setCoinValue(floatValue);
                                    }}
                                />
                            </div>
                            <div className="mx-3 text-lg">
                                =
                            </div>
                            <div className='w-full'>
                                <div className="deposition-input-box !h-[50px]">
                                    <div className='pr-3'>
                                        {props.withdrawCoin=="btc" && <img src={bitcoinimg} alt="Bitcoin" className="inline min-w-[20px] w-[20px]"/>}
                                        {props.withdrawCoin=="eth" && <img src={ethereumimg} alt="Bitcoin" className="inline min-w-[20px] w-[20px]"/>}
                                        {props.withdrawCoin=="sol" && <img src={solanaimg} alt="Bitcoin" className="inline min-w-[20px] w-[20px] rounded-full"/>}
                                    </div>
                                    <NumberFormat
                                        thousandSeparator={true}
                                        prefix={""}
                                        className="setting-email-input-box"
                                        inputMode="numeric"
                                        decimalScale={10}
                                        allowNegative={false}
                                        defaultValue={''}
                                        value={coin}
                                        // value={calcCoin}
                                        onValueChange={(values) => {
                                            const { floatValue, value } = values;
                                            if(value)
                                                setCoinMessage(null);
                                            setCoin(floatValue);
                                            setUsdValue(floatValue);
                                        }}
                                    />
                                    {/* <input className='setting-email-input-box' type="text" name="text" id="rollbit-field-104800" /> */}
                                </div>
                                {coinMessage && <p className="text-[#ff4949] mt-2 text-[14px]">{coinMessage}</p>}
                            </div>
                            <div className=' w-full md:w-auto mt-4 md:ml-4 md:!mt-0'>
                                <button className={`bet-green-btn mt-30px w-full  md:w-[160px]`} id="withdraw-button" tabIndex="-1" onClick={() => withdrawAction()}>
                                    <span className={`bet-green-btn-1`}></span>
                                    <span className={`bet-green-btn-2`}></span>
                                    <span className={`bet-green-btn-3`}></span>
                                    <span className={`bet-green-btn-4 !whitespace-normal`}>
                                        {withdrawLoading ? (<SvgLoading width="30" height = "30"></SvgLoading>): ('')}
                                        REQUEST WITHDRAWAL
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className='text-[15px]'>Network Fee:$ {networkFee}</p>
                        {feeMessage && <div className="text-[#ff4949] mt-2 text-[14px]">{feeMessage}</div>}
                    </div>
                    <div>
                        <p className="mt-4">** You will receive the specified {withdrawCoinType} amount to your withdrawal address</p>
                        <p>** The value subtracted from your balance may vary between now and the time we process your withdrawal</p>
                    </div>
                    
                </div>
            </div>
        </>
    );
}
  
export default WithdrawOption;