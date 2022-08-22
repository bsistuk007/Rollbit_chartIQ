import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
// import Form from 'react-bootstrap/Form';
// import btcimg from './../../assets/img/bitcoin.png';
// import ethimg from './../../assets/img/ethereum.png';
// import ltcimg from './../../assets/img/litecoin.png';
// import dogeimg from './../../assets/img/dogecoin.png';
import {useSelector, useDispatch } from "react-redux";
import { SET_SELECTION_TRADING_COIN_TYPE } from "../../configs";
import CoinButton from './coinbutton';

function SelectCoin() {
    const dispatch = useDispatch();

    const { selectionCoinType } = useSelector(state => state.coin);

    const setCoinType = (type) => {
        dispatch({type: SET_SELECTION_TRADING_COIN_TYPE, payload: type});
    }

    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
        href=""
        ref={ref}
        className = "table-datafilter-selector"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
        &#x25bc;
      </a>
    ));
    
    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
      ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');
    
        return (
          <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
          >
            {/* <Form.Control
              autoFocus
              className="mx-3 my-2 w-auto bg-[#141622]"
              placeholder="Search..."
              onChange={(e) => setValue(e.target.value)}
              value={value}
            /> */}
            <ul className="list-unstyled">
              {React.Children.toArray(children).filter(
                (child) =>
                  !value || child.props.children.toLowerCase().startsWith(value),
              )}
            </ul>
          </div>
        );
      },
    );
    
    return (
      <Dropdown className='relative'>
        {/* <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"> */}
        <Dropdown.Toggle id="dropdown-custom-components" className='select-coin-btn'>
        </Dropdown.Toggle>
    
        {/* <Dropdown.Menu as={CustomMenu} variant="dark " className='!rounded-2 px-3 bg-[#1F2330]'> */}
        <Dropdown.Menu variant="dark " className='!rounded-2 px-3 bg-[#1F2330]'>
            <Dropdown.Item className={`rounded-3 py-2 px-2 ${selectionCoinType === 'BTC' && "bg-[#141622]"}`} onClick={() => {setCoinType('BTC');}}>
                {/* <img src={btcimg} alt="Coin" className="inline min-w-[20px] w-[20px]"/> */}
                <CoinButton coinType="BTC"></CoinButton>
                {/* BTC */}
            </Dropdown.Item>
            <Dropdown.Item className={`rounded-3 py-2 px-2 ${selectionCoinType === 'ETH' && "bg-[#141622]"}`} onClick={() => {setCoinType('ETH');}} >
                <CoinButton coinType="ETH"></CoinButton>
                {/* ETH */}
            </Dropdown.Item>
            <Dropdown.Item className={`rounded-3 py-2 px-2 ${selectionCoinType === 'SOL' && "bg-[#141622]"}`} onClick={() => {setCoinType('SOL');}} >
                <CoinButton coinType="SOL"></CoinButton>
                {/* SOL */}
            </Dropdown.Item>
            <Dropdown.Item className={`rounded-3 py-2 px-2 ${selectionCoinType === 'APE' && "bg-[#141622]"}`} onClick={() => {setCoinType('APE');}} >
                <CoinButton coinType="APE"></CoinButton>
                {/* APE */}
            </Dropdown.Item>
            <Dropdown.Item className={`rounded-3 py-2 px-2 ${selectionCoinType === 'ADA' && "bg-[#141622]"}`} onClick={() => {setCoinType('ADA');}} >
                <CoinButton coinType="ADA"></CoinButton>
                {/* ADA */}
            </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
}

export default SelectCoin;