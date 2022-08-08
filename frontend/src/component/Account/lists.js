import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import SvgProfile from '../Svg/svgprofile';
import SvgReferral from '../Svg/svgreferral';
import SvgDeposit from '../Svg/svgdeposit';
import SvgSetting from '../Svg/svgsetting';
import SvgLogout from '../Svg/svglogout';
import { useParams } from 'react-router-dom';
import { logout } from './../../actions/userActions';


function Lists() {
    const dispatch = useDispatch();
    const history = useHistory();

    const {id, type} = useParams();

    const logoutHandler = () => {
        dispatch(logout());
        // dispatch({type: SET_PROFILE, payload: false});
        // dispatch({type: SET_SELECTION_ACCOUNT, payload: false});
        // localStorage.setItem('loginFlag', false);
        // history.push(`/`);
    }

    const changeMenu = (url) => {
        history.push(`/account/${url}`);
    }

    return (
        <>
            <div>
                <Button variant="secondary" className={`default-btn dark-btn mb-2 rounded-md w-[100%] ${id === 'profile' && "dark-btn-active"}`} onClick={() => {changeMenu('profile');}}>
                    <SvgProfile width={30}></SvgProfile>Profile
                </Button>
            </div>
            <div>
                <Button variant="secondary" className={`default-btn dark-btn mb-2 rounded-md w-[100%] ${id === 'referrals' && "dark-btn-active"}`} onClick={() => {changeMenu('referrals')}}>
                    <SvgReferral></SvgReferral>
                    Referrals
                </Button>
            </div>
            <div>
                <Button variant="secondary" className={`default-btn dark-btn mb-2 rounded-md w-[100%] ${id === 'deposits' && "dark-btn-active"}`} onClick={() =>{changeMenu('deposits/btc');}}>
                    <SvgDeposit></SvgDeposit>
                    Deposits
                </Button>
            </div>
            <div>
                <Button variant="secondary" className={`default-btn dark-btn mb-2 rounded-md w-[100%] ${id === 'withdrawals' && "dark-btn-active"}`} onClick={() => {changeMenu('withdrawals/btc');}}>
                    <SvgDeposit></SvgDeposit>
                    Withdrawals
                </Button>
            </div>
            <div>
                <Button variant="secondary" className={`default-btn dark-btn mb-2 rounded-md w-[100%] ${id === 'settings' && "dark-btn-active"}`} onClick={() => {changeMenu('settings');}}>
                    <SvgSetting></SvgSetting>   
                    Settings
                </Button>
            </div>
            <div>
                <Button variant="secondary" className='default-btn dark-btn mb-2 rounded-md w-[100%]' onClick={logoutHandler}>
                    <SvgLogout></SvgLogout>
                    Log out
                </Button>
            </div>
        </>
    );
}
  
export default Lists;