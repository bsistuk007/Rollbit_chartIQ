import React from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector} from "react-redux";
import { SET_SELECTION_CASHIER_TYPE } from "../../configs";
import Coupons from './coupons';
import DepositOptions from './depostioptions';
import Referrals from './referrals';
import WithdrawOptions from './withdrawoptions';

function CashierContent(props) {
    const dispatch = useDispatch();

    const { selectionCashierType } = useSelector(state => state.cashier);

    return (
        <div className='pt-4'>
            {selectionCashierType === "deposit" && <DepositOptions></DepositOptions>}
            {selectionCashierType === "withdraw" && <WithdrawOptions></WithdrawOptions>}
            {selectionCashierType === "coupons" && <Coupons></Coupons>}
            {selectionCashierType === "referrals" && <Referrals></Referrals>}
        </div>
    );
}
  
export default CashierContent;