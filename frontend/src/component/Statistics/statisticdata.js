import React, {useState} from "react";
import { useSelector } from "react-redux";
import SvgEye from "../Svg/svgeye";
import ActiveBets from "./activebets";
import ClosedBets from "./closedbets";
import Instruments from "./instruments";
import LeaderBoard from "./leaderboard";
import PeriodSelect from "./periodselect";
import PnlRoi from "./pnlroi";
import PublicBets from "./publicbets";

function StatisticsData () {
    const [statisticsType, setStatisticsType] = useState('leaderboard');
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return (
        <div className="statistics-box">
            <div className="w-full flex justify-between">
                <div className="flex ">
                    {
                        userInfo ? (
                            <>
                                <div className={`login-register-set whitespace-nowrap ${statisticsType==='active'? "login-register-set-active":""} !text-[12px] !not-italic`} onClick={()=>setStatisticsType('active')}>Active Bets</div>
                                <div className={`login-register-set whitespace-nowrap ${statisticsType==='closed'? "login-register-set-active":""} !text-[12px] !not-italic`} onClick={()=>setStatisticsType('closed')}>Closed Bets</div>
                            </>
                        ) : (
                        <></>
                        )
                    }
                    <div className={`login-register-set whitespace-nowrap ${statisticsType==='public'? "login-register-set-active":""} !text-[12px] !not-italic`} onClick={()=>setStatisticsType('public')}>Public Bets</div>
                    <div className={`login-register-set whitespace-nowrap ${statisticsType==='leaderboard'? "login-register-set-active":""} !text-[12px] !not-italic`} onClick={()=>setStatisticsType('leaderboard')}>LeaderBoard</div>
                </div>
                {/* <div className="flex">
                    <div><Instruments/></div>
                    <div className="ml-2"><PnlRoi></PnlRoi> </div>
                    <div className="ml-2"><PeriodSelect></PeriodSelect></div>
                    <div className="ml-2">How it works</div>
                </div> */}
            </div>
            {
               statisticsType === 'active' && <ActiveBets></ActiveBets>  
            }
            {
               statisticsType === 'closed' && <ClosedBets></ClosedBets>  
            }
            {
               statisticsType === 'public' && <PublicBets></PublicBets>  
            }
            {
               statisticsType === 'leaderboard' && <LeaderBoard></LeaderBoard>  
            }
        </div>
    )
}

export default StatisticsData