import { SET_SELECTION_CASHIER_TYPE } from "../../configs";

//Reducer for character information Initialize State
const initState = {
    selectionCashierType: 'deposit'
}

//Define Actions
const cashierSelectionReducer = (state = initState, action) => {
    switch (action.type) {
        //Change character name
        case SET_SELECTION_CASHIER_TYPE:
            return {
                ...state,
                selectionCashierType : action.payload
            }
        default:
            return state
    }
}

export default cashierSelectionReducer;