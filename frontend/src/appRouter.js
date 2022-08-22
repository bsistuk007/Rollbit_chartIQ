import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './pages/index';
import Account from "./pages/account";
import PriceFormulationPage from './pages/priceformulation';
import socketInit from '../src/socket';
import ACTIONS from '../src/configs/socket';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_BET_RECORD, SET_BITCOIN_PRICE, SET_BITCOIN_PRICE_UPDOWN, SET_ETHEREUM_PRICE, SET_ETHEREUM_PRICE_UPDOWN, SET_PUBLIC_BET_RECORD, SET_SOLANA_PRICE, SET_SOLANA_PRICE_UPDOWN, SET_APE_PRICE, SET_APE_PRICE_UPDOWN, SET_ADA_PRICE, SET_ADA_PRICE_UPDOWN } from '../src/configs';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  AppRouter = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [updatedCoinPrice, setUpdatedCoinPrice] = useState();
    const [updatedBitcoinPrice, setUpdatedBitcoinPrice] = useState();
    const [updatedEthereumPrice, setUpdatedEthereumPrice] = useState();
    const [updatedSolanaPrice, setUpdatedSolanaPrice] = useState();
    const [updatedAPEPrice, setUpdatedAPEPrice] = useState();
    const [updatedADAPrice, setUpdatedADAPrice] = useState();
    const [publicBetData, setPublicBetData] = useState();
    const [activeBetData, setActiveBetData] = useState();
    const [totalBetData, setTotalBetData] = useState([]);
    const coinPrice = useSelector((state) => state.coinPrice);
    const { bitcoinPrice, ethereumPrice, solanaPrice, apePrice, adaPrice } = coinPrice;
    const [ip, setIP] = useState("");
    const notify = (message) => toast.success(message, {
        position: "middle-center",
        autoClose: 10000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    
    const getData = async()=>{
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data);
        setIP(res.data.IPv4)
        // notify("Due to licensing restrictions, we're unable to serve players from your country. If you're using a VPN, please deactivate it and try again.")
    }

    // useEffect(()=>{
    //     getData();
    // }, [])

    useEffect(()=>{
        window.socket = socketInit();
        window.socket.on(ACTIONS.INIT_EMIT, emitData => {
            setUpdatedCoinPrice(emitData.priceData);
            setUpdatedBitcoinPrice(parseFloat(emitData.priceData[0].price).toFixed(2)); //set bitcoin realtime price
            setUpdatedEthereumPrice(parseFloat(emitData.priceData[1].price).toFixed(3)); //set ethereum realtime price
            setUpdatedSolanaPrice(parseFloat(emitData.priceData[3].price).toFixed(4)); //set solana realtime price
            setUpdatedAPEPrice(parseFloat(emitData.priceData[4].price).toFixed(4)); //set solana realtime price
            setUpdatedADAPrice(parseFloat(emitData.priceData[2].price).toFixed(4)); //set solana realtime price
            let totalActiveBets = emitData.publicBets;
            setTotalBetData(emitData.publicBets)
            // if(userInfo) {
            //     let publicBets = [];
            //     let activeBets = [];
            //     for (let index = 0; index < totalActiveBets.length; index++) {
            //         const element = totalActiveBets[index];
            //         if(userInfo._id == element.user_id){
            //             activeBets.push(element)
            //         } else {
            //             publicBets.push(element);
            //         }
            //     }
            //     setPublicBetData(publicBets);
            //     setActiveBetData(activeBets)
            // } else {
            //     setPublicBetData(totalActiveBets);
            // }
        })
    }, [])

    useEffect(() => {
        if(userInfo) {
            let publicBets = [];
            let activeBets = [];
            for (let index = 0; index < totalBetData.length; index++) {
                const element = totalBetData[index];
                if(userInfo._id == element.user_id){
                    activeBets.push(element)
                } else {
                    publicBets.push(element);
                }
            }
            setPublicBetData(publicBets);
            setActiveBetData(activeBets)
        } else {
            setPublicBetData(totalBetData);
        }
    }, [totalBetData])

    useEffect(() => {
        console.log('userInfo Updated', userInfo);
        if(userInfo != undefined && userInfo != null) {

        }
        // const userData = JSON.parse(localStorage.getItem('userInfo'));
    }, [userInfo])

    useEffect(() => {
        dispatch({type: SET_ACTIVE_BET_RECORD, payload: activeBetData});
        dispatch({type: SET_PUBLIC_BET_RECORD, payload: publicBetData});
    }, [activeBetData, publicBetData])

    useEffect(()=>{
        var updatedBitcoinPriceUpDown = bitcoinPrice <= updatedBitcoinPrice ? "up" : "down";
        dispatch({ type: SET_BITCOIN_PRICE_UPDOWN, payload: updatedBitcoinPriceUpDown});
        
        var updatedEthereumPriceUpDown = ethereumPrice <= updatedEthereumPrice ? "up" : "down";
        dispatch({ type: SET_ETHEREUM_PRICE_UPDOWN, payload: updatedEthereumPriceUpDown});
        
        var updatedSolanaPriceUpDown = solanaPrice <= updatedSolanaPrice ? "up" : "down";
        dispatch({ type: SET_SOLANA_PRICE_UPDOWN, payload: updatedSolanaPriceUpDown});

        var updatedAPEPriceUpDown = apePrice <= updatedAPEPrice ? "up" : "down";
        dispatch({ type: SET_APE_PRICE_UPDOWN, payload: updatedAPEPriceUpDown});

        var updatedADAPriceUpDown = adaPrice <= updatedADAPrice ? "up" : "down";
        dispatch({ type: SET_ADA_PRICE_UPDOWN, payload: updatedADAPriceUpDown});

        dispatch({ type: SET_BITCOIN_PRICE, payload: updatedBitcoinPrice});
        dispatch({ type: SET_ETHEREUM_PRICE, payload: updatedEthereumPrice});
        dispatch({ type: SET_SOLANA_PRICE, payload: updatedSolanaPrice});
        dispatch({ type: SET_APE_PRICE, payload: updatedAPEPrice});
        dispatch({ type: SET_ADA_PRICE, payload: updatedADAPrice});
    
    },[updatedCoinPrice])

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/price-formulation" component={PriceFormulationPage} />
                <Route exact path="/account/:id" component={Account} />
                <Route exact path="/account/:id/:type" component={Account} />
                {/* <Route exact path="/account/deposits/:id" component={Account} />
                <Route exact path="/account/withdrawals/:id" component={Withdrawals} /> */}

            </Switch>
        </Router>
    )
}

export default AppRouter;