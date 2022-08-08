import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import btcimg from './../../assets/img/bitcoin.png';
import ethimg from './../../assets/img/ethereum.png';
import ltcimg from './../../assets/img/litecoin.png';
import dogeimg from './../../assets/img/dogecoin.png';


function Instruments() {
    const [coinType, setCoinType] = useState('All Instruments');
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
            <Form.Control
              autoFocus
              className="mx-3 my-2 w-auto bg-[#141622]"
              placeholder="Search..."
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
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
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {coinType}
        </Dropdown.Toggle>
    
        <Dropdown.Menu as={CustomMenu} variant="dark " className='!rounded-2 p-1 bg-[#1F2330]'>
            <Dropdown.Item className={`rounded-3 my-1 px-2 ${coinType === 'All Instruments' && "yellow-text"}`} onClick={() => {setCoinType('All Instruments');}}>
                {/* <img src={btcimg} alt="Coin" className="inline min-w-[20px] w-[20px]"/> */}
                All Instruments
            </Dropdown.Item>
            <Dropdown.Item className={`rounded-3 my-1 px-2 ${coinType === 'BTC' && "yellow-text"}`} onClick={() => {setCoinType('BTC');}}>
                {/* <img src={btcimg} alt="Coin" className="inline min-w-[20px] w-[20px]"/> */}
                BTC
            </Dropdown.Item>
            <Dropdown.Item className={`rounded-3 my-1 px-2 ${coinType === 'ETH' && "yellow-text"}`} onClick={() => {setCoinType('ETH');}} >
                ETH
            </Dropdown.Item>
            <Dropdown.Item className={`rounded-3 my-1 px-2 ${coinType === 'DOGE' && "yellow-text"}`} onClick={() => {setCoinType('DOGE');}} >
                DOGE
            </Dropdown.Item>
            <Dropdown.Item className={`rounded-3 my-1 px-2 ${coinType === 'LTC' && "yellow-text"}`} onClick={() => {setCoinType('LTC');}} >LTC</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
}

export default Instruments;