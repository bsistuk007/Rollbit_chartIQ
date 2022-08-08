import React, {useEffect, useState} from 'react';
import AccountLayout from '../../component/Account/index';
import Trading from '../../component/Trading/trading';
import { useDispatch, useSelector } from "react-redux";
import { COIN_BASE_URL} from '../../configs/api';
import { getUserBalance, checkDepositState } from "./../../actions/userActions";
import { SET_BITCOIN_24H_HIGH_PRICE, SET_BITCOIN_24H_LOW_PRICE, SET_BITCOIN_24H_VOLUME, SET_ETHEREUM_24H_HIGH_PRICE, SET_ETHEREUM_24H_LOW_PRICE, SET_ETHEREUM_24H_VOLUME, SET_SOLANA_24H_HIGH_PRICE, SET_SOLANA_24H_LOW_PRICE, SET_SOLANA_24H_VOLUME, SET_APE_24H_HIGH_PRICE, SET_APE_24H_LOW_PRICE, SET_APE_24H_VOLUME, SET_ADA_24H_HIGH_PRICE, SET_ADA_24H_LOW_PRICE, SET_ADA_24H_VOLUME } from '../../configs';
import axios from 'axios';

function Body() {
  // const coinPrice = useSelector((state) => state.coinPrice);
  // const { bitcoinPrice, ethereumPrice, solanaPrice } = coinPrice;
  const dispatch = useDispatch();
  // const [updatedBitcoinPrice, setUpdatedBitcoinPrice] = useState();
  // const [updatedEthereumPrice, setUpdatedEthereumPrice] = useState();
  // const [updatedSolanaPrice, setUpdatedSolanaPrice] = useState();
  const { accountSelectionType } = useSelector(state => state.account);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
   
    getBalance();
    // getRealTimeCoinPrice();
    getDailyCoinStatisticsData();
    const balanceInterval = setInterval(() => {
      getBalance();
    }, 10000)
    const checkDepositInterval = setInterval(() => {
      checkDeposit();
    }, 60000);
    const dailyCoinStatistcsInterval = setInterval(() => {
      getDailyCoinStatisticsData();
    }, 3600000)
    return () => {
      clearInterval(balanceInterval);
      clearInterval(checkDepositInterval);
      clearInterval(dailyCoinStatistcsInterval);
    };
  }, [])

  const getBalance = () => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if(!!userData && userData.email){
      dispatch(getUserBalance());
    } 
  }

  const checkDeposit = () => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if(!!userData && userData.email) {
      dispatch(checkDepositState());
    }
  }
  // const getRealTimeCoinPrice = () => {
  //   const url = COIN_BASE_URL+'ticker/price?symbols=["BTCUSDT","ETHUSDT","SOLUSDT"]';
  //   axios.get(url).then((res) => {
  //     if(res.status == 200){
  //       setUpdatedBitcoinPrice(parseFloat(res.data[0].price).toFixed(2)); //set bitcoin realtime price
  //       setUpdatedEthereumPrice(parseFloat(res.data[1].price).toFixed(3)); //set ethereum realtime price
  //       setUpdatedSolanaPrice(parseFloat(res.data[2].price).toFixed(4)); //set solana realtime price
  //     }
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // }

  const getDailyCoinStatisticsData = () => {
    const url = COIN_BASE_URL+'ticker/24hr?symbols=["BTCUSDT","ETHUSDT","SOLUSDT","APEUSDT","ADAUSDT"]';
    axios.get(url).then((res) => {
      if(res.status == 200) {
        const bitcoin24HPrice = res.data[0];
        const ethereum24HPrice = res.data[1];
        const solana24HPrice = res.data[3];
        const ape24HPrice = res.data[4];
        const ada24HPrice = res.data[2];
        dispatch({ type: SET_BITCOIN_24H_HIGH_PRICE, payload: parseFloat(bitcoin24HPrice.highPrice).toFixed(2) });
        dispatch({ type: SET_BITCOIN_24H_LOW_PRICE, payload: parseFloat(bitcoin24HPrice.lowPrice).toFixed(2) });
        dispatch({ type: SET_BITCOIN_24H_VOLUME, payload: parseFloat(bitcoin24HPrice.volume)});

        dispatch({ type: SET_ETHEREUM_24H_HIGH_PRICE, payload: parseFloat(ethereum24HPrice.highPrice).toFixed(2) });
        dispatch({ type: SET_ETHEREUM_24H_LOW_PRICE, payload: parseFloat(ethereum24HPrice.lowPrice).toFixed(2) });
        dispatch({ type: SET_ETHEREUM_24H_VOLUME, payload: parseFloat(ethereum24HPrice.volume)});

        dispatch({ type: SET_SOLANA_24H_HIGH_PRICE, payload: parseFloat(solana24HPrice.highPrice).toFixed(2) });
        dispatch({ type: SET_SOLANA_24H_LOW_PRICE, payload: parseFloat(solana24HPrice.lowPrice).toFixed(2) });
        dispatch({ type: SET_SOLANA_24H_VOLUME, payload: parseFloat(solana24HPrice.volume)});
        
        dispatch({ type: SET_APE_24H_HIGH_PRICE, payload: parseFloat(ape24HPrice.highPrice).toFixed(2) });
        dispatch({ type: SET_APE_24H_LOW_PRICE, payload: parseFloat(ape24HPrice.lowPrice).toFixed(2) });
        dispatch({ type: SET_APE_24H_VOLUME, payload: parseFloat(ape24HPrice.volume)});

        dispatch({ type: SET_ADA_24H_HIGH_PRICE, payload: parseFloat(ada24HPrice.highPrice).toFixed(2) });
        dispatch({ type: SET_ADA_24H_LOW_PRICE, payload: parseFloat(ada24HPrice.lowPrice).toFixed(2) });
        dispatch({ type: SET_ADA_24H_VOLUME, payload: parseFloat(ada24HPrice.volume)});
      }
    }).catch((err) => {
      console.error(err)
    })
  }

  return (
    <div className="text-3xl font-bold pt-6">
      {
        accountSelectionType == false ? (
          <div>
            <Trading></Trading>
          </div>
        ) : (
          <div>
            <AccountLayout></AccountLayout>
          </div>
        )
      }
    </div>
  );
}
  
export default Body;
  