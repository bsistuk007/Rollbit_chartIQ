import { 
        SET_ADD_ACTIVE_BET_RECORD,
        SET_ACTIVE_BET_RECORD, 
        SET_CLOSED_BET_RECORD,
        SET_PUBLIC_BET_RECORD,
        SET_LEADERBOARD_RECORD, 
    } from "../../configs";

//Reducer for character information Initialize State
const initState = {
    activeBetRecord: [],
    closedBetRecord: [],
    publicBetRecord: [],
    leaderboardRecord: []
}

//Define Actions
export const betRecordReducer = (state = initState, action) => {
    switch (action.type) {
            //Change character name
        case SET_ADD_ACTIVE_BET_RECORD:
            return {
                ...state,
                activeBetRecord: [...state.activeBetRecord, action.payload],
            }
        case SET_ACTIVE_BET_RECORD:
            return {
                ...state,
                // activeBetRecord: [...state.activeBetRecord, action.payload],
                activeBetRecord: action.payload
            }
        case SET_CLOSED_BET_RECORD:
            return {
                ...state,
                closedBetRecord: [...state.closedBetRecord, action.payload]
            }
        case SET_PUBLIC_BET_RECORD:
            return {
                ...state,
                publicBetRecord:  action.payload
            }
        case SET_LEADERBOARD_RECORD:
            return {
                ...state,
                leaderboardRecord: [...state.leaderboardRecord, action.payload]
            }
        default:
            return state
    }
}

export default betRecordReducer;