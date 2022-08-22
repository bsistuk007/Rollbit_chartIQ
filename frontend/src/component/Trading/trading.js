import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import Bet from "../Bet/bet";
// import TradingChart from "../Chart/chart";
import TradingChart from "../Chart/chart";
import StatisticsData from "../Statistics/statisticdata";
import CoinImg from "./coinimg";
import SelectCoin from "./selectcoin";
import UpDown from "./updown";
import { useDispatch, useSelector} from "react-redux";
import SideNavBar from "./sidebar";
import IntervalSetting from "./intervalsetting";
import ChartSetting from "./chartsetting";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IpRestrictModal from "../IpRestrict";
// import TradingChartDemo from "../Chart/chartdemo";


function Trading() {
    const [updownFlag, setUpdownFlag] = useState('up');
    const [currentIntegerPrice, setCurrentIntegerPrice] = useState();
    const [currentFloatrPrice, setCurrentFloatrPrice] = useState();
    const [highPrice, setHighPrice] = useState();
    const [lowPrice, setLowPrice] = useState();
    const [volume, setVolume] = useState();
    const { selectionCoinType } = useSelector(state => state.coin);
    const coinPrice = useSelector((state) => state.coinPrice);
    const { bitcoinPrice, bitcoinPriceUpDown, bitcoinHighPrice, bitcoinLowPrice, bitcoinVolume, ethereumPrice, ethereumPriceUpDown,ethereumHighPrice, ethereumLowPrice, ethereumVolume, solanaPrice, solanaPriceUpDown, solanaHighPrice, solanaLowPrice, solanaVolume, apePrice, apePriceUpDown, apeHighPrice, apeLowPrice, apeVolume, adaPrice, adaPriceUpDown, adaHighPrice, adaLowPrice, adaVolume } = coinPrice;
    const [ipModalShow, setIpModalShow] = useState(false);
    // const { bitcoinPrice, bitcoinPriceUpDown, ethereumPrice, ethereumPriceUpDown,solanaPrice, solanaPriceUpDown } = coinPrice;
    const history = useHistory();
    
    useEffect(() => {   
        if(selectionCoinType == 'BTC') {
            setUpdownFlag(bitcoinPriceUpDown);
            setCurrentIntegerPrice(Intl.NumberFormat().format(Math.floor(bitcoinPrice)));
            if(bitcoinPrice)
                setCurrentFloatrPrice(bitcoinPrice.toString().split('.')[1]);
        }
        if(selectionCoinType == "ETH") {
            setUpdownFlag(ethereumPriceUpDown);
            
            setCurrentIntegerPrice(Intl.NumberFormat().format(Math.floor(ethereumPrice)));
            if(ethereumPrice)
                setCurrentFloatrPrice(ethereumPrice.toString().split('.')[1]);
        }
        if(selectionCoinType == "SOL") {
            setUpdownFlag(solanaPriceUpDown);
           
            setCurrentIntegerPrice(Intl.NumberFormat().format(Math.floor(solanaPrice)));
            if(solanaPrice)
                setCurrentFloatrPrice(solanaPrice.toString().split('.')[1]);
        }
        if(selectionCoinType == "APE") {
            setUpdownFlag(apePriceUpDown);
           
            setCurrentIntegerPrice(Intl.NumberFormat().format(Math.floor(apePrice)));
            if(apePrice)
                setCurrentFloatrPrice(apePrice.toString().split('.')[1]);
        }
        if(selectionCoinType == "ADA") {
            setUpdownFlag(adaPriceUpDown);
           
            setCurrentIntegerPrice(Intl.NumberFormat().format(Math.floor(adaPrice)));
            if(adaPrice)
                setCurrentFloatrPrice(adaPrice.toString().split('.')[1]);
        }

      }, [selectionCoinType,bitcoinPrice,bitcoinPriceUpDown, ethereumPrice, ethereumPriceUpDown, solanaPrice, solanaPriceUpDown, apePrice, apePriceUpDown, adaPrice, adaPriceUpDown])
    useEffect(() => {
        if(selectionCoinType == 'BTC') {
            setHighPrice(bitcoinHighPrice);
            setLowPrice(bitcoinLowPrice);
            setVolume(Intl.NumberFormat('en-GB', {
                notation: "compact",
                compactDisplay: "short"
              }).format(bitcoinVolume));
        }
        if(selectionCoinType == "ETH") {
            setHighPrice(ethereumHighPrice);
            setLowPrice(ethereumLowPrice);
            setVolume(Intl.NumberFormat('en-GB', {
                notation: "compact",
                compactDisplay: "short"
              }).format(ethereumVolume));
        }
        if(selectionCoinType == "SOL") {
            setHighPrice(solanaHighPrice);
            setLowPrice(solanaLowPrice);
            setVolume(Intl.NumberFormat('en-GB', {
                notation: "compact",
                compactDisplay: "short"
              }).format(solanaVolume));
        }
        if(selectionCoinType == "APE") {
            setHighPrice(apeHighPrice);
            setLowPrice(apeLowPrice);
            setVolume(Intl.NumberFormat('en-GB', {
                notation: "compact",
                compactDisplay: "short"
              }).format(apeVolume));
        }
        if(selectionCoinType == "ADA") {
            setHighPrice(adaHighPrice);
            setLowPrice(adaLowPrice);
            setVolume(Intl.NumberFormat('en-GB', {
                notation: "compact",
                compactDisplay: "short"
              }).format(adaVolume));
        }
    }, [selectionCoinType, bitcoinHighPrice, bitcoinLowPrice,bitcoinVolume, ethereumHighPrice, ethereumLowPrice, ethereumVolume, solanaHighPrice, solanaLowPrice, solanaVolume, apeHighPrice, apeLowPrice, apeVolume, adaHighPrice, adaLowPrice, adaVolume])

    const goToPriceFormulationPage = () => {
        history.push(`/price-formulation`);
    }

    const getIPData = async()=>{
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res);
        var country_code = res.data.country_code;
        if(country_code == "AU" || country_code == "US") {

        } else {
            setIpModalShow(true);
        }
        
    }

    const notify = (message) => toast.info(message, {
        position: "top-center",
        autoClose: 10000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    useEffect(()=>{
        getIPData()
    }, [])

    return (
        <>
            <IpRestrictModal show={ipModalShow} setIpModalShow={setIpModalShow}></IpRestrictModal>
            <SideNavBar></SideNavBar>
            <div className="block md:flex">
                <div className="chart flex-1 pl-4">
                    <div className="flex justify-between overflow-auto">
                        <div className="flex flex-wrap items-center ">
                            <div className="flex items-center mb-3">
                                <div>
                                    <CoinImg></CoinImg>
                                </div>
                                <div className="ml-4 hidden md:block">
                                    <UpDown state={updownFlag}></UpDown>
                                </div>
                                <div className={`ml-4 items-center text-lg ${updownFlag == 'up' ? 'text-[#72f238]' : 'text-[#ff4949]' } text-[20px] md:text-[32px]`}>{currentIntegerPrice}
                                    <span className="text-[20px]">.{currentFloatrPrice || '00'}</span>
                                </div>
                                <div className="ml-4">
                                    <SelectCoin></SelectCoin>
                                </div>
                            </div>
                            <div className="ml-5 whitespace-nowrap">
                                <div className="text-sm text-[#B1B6C6]">
                                    24h Volume:&nbsp; 
                                    <span className="text-white">
                                    {
                                        volume
                                    } 
                                    </span> 
                                    · H: 
                                    <span className="text-[#72F238]">
                                        {highPrice}
                                    </span>
                                    · L: 
                                    <span className="text-[#FF4949]">
                                        {lowPrice}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex whitespace-nowrap">
                            <div>
                                <IntervalSetting></IntervalSetting>
                            </div>
                            <div className="mx-3">
                                <ChartSetting></ChartSetting>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[350px] mr-3 md:h-[440px] md:mr-0">
                        <TradingChart></TradingChart>
                    </div>
                </div>
                <div className="px-4">
                    <Bet></Bet>
                </div>
            </div>
            <div className="px-4">
                <StatisticsData></StatisticsData>
            </div>
            <div className="mx-4 py-5 text-[#B1B6C6] text-[12px]">
                Learn more about&nbsp; 
                <span className="underline cursor-pointer hover:text-[#FFB018]" onClick={() => {goToPriceFormulationPage()}}>
                    Price Formulation
                </span>
            </div>
        </>
        
    );
}

export default Trading;