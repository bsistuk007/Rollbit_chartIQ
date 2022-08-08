import React, {useState} from 'react';

function Cashier() {
    const [cashierModalShow, setCashierModalShow] = useState(false);

    return (
        <div className='pl-5'>
            <button className="default-btn yellow-btn tracking-normal" onClick={() => {setCashierModalShow(true);}}>CASHIER</button>
        </div>
    );
}
  
export default Cashier;