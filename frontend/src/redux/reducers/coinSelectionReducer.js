import { SET_SELECTION_TRADING_COIN_TYPE } from "../../configs";

//Reducer for character information Initialize State
const initState = {
    selectionCoinType: 'BTC'
}

//Define Actions
const coinSelectionReducer = (state = initState, action) => {
    switch (action.type) {
        //Change character name
        case SET_SELECTION_TRADING_COIN_TYPE:
            return {
                ...state,
                selectionCoinType : action.payload
            }
        default:
            return state
    }
}

export default coinSelectionReducer;