import React from 'react';
import SvgRollbitCoin from '../Svg/svgrollbitcoin';

function RlbCard(props) {
    // const [register, setRegister] = useState(false)

    // useEffect(() => {
    //     //componentWillmount
    // }, [])

    return (
        <div className='crypto-card' onClick={props.onClick}>
            <div className='flex justify-center h-[75px]'>
                <div className='items-center self-center'>
                    <SvgRollbitCoin width={50}></SvgRollbitCoin>
                </div>
            </div>
            <div className='mt-2 card-description'>
                Rollbit Coin [RLB]
            </div>
        </div>
    );
}
  
export default RlbCard;