import React from 'react';
import litecoinimg from './../../assets/img/litecoin.png';

function LtcCard(props) {
    // const [register, setRegister] = useState(false)

    // useEffect(() => {
    //     //componentWillmount
    // }, [])

    return (
        <div className='crypto-card' onClick={props.onClick}>
            <div className='flex justify-center h-[75px]'>
                <div className='items-center self-center'>
                    <img src={litecoinimg} alt="Bitcoin" className="min-w-[50px] w-[50px]"/>
                </div>
            </div>
            <div className='mt-2 card-description'>
                Litecoin [LTC]
            </div>
        </div> 
    );
}
  
export default LtcCard;