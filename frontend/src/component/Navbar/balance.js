import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import coin from './../../assets/img/coin.webp';

function Balance() {
    const [balance, setBalance] = useState()
    const { userInfo } = useSelector((state) => state.userLogin);
    const userBalance = useSelector((state) => state.userBalance);
    const { balanceInfo } = userBalance;

    useEffect(() => {
        if(balanceInfo != undefined)
            setBalance(Intl.NumberFormat().format(balanceInfo.balance));
    }, [balanceInfo])

    useEffect(()=>{
        if(userInfo) {
            setBalance(Intl.NumberFormat().format(userInfo.balance));
        }
    }, [])

    return (
        <div className='rounded-2 mr-4 items-center bg-[#10121B] flex max-h-[42px] w-[100px] justify-center'>
            <div className="mr-[10px] max-w-[20px]">
                <img src={coin} alt="Coin"/>
            </div>
            <div>
                ${balance == 0 ? '0.00' : balance}
            </div>
        </div>
    );
}
  
export default Balance;