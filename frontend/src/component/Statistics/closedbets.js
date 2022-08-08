import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SvgCandle from "../Svg/svgcandle";
import SvgEye from "../Svg/svgeye";
import BetCoinImg from "./betcoinimg";
import { ToastContainer, toast } from 'react-toastify';


function ClosedBets() {
    const [betData, setClosedBetData] = useState([]);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
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
        if(userInfo == null) {
            notify('You have to login');
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        axios.get('/api/users/closedbets', config).then(function(res) {
            if(res.status == 200) {
                setClosedBetData(res.data)
            }
        }).catch(function(err){
            console.log(err);
        });
        //componentWillmount
    }, [])

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
            {betData == undefined || betData.length == 0  ? (
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
                                <th className="statistics-table-header-2">
                                    <div>Exit Price</div>
                                </th>
                                <th className="statistics-table-header-2">
                                    <div>P&amp;L</div>
                                </th>
                                {/* <th className="statistics-table-header-2">
                                    <div>ROI</div>
                                </th> */}
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
                                <td className="table-data-content">
                                    { bet.betState == 'busted' ? '-' : bet.exitPrice }
                                </td>
                                <td className="table-data-content">
                                    <div className={`${bet.PnL >= 0 ? 'text-[#72f238]' : 'text-[#ff4949]'} `}>
                                        {/* {bet.PnL < 0 ? '-' : ''}${Intl.NumberFormat().format(Math.abs(bet.PnL))} */}
                                        {bet.PnL < 0 ? '-' : ''}${(Math.abs(bet.PnL)).toFixed(2)}
                                    </div>
                                </td>
                                <td className="table-data-content">
                                    <div className={`${bet.betState == 'busted' ? 'text-[#ff4949]' : ''} `}>
                                        {bet.betState}
                                    </div>
                                </td>
                                {/* <td className="table-data-content cursor-default">
                                    <div>
                                        <SvgEye></SvgEye>
                                    </div>
                                </td> */}
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

export default ClosedBets