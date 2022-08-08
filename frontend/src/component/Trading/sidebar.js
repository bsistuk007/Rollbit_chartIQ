import React, { useState } from "react";
// import Sidebar from "react-bootstrap-sidebar";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./sidebarstyles.css";
import { SET_SELECTION_TRADING_COIN_TYPE } from "../../configs";

import SideNav, {
  NavItem,
} from "@trendmicro/react-sidenav";
import CoinPriceButton from "./coinpricebutton";
import { useDispatch, useSelector } from "react-redux";
// import styles from "./myStyles.module.css";

function SideNavBar() {
    const dispatch = useDispatch();
    const [isVisible, setVisible] = useState(false);
    const coinPrice = useSelector((state) => state.coinPrice);
    const { bitcoinPrice, bitcoinPriceUpDown, ethereumPrice,ethereumPriceUpDown,  solanaPrice, solanaPriceUpDown, apePrice, apePriceUpDown, adaPrice, adaPriceUpDown } = coinPrice;

    const { selectionCoinType } = useSelector(state => state.coin);
    const setCoinType = (type) => {
        dispatch({type: SET_SELECTION_TRADING_COIN_TYPE, payload: type});
        setVisible(!isVisible);
    }

    return (
        <SideNav expanded={isVisible} className={`coin-price-info-sidebar ${isVisible ? 'coin-price-info-sidebar-expanded' : ""}`}>
            <SideNav.Toggle
            onClick={() => {
                setVisible(!isVisible);
            }}
            />
            <SideNav.Nav>
                <NavItem eventKey="BTC" className="flex justify-center">
                    <div className={`min-w-[180px] hover:mx-3 ${isVisible ? "" : "hidden"}`} onClick={() => {setCoinType('BTC');}}>
                        <CoinPriceButton coinType="BTC" state={bitcoinPriceUpDown} price={bitcoinPrice} ></CoinPriceButton>
                    </div>
                </NavItem>
                <NavItem eventKey="ETH" className="flex justify-center">
                    <div className={`min-w-[180px] hover:mx-3 ${isVisible ? "" : "hidden"}`} onClick={() => {setCoinType('ETH');}}>
                        <CoinPriceButton coinType="ETH" state={ethereumPriceUpDown} price={ethereumPrice}></CoinPriceButton>
                    </div>
                </NavItem>
                <NavItem eventKey="SOL" className="flex justify-center">
                    <div className={`min-w-[180px] hover:mx-3 ${isVisible ? "" : "hidden"}`} onClick={() => {setCoinType('SOL');}}>
                        <CoinPriceButton coinType="SOL" state={solanaPriceUpDown} price={solanaPrice}></CoinPriceButton>
                    </div>
                </NavItem>
                <NavItem eventKey="APE" className="flex justify-center">
                    <div className={`min-w-[180px] hover:mx-3 ${isVisible ? "" : "hidden"}`} onClick={() => {setCoinType('APE');}}>
                        <CoinPriceButton coinType="APE" state={apePriceUpDown} price={apePrice}></CoinPriceButton>
                    </div>
                </NavItem>
                <NavItem eventKey="ADA" className="flex justify-center">
                    <div className={`min-w-[180px] hover:mx-3 ${isVisible ? "" : "hidden"}`} onClick={() => {setCoinType('ADA');}}>
                        <CoinPriceButton coinType="ADA" state={adaPriceUpDown} price={adaPrice}></CoinPriceButton>
                    </div>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
}

export default SideNavBar;
