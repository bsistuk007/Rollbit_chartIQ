import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgCandle from "../Svg/svgcandle";
import { getUserBalance } from "./../../actions/userActions";
import BetCoinImg from "./betcoinimg";
import axios from "axios";
import FormData from "form-data";
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import './confirmalert.css';
import SvgClose from "../Svg/svgclose";
import SvgAutoBetSetting from "../Svg/svgautobetsetting";

function ActiveBets() {
    const dispatch = useDispatch();
    const [betData, setActiveBetData] = useState([]);
    const bet = useSelector((state) => state.bet);
    const { activeBetRecord } = bet;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const coinPrice = useSelector((state) => state.coinPrice);
    const { bitcoinPrice, ethereumPrice, solanaPrice } = coinPrice;
    const notify = (message) => toast.success(message, {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    useEffect(() => {
        setActiveBetData(activeBetRecord);
    }, [activeBetRecord])

    const confrimCashOut = (betId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-confirm-alert'>
                    <div className="flex justify-between">
                        <div>
                            <h1>CASH OUT</h1>
                        </div>
                        <div onClick={onClose}>
                            <SvgClose></SvgClose>
                        </div>
                    </div>
                    <div className="text-[16px] mb-4">
                        <p>Are you sure you want to cash out?</p>
                    </div>
                    <div className="flex confirm-alert-bottom">
                        <div className="mr-4">
                            <button className="confirm-alert-btn" onClick={onClose}>
                                No
                            </button>
                        </div>
                        <div>
                            <button className="cashout-btn confirm-alert-btn" onClick = {()=> {
                                    onClose();
                                    cashOut(betId)
                                    // cashOut(bet.id)
                                }}>
                                    CASH OUT
                            </button>
                        </div>
                    </div>
                </div>
              );
            }
          });
    }

    const cashOut = (async (betId) => {
        const formData = new FormData();
        formData.append('betId', betId);
        var ROI = '';
        var PnL = '';
        var coinPrice = bitcoinPrice;
        for (let index = 0; index < betData.length; index++) {
            const element = betData[index];
            if(element.id == betId) {
                formData.append('ROI', element.ROI);
                formData.append('PnL', element.PnL);
                if(element.betCoinType == "ETH") {
                    coinPrice = ethereumPrice
                } 
                if(element.betCoinType == 'SOL') {
                    coinPrice = solanaPrice;
                }
                ROI = element.ROI;
                PnL = element.PnL;
                break;
            }    
        }
        if(PnL == '') {
            notify('fail cashout')
            return;
        }
        var params = {
            betId: betId,
            ROI: ROI,
            PnL: PnL,
            exitPrice: coinPrice
        };
        var message = PnL > 0 ? 'profit' : 'loss';
        message = message + ` $` + Math.abs(PnL);
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            }
          };
        try {
            const res = await axios.put(`/api/users/cashout`, params, config);
            if(res.data.status == 'success') {
                notify(message)
                dispatch(getUserBalance());
            }
        } catch(err) {
            console.log(err);
        }
    })

    return (
        <>
            <ToastContainer 
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {betData == undefined || betData.length == 0 ? (
                <div className="table-no-bet-data">
                    <SvgCandle></SvgCandle>
                    <h3 className="italic">
                        NO BETS YET
                    </h3>
                </div>
            ) : (
                <div className="pb-2 overflow-auto table-box">
                    <table className="statistics-table">
                        <thead>
                            <tr>
                                <th className="statistics-table-header-1">
                                    <div>Player</div>
                                </th>
                                <th className="statistics-table-header-1">
                                    <div>Bet</div>
                                </th>
                                <th className="statistics-table-header-2">
                                    <div>Entry Price</div>
                                </th>
                                <th className="statistics-table-header-2">
                                    <div>Wager</div>
                                </th>
                                <th className="statistics-table-header-2">
                                    <div>Bust Price</div>
                                </th>
                                <th className="statistics-table-header-2">
                                    <div>Multiplier</div>
                                </th>
                                {/* <th className="statistics-table-header-2">
                                    <div>Profit</div>
                                </th> */}
                                <th className="statistics-table-header-2">
                                    <div>P&amp;L</div>
                                </th>
                                <th className="statistics-table-header-2">
                                    <div></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="table-data-body">
                            {
                                betData.map((bet) => 
                                    <tr className="table-data-row">
                                        <td>
                                            {bet.username}
                                        </td>
                                        <td>
                                            <BetCoinImg coinType={bet.betCoinType} updownFlag={bet.updownFlag}></BetCoinImg>
                                        </td>
                                        <td className="table-data-content">
                                            {bet.entryPrice}
                                        </td>
                                        <td className="table-data-content">
                                            {bet.wager}
                                        </td>
                                        <td className="table-data-content">
                                            {bet.bustPrice}
                                        </td>
                                        <td className="table-data-content">
                                            x{bet.multiplier}
                                        </td>
                                        {/* <td className="table-data-content">
                                            -
                                        </td> */}
                                        <td className="table-data-content">
                                            <div className={`${bet.PnL >= 0 ? 'text-[#72f238]' : 'text-[#ff4949]'} `}>
                                                {bet.PnL < 0 ? '-' : ''}${Math.abs(bet.PnL)}
                                            </div>
                                        </td>
                                        <td className="table-data-content cursor-default">
                                            <div className="flex">
                                                <div className="mr-2">
                                                    <button className="cashout-btn" onClick = {()=> {
                                                        confrimCashOut(bet.id)
                                                        // cashOut(bet.id)
                                                    }}>
                                                        CASH OUT
                                                    </button>

                                                </div>
                                                <SvgAutoBetSetting lossColor={bet.autoStopLossState} profitColor={bet.autoStopProfitState}></SvgAutoBetSetting>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default ActiveBets