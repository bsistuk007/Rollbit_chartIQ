import authReducer from './authReducer';
import accountSelectionReducer from './accountSelectionReducer';
import cashierSelectionReducer from './cashierSelectionReducer';
import coinSelectionReducer from './coinSelectionReducer';
import coinPriceReducer from './coinPriceReducer';
import betRecordReducer from './betRecordReducer';
import statisticsSelectionReducer from './statisticsSelectionReducer';
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userBalanceReducer,
  } from "./userReducers";
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    auth: authReducer,
    account: accountSelectionReducer,
    cashier: cashierSelectionReducer,
    coin: coinSelectionReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userBalance: userBalanceReducer,
    coinPrice: coinPriceReducer,
    bet: betRecordReducer,
    statistics: statisticsSelectionReducer
})

export default rootReducer