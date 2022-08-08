import React, {useState, useEffect} from 'react';
import { useSelector} from "react-redux";
// import { SET_SELECTION_CASHIER_TYPE } from "../../configs";
import BtcCard from '../cryptocard/btccard';
// import BuyCryptoCard from '../cryptocard/buycryptocard';
import EthCard from '../cryptocard/ethcard';
// import LtcCard from '../cryptocard/ltccard';
// import NftCard from '../cryptocard/nftcard';
// import RlbCard from '../cryptocard/rlbcard';
import SolCard from '../cryptocard/solcard';
import SvgBack from '../Svg/svgback';
import CashierTitle from './cashiertitle';
import DepositOption from './depositoption';
import { useHistory } from 'react-router-dom';


function DepositOptions() {
    const history = useHistory();
    const coinPrice = useSelector((state) => state.coinPrice);
    const { bitcoinPrice, ethereumPrice, solanaPrice } = coinPrice;

    const [depositShow, setDepositShow] = useState(false);
    const [depositCoin, setDepositCoin] = useState('btc');

    const viewTransaction = () => {
        history.push(`/account/deposits/${depositCoin}`);
        window.location.reload(false);
        // props.setCashierModalShow(false);
        
    }

    useEffect(() => {
        // alert(depositShow);
        // alert('deposit')
    }, [])


    return (
        <>
            {
                depositShow ? (
                    <>
                        <div className='flex'>
                            <button className='back-btn' onClick={() => {setDepositShow(false)}}>
                                <SvgBack></SvgBack>
                            </button>
                            <CashierTitle coinType = {depositCoin} cashierType="deposit"></CashierTitle>

                        </div>
                        <div className='block mt-3 md:hidden'>
                            {depositCoin == 'btc' && (<p>1BTC=$ {Intl.NumberFormat().format(bitcoinPrice)} USD</p>)}
                            {depositCoin == 'eth' && (<p>1ETH=$ {Intl.NumberFormat().format(ethereumPrice)} USD</p>)}
                            {depositCoin == 'sol' && (<p>1SOL=$ {Intl.NumberFormat().format(solanaPrice)} USD</p>)}
                            <p className='uppsercase cursor-pointer text-[#FFB018]' onClick={()=>viewTransaction()}>
                                View Transaction
                            </p>
                        </div>
                        <DepositOption depositCoin={depositCoin}></DepositOption>
                    </>
                ) :
                (
                    <div>
                        <div className='italic text-lg font-bold uppercase mb-3'>
                            Deposit Options
                        </div>
                        <div className='card-list grid'>
                            <BtcCard onClick = {() => {setDepositShow(true); setDepositCoin('btc');}}></BtcCard>
                            <EthCard onClick = {() => {setDepositShow(true); setDepositCoin('eth');}}></EthCard>
                            {/* <LtcCard onClick = {() => {setDepositShow(true); setDepositCoin('ltc');}}></LtcCard> */}
                            <SolCard onClick = {() => {setDepositShow(true); setDepositCoin('sol');}}></SolCard>
                            {/* <RlbCard onClick = {() => {setDepositShow(true); setDepositCoin('rlb');}}></RlbCard>
                            <NftCard onClick = {() => {setDepositShow(true); setDepositCoin('nft');}}></NftCard> */}
                            {/* <BuyCryptoCard></BuyCryptoCard> */}
                        </div>
                    </div>
                    

                )
            }
        </>
    );
}
  
export default DepositOptions;