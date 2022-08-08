import React from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector} from "react-redux";
import { SET_SELECTION_CASHIER_TYPE } from "../../configs";

function CashierType() {
    const dispatch = useDispatch();

    const { selectionCashierType } = useSelector(state => state.cashier);

    const selectCashierType = (type) => {
        dispatch({ type: SET_SELECTION_CASHIER_TYPE, payload: type})
    }

    // useEffect(() => {
    //     alert(selectionCashierType);
    // }, [])

    return (
        <>
            <Button variant="secondary" className={`default-btn cashier-btn-tab ${selectionCashierType === 'deposit' && "cryptotype-btn-select"}`} onClick={() => selectCashierType('deposit')}>DEPOSIT</Button>
            <Button variant="secondary" className={`default-btn cashier-btn-tab ${selectionCashierType === 'withdraw' && "cryptotype-btn-select"}`} onClick={() => selectCashierType('withdraw')}>WITHDRAW</Button>
            {/* <Button variant="secondary" className={`default-btn ${selectionCashierType === 'coupons' && "cryptotype-btn-select"}`} onClick={() => selectCashierType('coupons')}>COUPONS</Button>
            <Button variant="secondary" className={`default-btn ${selectionCashierType === 'referrals' && "cryptotype-btn-select"}`} onClick={() => selectCashierType('referrals')}>REFERRALS</Button> */}
        </>
    );
}
  
export default CashierType;