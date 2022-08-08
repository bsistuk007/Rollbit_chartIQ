import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SvgCandle from "../Svg/svgcandle";
import SvgEye from "../Svg/svgeye";
import BetCoinImg from "./betcoinimg";

function PublicBets() {
    const [betData, setPublicBetData] = useState([]);
    const bet = useSelector((state) => state.bet);
    const { publicBetRecord } = bet;

    useEffect(() => {
        console.log('public bet record ', publicBetRecord);
        setPublicBetData(publicBetRecord)
    }, [publicBetRecord])

    return (
        <>
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
                                {/* <th className="statistics-table-header-2">
                                    <div>Exit Price</div>
                                </th> */}
                                <th className="statistics-table-header-2">
                                    <div>P&amp;L</div>
                                </th>
                                <th className="statistics-table-header-2">
                                    <div>ROI</div>
                                </th>
                                {/* <th className="statistics-table-header-2">
                                    <div></div>
                                </th> */}
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
                                    20,392.62
                                </td> */}
                                <td className="table-data-content">
                                    <div className={`${bet.PnL >= 0 ? 'text-[#72f238]' : 'text-[#ff4949]'} `}>
                                        {bet.PnL < 0 ? '-' : ''}${Math.abs(bet.PnL)}
                                    </div>
                                </td>
                                <td className="table-data-content">
                                    <div className={`${bet.ROI >= 0 ? 'text-[#72f238]' : 'text-[#ff4949]'} `}>
                                        {bet.ROI < 0 ? '-' : ''}{Math.abs(bet.ROI)}%
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

export default PublicBets