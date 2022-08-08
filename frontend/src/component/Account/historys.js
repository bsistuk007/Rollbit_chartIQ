import React, { useEffect } from 'react';
import SvgDeposit from '../Svg/svgdeposit';
import CryptoTypes from './cryptotypes';
import TransactionHistory from './transactionhistory';

function Historys(props) {
    // const [register, setRegister] = useState(false)
    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <div>
            
            <div className='uppercase italic flex mb-4 '>
                <SvgDeposit></SvgDeposit>
            </div>
            <div>
                <CryptoTypes></CryptoTypes>
            </div>
            <div>
                <TransactionHistory {...props}></TransactionHistory>
            </div>
        </div>
        // <>
        //     <div>
        //         <CryptoTypes></CryptoTypes>
        //     </div>
        //     <div>
        //         <TransactionHistory {...props}></TransactionHistory>
        //     </div>
        // </>
    );
}
  
export default Historys;