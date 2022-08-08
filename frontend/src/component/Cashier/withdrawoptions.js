import React, { useState } from 'react';
import { useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
// import { SET_SELECTION_CASHIER_TYPE } from "../../configs";
import BtcCard from '../cryptocard/btccard';
import EthCard from '../cryptocard/ethcard';
// import LtcCard from '../cryptocard/ltccard';
import SolCard from '../cryptocard/solcard';
import SvgBack from '../Svg/svgback';
import CashierTitle from './cashiertitle';
// import RlbCard from '../cryptocard/rlbcard';
// import NftCard from '../cryptocard/nftcard';
import WithdrawOption from './withdrawoption';

function WithdrawOptions() {
    const history = useHistory();
    const coinPrice = useSelector((state) => state.coinPrice);
    const { bitcoinPrice, ethereumPrice, solanaPrice } = coinPrice;

    const [withdrawShow, setWithdrawShow] = useState(false);
    const [withdrawCoin, setWithdrawCoin] = useState('btc');


    // const { selectionCashierType } = useSelector(state => state.account);

    // const selectCryptoType = (type) => {
    //     dispatch({ type: SET_SELECTION_CASHIER_TYPE, payload: type})
    // }
    const viewTransaction = () => {
        history.push(`/account/withdrawals/${withdrawCoin}`);
        window.location.reload(false);
        // props.setCashierModalShow(false);
        
    }

    // useEffect(() => {
    //     // alert(selectionCashierType);
    // }, [])

    return (
        <>
            {
                withdrawShow ? (
                    <>
                        <div className='flex'>
                            <button className='back-btn' onClick={() => {setWithdrawShow(false)}}>
                                <SvgBack></SvgBack>
                            </button>
                            <CashierTitle coinType = {withdrawCoin} cashierType="withdraw"></CashierTitle>

                        </div>
                        <div className='block mt-3 md:hidden'>
                            {withdrawCoin == 'btc' && (<p>1BTC=$ {Intl.NumberFormat().format(bitcoinPrice)} USD</p>)}
                            {withdrawCoin == 'eth' && (<p>1ETH=$ {Intl.NumberFormat().format(ethereumPrice)} USD</p>)}
                            {withdrawCoin == 'sol' && (<p>1SOL=$ {Intl.NumberFormat().format(solanaPrice)} USD</p>)}
                            <p className='uppsercase cursor-pointer text-[#FFB018]' onClick={()=>viewTransaction()}>
                                View Transaction
                            </p>
                        </div>
                        <WithdrawOption withdrawCoin={withdrawCoin}></WithdrawOption>
                    </>
                ) :
                (
                    <div>
                        <div className='italic text-lg font-bold uppercase mb-3'>
                            Withdrawal Options
                        </div>
                        <div className='card-list grid'>
                            <BtcCard onClick = {() => {setWithdrawShow(true); setWithdrawCoin('btc');}}></BtcCard>
                            <EthCard onClick = {() => {setWithdrawShow(true); setWithdrawCoin('eth');}}></EthCard>
                            {/* <LtcCard onClick = {() => {setWithdrawShow(true); setWithdrawCoin('ltc');}}></LtcCard> */}
                            <SolCard onClick = {() => {setWithdrawShow(true); setWithdrawCoin('sol');}}></SolCard>
                            {/* <RlbCard onClick = {() => {setWithdrawShow(true); setWithdrawCoin('rlb');}}></RlbCard>
                            <NftCard onClick = {() => {setWithdrawShow(true); setWithdrawCoin('nft');}}></NftCard> */}
                            {/* <BuyCryptoCard></BuyCryptoCard> */}
                        </div>
                    </div>
                )
            }
        </>
    );
}
  
export default WithdrawOptions;