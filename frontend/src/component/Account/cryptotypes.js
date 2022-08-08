import React from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector} from "react-redux";
import { SET_SELECTION_ACCOUNT_CRYPTO } from "../../configs";

function CryptoTypes() {
    const dispatch = useDispatch();
    const history = useHistory();
    let { id, type } = useParams();

    // const { accountSelectionCryptoType } = useSelector(state => state.account);

    // const selectCryptoType = (type) => {
    //     dispatch({ type: SET_SELECTION_ACCOUNT_CRYPTO, payload: type})
    // }

    useEffect(() => {
        // alert(history.location.pathname);
    }, [])

    const changeMenu = (url) => {
        history.push(`/account/${id}/${url}`);
    }


    return (
        <>
            <Button variant="secondary" className={`default-btn cryptotype-btn ${type === 'btc' && "cryptotype-btn-select"}`} onClick={() => {changeMenu('btc')}}>BTC</Button>
            <Button variant="secondary" className={`default-btn cryptotype-btn ${type === 'eth' && "cryptotype-btn-select"}`} onClick={() => {changeMenu('eth')}}>ETH</Button>
            {/* <Button variant="secondary" className={`default-btn cryptotype-btn ${type === 'ltc' && "cryptotype-btn-select"}`} onClick={() => {changeMenu('ltc')}}>LTC</Button> */}
            <Button variant="secondary" className={`default-btn cryptotype-btn ${type === 'sol' && "cryptotype-btn-select"}`} onClick={() => {changeMenu('sol')}}>SOL</Button>
            {/* <Button variant="secondary" className={`default-btn cryptotype-btn ${type === 'rlb' && "cryptotype-btn-select"}`} onClick={() => {changeMenu('rlb')}}>RLB</Button>
            <Button variant="secondary" className={`default-btn cryptotype-btn ${type === 'nft' && "cryptotype-btn-select"}`} onClick={() => {changeMenu('nft')}}>NFT</Button> */}
        </>
    );
}
  
export default CryptoTypes;