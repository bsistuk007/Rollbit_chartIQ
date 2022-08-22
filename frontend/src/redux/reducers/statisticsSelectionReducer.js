import { SET_SELECTION_STATISTICS_TAB } from "../../configs";

//Reducer for character information Initialize State
const initState = {
    statisticsSelectionType: 'leaderboard',
}

//Define Actions
const statisticsSelectionReducer = (state = initState, action) => {
    switch (action.type) {
            //Change character name
        case SET_SELECTION_STATISTICS_TAB:
            return {
                ...state,
                statisticsSelectionType: action.payload
            }
        default:
            return state
    }
}

export default statisticsSelectionReducer;