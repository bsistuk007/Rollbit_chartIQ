import React from 'react';
import SvgDeposit from '../Svg/svgdeposit';
import CryptoTypes from './cryptotypes';
import TransactionHistory from './transactionhistory';

function Deposits() {
    // const [register, setRegister] = useState(false)

    // useEffect(() => {
    //     //componentWillmount
    // }, [])

    return (
        <>
            <div className='uppercase italic flex mb-4 '>
                <SvgDeposit></SvgDeposit>
                Deposits
            </div>
            <div>
                <CryptoTypes></CryptoTypes>
            </div>
            <div>
                <TransactionHistory></TransactionHistory>
            </div>
        </>
    );
}
  
export default Deposits;