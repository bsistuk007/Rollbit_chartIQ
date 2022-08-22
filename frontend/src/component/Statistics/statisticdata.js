import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
// import SvgEye from "../Svg/svgeye";
import ActiveBets from "./activebets";
import ClosedBets from "./closedbets";
// import Instruments from "./instruments";
import LeaderBoard from "./leaderboard";
// import PeriodSelect from "./periodselect";
// import PnlRoi from "./pnlroi";
import PublicBets from "./publicbets";
import { SET_SELECTION_STATISTICS_TAB } from "../../configs";

function StatisticsData () {
    const dispatch = useDispatch();
    const [statisticsType, setStatisticsType] = useState('leaderboard');
    const userLogin = useSelector((state) => state.userLogin);
    const { statisticsSelectionType } = useSelector((state) => state.statistics);
    const { userInfo } = userLogin;
    const bet = useSelector((state) => state.bet);
    const { activeBetRecord } = bet;

    const setSelectTab = (type) => {
        dispatch({type: SET_SELECTION_STATISTICS_TAB, payload: type});
        setStatisticsType(type);
    }

    useEffect(()=>{
        setStatisticsType(statisticsSelectionType);
    }, [statisticsSelectionType])

    // useEffect(()=> {
    //     console.log('stat ', activeBetRecord);
    //     if(userInfo && activeBetRecord.length > 0) { 
    //         dispatch({type: SET_SELECTION_STATISTICS_TAB, payload: 'active'});
    //         setStatisticsType('active');
    //     }
    // }, [userInfo])

    return (
        <div className="statistics-box">
            <div className="w-full flex justify-between overflow-auto">
                <div className="flex ">
                    {
                        userInfo ? (
                            <>
                                <div className={`login-register-set whitespace-nowrap ${statisticsType==='active'? "login-register-set-active":""} !text-[12px] !not-italic`} onClick={()=>setSelectTab('active')}>Active Bets</div>
                                <div className={`login-register-set whitespace-nowrap ${statisticsType==='closed'? "login-register-set-active":""} !text-[12px] !not-italic`} onClick={()=>setSelectTab('closed')}>Closed Bets</div>
                            </>
                        ) : (
                        <></>
                        )
                    }
                    <div className={`login-register-set whitespace-nowrap ${statisticsType==='public'? "login-register-set-active":""} !text-[12px] !not-italic`} onClick={()=>setSelectTab('public')}>Public Bets</div>
                    <div className={`login-register-set whitespace-nowrap ${statisticsType==='leaderboard'? "login-register-set-active":""} !text-[12px] !not-italic`} onClick={()=>setSelectTab('leaderboard')}>LeaderBoard</div>
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