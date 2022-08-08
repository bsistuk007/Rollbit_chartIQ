import React, {useEffect} from "react";
import bitcoinimg from './../../assets/img/bitcoin.png';
import ethereumimg from './../../assets/img/ethereum.png';
import adaimg from './../../assets/img/ada.png';
import solanaimg from './../../assets/img/solana.png';
import apeimg from './../../assets/img/ape.png';
import { useSelector} from "react-redux"; 

function CoinImg() {
    const { selectionCoinType } = useSelector(state => state.coin);

    useEffect(() => {
        // alert(selectionCoinType);
    }, [selectionCoinType])
    return (
        <div>
            {selectionCoinType === 'BTC' && <img src={bitcoinimg} alt="Coin" className="inline w-[32px] md:w-[40px]"/>}
            {selectionCoinType === 'ETH' && <img src={ethereumimg} alt="Coin" className="inline w-[32px] md:w-[40px]"/>}
            {selectionCoinType === 'SOL' && <img src={solanaimg} alt="Coin" className="inline rounded-full w-[32px] md:w-[40px]"/>}
            {selectionCoinType === 'ADA' && <img src={adaimg} alt="Coin" className="inline w-[32px] md:w-[40px]"/>}
            {selectionCoinType === 'APE' && <img src={apeimg} alt="Coin" className="inline w-[32px] md:w-[40px]"/>}

        </div>
    );
}

export default CoinImg;