import React from 'react';
import bitcoinimg from './../../assets/img/bitcoin.png';

function BtcCard(props) {
    // const [register, setRegister] = useState(false)

    // useEffect(() => {
    //     //componentWillmount
    // }, [])

    return (
        <div className='crypto-card' onClick={props.onClick}>
            <div className='flex justify-center h-[75px]'>
                <div className='items-center self-center'>
                    <img src={bitcoinimg} alt="Bitcoin" className="min-w-[50px] w-[50px]"/>
                </div>
            </div>
            <div className='mt-2 card-description whitespace-nowrap'>
                Bitcoin [BTC]
            </div>
        </div>
    );
}
  
export default BtcCard;