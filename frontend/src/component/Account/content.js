import React from 'react';
import { useSelector } from 'react-redux';
import SvgDeposit from '../Svg/svgdeposit';
import SvgProfile from '../Svg/svgprofile';
import SvgReferral from '../Svg/svgreferral';
import SvgSetting from '../Svg/svgsetting';
import Historys from './historys';
import Profile from './profile';
import Referrals from './referrals';
import Settings from './settings';
// import Withdrawals from './withdrawals';

function Content() {
    const { accountSelectionType } = useSelector(state => state.account);

    // const [register, setRegister] = useState(false)

    // useEffect(() => {
    //     //componentWillmount
    // }, [])

    return (
        <>
            <div className='text-lg ml-2'>
                <div className='uppercase italic flex mb-4 '>
                    {accountSelectionType === "profile" && <SvgProfile></SvgProfile>}
                    {accountSelectionType === "referrals" && <SvgReferral></SvgReferral>}
                    {accountSelectionType === "deposits" && <SvgDeposit></SvgDeposit>}
                    {accountSelectionType === "withdrawals" && <SvgDeposit></SvgDeposit>}
                    {accountSelectionType === "settings" && <SvgSetting></SvgSetting>}
                    {accountSelectionType}
                </div>
                {accountSelectionType === "profile" && <Profile></Profile>}
                {accountSelectionType === "referrals" && <Referrals></Referrals>}
                {accountSelectionType === "deposits" && <Historys type="deposits"></Historys>}
                {accountSelectionType === "withdrawals" && <Historys type="withdrawals"></Historys>}
                {accountSelectionType === "settings" && <Settings></Settings>}
            </div> 
        </>
    );
}
  
export default Content;