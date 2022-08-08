import React from 'react';
import { useSelector} from "react-redux";
import SvgRollbitCoin from '../Svg/svgrollbitcoin';
import bitcoinimg from './../../assets/img/bitcoin.png';
import ethereumimg from './../../assets/img/ethereum.png';
import litecoinimg from './../../assets/img/litecoin.png';
import solanaimg from './../../assets/img/solana.png';
import rollbitcoinimg from './../../assets/img/rollbitcoin.png';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


function CashierTitle(props) {
    const history = useHistory();
    const coinPrice = useSelector((state) => state.coinPrice);
    const { bitcoinPrice, ethereumPrice, solanaPrice } = coinPrice;
    // useEffect(() => {
    // }, [])
    const coinType = (param) => {
        switch(param) {
            case 'btc':
                return 'Bitcoin';
            case 'eth':
                return 'Ethereum';
            case 'ltc':
                return 'Litecoin';
            case 'sol':
                return 'Solana';
            case 'rlb':
                return 'Rollbit Coin';
            default:
                return 'NFT';
        }
    }

    const viewTransaction = () => {
        // var type = coinType(props.coinType)
        if(props.cashierType === "deposit")
            history.push(`/account/deposits/${props.coinType}`);
        else 
            history.push(`/account/withdrawals/${props.coinType}`);
        window.location.reload(false);
    }
      

    return (
        <Container fluid className='self-center'>
            <Row>
                <Col md={5} sm={12} xs={12} className="self-center">
                    {/* <div className='items-center self-center'> */}
                        {props.coinType === "btc" && <img src={bitcoinimg} alt="Bitcoin" className="inline min-w-[30px] w-[30px]"/>}
                        {props.coinType === "eth" && <img src={ethereumimg} alt="Ethereum" className="inline min-w-[30px] w-[30px]"/>}
                        {props.coinType === "ltc" && <img src={litecoinimg} alt="Litecoin" className="inline min-w-[30px] w-[30px]"/>}
                        {props.coinType === "sol" && <img src={solanaimg} alt="Solanacoin" className="inline min-w-[30px] w-[30px] rounded-full"/>}
                        {props.coinType === "rlb" && <img src={rollbitcoinimg} alt="Rollbitcoin" className="inline min-w-[30px] w-[30px] rounded-full"/>}
                        
                        <span className='ml-3 uppercase italic text-[18px] font-extrabold whitespace-nowrap align-middle pt-1'>
                            {props.cashierType} {props.cashierType === "deposit" ? "with" : ""} {coinType(props.coinType)}
                        </span>
                        
                    {/* </div> */}
                </Col>
                <Col md={3} className="whitespace-nowrap self-center pt-1 hidden md:block">
                    {props.coinType == 'btc' && (<div>1BTC=$ {Intl.NumberFormat().format(bitcoinPrice)} USD</div>)}
                    {props.coinType == 'eth' && (<div>1ETH=$ {Intl.NumberFormat().format(ethereumPrice)} USD</div>)}
                    {props.coinType == 'sol' && (<div>1SOL=$ {Intl.NumberFormat().format(solanaPrice)} USD</div>)}
                </Col>
                <Col md={3} className="whitespace-nowrap self-center pt-1 hidden md:block md:uppsercase md:cursor-pointer md:text-[#FFB018]" onClick={()=>viewTransaction()}>
                    VIEW TRANSACTION
                </Col>
            </Row>
        </Container>
    );
}
  
export default CashierTitle;