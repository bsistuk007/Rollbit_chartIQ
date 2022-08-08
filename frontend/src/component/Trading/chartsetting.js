import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import {useSelector, useDispatch } from "react-redux";
import { SET_SELECTION_TRADING_COIN_TYPE } from "../../configs";
import SvgSetting from '../Svg/svgsetting';

function ChartSetting() {
    const dispatch = useDispatch();

    // const { selectionCoinType } = useSelector(state => state.coin);

    // const setCoinType = (type) => {
    //     dispatch({type: SET_SELECTION_TRADING_COIN_TYPE, payload: type});
    // }

    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
        href=""
        ref={ref}
        className = "table-datafilter-selector !pl-[12px] !mb-5"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
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
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
          <SvgSetting></SvgSetting>
        </Dropdown.Toggle>
    
        <Dropdown.Menu as={CustomMenu} variant="dark " className='!rounded-2 px-4 py-3 bg-[#1F2330]'>
            <div className='mb-1 uppercase'>
                <Form.Check 
                        type="checkbox"
                        id="advanced-chart"
                        label="Advanced Chart"
                        className='text-sm'
                />
            </div>
            <div className='mb-1 uppercase'>
                <Form.Check 
                        type="checkbox"
                        id="show-closing-bets"
                        label="Show Closing Bets"
                        className='text-sm'
                />
            </div>
            <div className='uppercase'>
                <Form.Check 
                        type="checkbox"
                        id="confirm-cash-out"
                        label="Confirm Cash Out"
                        className='text-sm'
                />
            </div>
            {/* <Dropdown.Item onClick={() => {setCoinType('BTC');}}>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {setCoinType('ETH');}} >
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {setCoinType('SOL');}} >
            </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    );
}

export default ChartSetting;