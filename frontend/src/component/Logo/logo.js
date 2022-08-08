import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from './../../assets/img/Logo.png';
import smallLogo from './../../assets/img/small-logo.svg';

function Logo() {
    const history = useHistory();
    
    const changeMenu = () => {
        history.push(`/`);
    }

    return (
        <>
            <div className='hidden cursor-pointer sm:block'>
                <img src={logo} alt="Logo" className='logo-img' onClick={() => {changeMenu()}}/>
            </div>
            <div className='block cursor-pointer sm:hidden'>
                <img src={smallLogo} alt="Logo" className='pt-3' onClick={() => {changeMenu()}}/>
            </div>
        </>
    );
}
  
export default Logo;