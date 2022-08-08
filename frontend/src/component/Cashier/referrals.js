import React from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector} from "react-redux";
import { SET_SELECTION_CASHIER_TYPE } from "../../configs";

function Referrals() {
    const dispatch = useDispatch();

    const { selectionCashierType } = useSelector(state => state.account);

    const selectCryptoType = (type) => {
        dispatch({ type: SET_SELECTION_CASHIER_TYPE, payload: type})
    }

    useEffect(() => {
        // alert(selectionCashierType);
    }, [])

    return (
        <>
            Referrals
        </>
    );
}
  
export default Referrals;