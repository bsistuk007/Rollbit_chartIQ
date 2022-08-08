import React, {useEffect} from "react";
import bitcoinimg from './../../assets/img/bitcoin.png';
import ethereumimg from './../../assets/img/ethereum.png';
import adaimg from './../../assets/img/ada.png';
import solanaimg from './../../assets/img/solana.png';
import apeimg from './../../assets/img/ape.png';
import { useSelector} from "react-redux"; 
import UpDown from "../Trading/updown";

function BetCoinImg(props) {
    let coinType = props.coinType ? props.coinType : "BTC"; 
    return (
        <div className="flex">
            {coinType === 'BTC' && <img src={bitcoinimg} alt="Coin" className="inline w-[20px] mr-1"/>}
            {coinType === 'ETH' && <img src={ethereumimg} alt="Coin" className="inline w-[20px] mr-1"/>}
            {coinType === 'SOL' && <img src={solanaimg} alt="Coin" className="inline rounded-full w-[20px] mr-1"/>}
            {coinType === 'ADA' && <img src={adaimg} alt="Coin" className="inline w-[20px] mr-1"/>}
            {coinType === 'APE' && <img src={apeimg} alt="Coin" className="inline w-[20px] mr-1"/>}
            <UpDown state={props.updownFlag} width="8"></UpDown>
        </div>
    );
}

export default BetCoinImg;