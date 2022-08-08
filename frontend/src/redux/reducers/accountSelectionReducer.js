import { SET_SELECTION_ACCOUNT, SET_SELECTION_ACCOUNT_CRYPTO } from "../../configs";

//Reducer for character information Initialize State
const initState = {
    accountSelectionType: false,
    accountSelectionCryptoType: 'btc'
}

//Define Actions
const accountSelectionReducer = (state = initState, action) => {
    switch (action.type) {
            //Change character name
        case SET_SELECTION_ACCOUNT:
            return {
                ...state,
                accountSelectionType: action.payload
            }
        case SET_SELECTION_ACCOUNT_CRYPTO:
            return {
                ...state,
                accountSelectionCryptoType : action.payload
            }
        default:
            return state
    }
}

export default accountSelectionReducer;