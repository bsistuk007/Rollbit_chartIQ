import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { SET_PROFILE, SET_SELECTION_ACCOUNT } from "../../configs";
import SvgDeposit from '../Svg/svgdeposit';
import SvgLogout from '../Svg/svglogout';
import SvgProfile from '../Svg/svgprofile';
import SvgReferral from '../Svg/svgreferral';
import SvgSetting from '../Svg/svgsetting';
import defaultAvatar from './../../assets/img/default-avatar.svg';
import { logout } from './../../actions/userActions';

function MainDropDown(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {id, type} = useParams();

  // const { accountSelectionType } = useSelector(state => state.account);

  const logoutHandler = () => {
    dispatch(logout());
    // dispatch({type: SET_PROFILE, payload: false});
    // dispatch({type: SET_SELECTION_ACCOUNT, payload: false});
    // localStorage.setItem('loginFlag', false);
    // history.push(`/`);
  }

  // const showProfile = (type) => {
  //   dispatch({type: SET_SELECTION_ACCOUNT, payload: type});
  // }

  const changeMenu = (url) => {
    history.push(`/account/${url}`);
  }

  return (
    <>
      <Dropdown size="lg">
        {props.type === 'normal' ?
              (<Dropdown.Toggle className='default-btn default-dropdown-btn' size="lg" id="maindropdown-button" variant="secondary">
                <img src={defaultAvatar} className="w-[20%] h-[70%] rounded-[999px] mr-6"/>
                <div>
                  <div>
                    Main&nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className='w-[100%] h-[5px] rounded-[99px] main-bar'>

                  </div>
                  </div>
                {/* </div> */}
              </Dropdown.Toggle>) :
              (
                <Dropdown.Toggle className='default-btn' variant="secondary">
                  <SvgProfile width={20}></SvgProfile>
                </Dropdown.Toggle>
              )
        
      }
        
        <Dropdown.Menu variant="dark p-3 bg-[#1F2330]">
          <Dropdown.Item className={`default-btn default-dropdown-btn-list my-2 mx-1 ${id === 'profile' && "yellow-text"}`} onClick={() => {changeMenu('profile');}}>
            <SvgProfile width={30}></SvgProfile>
            Profile
          </Dropdown.Item>
          <Dropdown.Item className={`default-btn default-dropdown-btn-list my-2 mx-1 ${id === 'referrals' && "yellow-text"}`} onClick={() => {changeMenu('referrals');}}>
            <SvgReferral></SvgReferral>
            Referrals
          </Dropdown.Item>
          <Dropdown.Item className={`default-btn default-dropdown-btn-list my-2 mx-1 ${id === 'deposits' && "yellow-text"}`} onClick={() => {changeMenu('deposits/btc');}}>
            <SvgDeposit></SvgDeposit>
            Deposits
          </Dropdown.Item>
          <Dropdown.Item className={`default-btn default-dropdown-btn-list my-2 mx-1 ${id === 'withdrawals' && "yellow-text"}`} onClick={() => {changeMenu('withdrawals/btc')}}>
            <SvgDeposit></SvgDeposit>
            Withdrawals
          </Dropdown.Item>
          <Dropdown.Item className={`default-btn default-dropdown-btn-list my-2 mx-1 ${id === 'settings' && "yellow-text"}`} onClick={() => {changeMenu('settings')}}>
            <SvgSetting></SvgSetting>
            Settings
          </Dropdown.Item>
          <Dropdown.Item className='default-btn default-dropdown-btn-list my-2 mx-1' onClick={logoutHandler}>
            <SvgLogout></SvgLogout>
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default MainDropDown;