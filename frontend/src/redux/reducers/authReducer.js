import { SET_PROFILE } from "../../configs";

//Reducer for character information Initialize State
const initState = {
    authFlag: false
}

//Define Actions
const authReducer = (state = initState, action) => {
    switch (action.type) {
            //Change character name
        case SET_PROFILE:
            return {
                ...state,
                authFlag: action.payload
            }
        default:
            return state
    }
}

export default authReducer;