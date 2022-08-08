import React, {useEffect} from "react";
import bitcoinimg from './../../assets/img/bitcoin.png';
import ethereumimg from './../../assets/img/ethereum.png';
import adaimg from './../../assets/img/ada.png';
import solanaimg from './../../assets/img/solana.png';
import apeimg from './../../assets/img/ape.png';

function CoinButton(props) {
    return (
        <div className="text-[16px] flex items-center">
            {props.coinType === 'BTC' && <img src={bitcoinimg} alt="Coin" className="inline w-[20px] mr-3"/>}
            {props.coinType === 'ETH' && <img src={ethereumimg} alt="Coin" className="inline w-[20px] mr-3"/>}
            {props.coinType === 'SOL' && <img src={solanaimg} alt="Coin" className="inline rounded-full w-[20px] mr-3"/>}
            {props.coinType === 'ADA' && <img src={adaimg} alt="Coin" className="inline w-[20px] mr-3"/>}
            {props.coinType === 'APE' && <img src={apeimg} alt="Coin" className="inline w-[20px] mr-3"/>}
            {props.coinType}
        </div>
    );
}

export default CoinButton;