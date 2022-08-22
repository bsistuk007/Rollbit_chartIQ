import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector} from "react-redux";
// import { SET_SELECTION_CASHIER_TYPE } from "../../configs";
// import SvgBack from '../Svg/svgback';
import qrbitcoinimg from './../../assets/img/qrbitcoin.png';
import QRCode from "react-qr-code";
// import coinimg from './../../assets/img/coin.webp';
// import bitcoinimg from './../../assets/img/bitcoin.png';
// import ethereumimg from './../../assets/img/ethereum.png';
// import litecoinimg from './../../assets/img/litecoin.png';
// import solanaimg from './../../assets/img/solana.png';
// import rollbitcoinimg from './../../assets/img/rollbitcoin.png'; 

function DepositOption(props) {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [clipboardFlag, setClipboardFlag] = useState(false);
    const [ depositCoinType, setDepositCoinType ] = useState();
    const [ depositCoinAddress, setDepositCoinAddress ] = useState();
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(depositCoinAddress);
        setClipboardFlag(true);
    }

    useEffect(() => {
        switch(props.depositCoin) {
            case 'btc':
                setDepositCoinType('Bitcoin');
                setDepositCoinAddress(userInfo.walletInfo.bitcoinAddress);
                return;
            case 'eth':
                setDepositCoinType('Ethereum');
                setDepositCoinAddress(userInfo.walletInfo.ethereumAddress);
                return;
            case 'sol':
                setDepositCoinType('Solana');
                setDepositCoinAddress(userInfo.walletInfo.solanaAddress);
                return;
            default:
                setDepositCoinType('Bitcoin');
                setDepositCoinAddress(userInfo.walletInfo.bitcoinAddress);
                return;
        }
    }, [])

    return (
        <>
            <div>
                <div className=" mt-4 p-4 sm:rounded-xl sm:bg-[#1A1D29]">
                    <div className="flex flex-col sm:flex-row sm:text-[16px]">
                        <div>Send the amount of {depositCoinType} of your choice to the following address to receive the equivalent in Coins.
                        </div>
                        {/* <img src={qrbitcoinimg} alt="Bitcoin" className="ml-4 min-w-[173px] w-[173px]"/> */}
                        {depositCoinAddress ? (
                            <div className="ml-4 min-w-[173px] w-[173px]">
                                <QRCode value={depositCoinAddress} size={173}></QRCode>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <p className="uppercase italic my-3">Your personal {props.depositCoin} deposit address</p>
                    <div className="setting-email-box">
                        <input className='setting-email-input-box' type="text" name="text" id="rollbit-field-104800" defaultValue={depositCoinAddress} />
                        <button className="default-btn yellow-btn uppercase !h-[25px]" onClick={()=>copyToClipboard()}>
                            {clipboardFlag ? 'COPIED ADDRESS' : 'COPY ADDRESS'}
                        </button>
                    </div>
                    {/* <div className="css-d0rz4a">
                        <div>3KccforDe5JgQkRnwq1fxkPKhAturtNJnT
                        </div>
                        <button className="css-1re3gg">Copy Address
                        </button>
                    </div> */}
                </div>
                {/* <div className="mt-4 p-4 rounded-xl sm:bg-[#1A1D29]">
                    <div className="flex flex-col items-start md:items-center md:flex-row">
                        <p className="italic uppercase text-bold whitespace-nowrap mr-3">
                            Value calculator**
                        </p>
                        <div className="deposition-input-box">
                            <div className='flex'>
                                <img src={coinimg} alt="Coin" className="inline min-w-[20px] w-[20px]"/>
                                <span className='px-1'>$</span>
                            </div>
                            <input className='setting-email-input-box' type="text" name="number" id="rollbit-field-104800" />
                        </div>
                        <div className="mx-3">
                            =
                        </div>
                        <div className="deposition-input-box">
                            <div className='pr-3'>
                                <img src={bitcoinimg} alt="Bitcoin" className="inline min-w-[20px] w-[20px]"/>
                            </div>
                            <input className='setting-email-input-box' type="text" name="text" id="rollbit-field-104800" />
                        </div>
                    </div>
                    <p className="mt-4">** The value of Bitcoin may vary between now and the time we receive your payment</p>
                </div> */}
                {/* 
                <Row>
                    
                </Row>
                <Row>
                    <Col>
                        =
                    </Col>
                </Row>
                <Row>
                    
                </Row>
                <Row>
                    ** The value of Bitcoin may vary between now and the time we receive your payment
                </Row> */}
            </div>
        </>
    );
}
  
export default DepositOption;