import React from 'react';
import solanaimg from './../../assets/img/solana.png';

function SolCard(props) {
    // const [register, setRegister] = useState(false)

    // useEffect(() => {
    //     //componentWillmount
    // }, [])

    return (
        <div className='crypto-card' onClick={props.onClick}>
            <div className='flex justify-center h-[75px]'>
                <div className='items-center self-center'>
                    <img src={solanaimg} alt="Bitcoin" className="min-w-[50px] w-[50px] rounded-full"/>
                </div>
            </div>
            <div className='mt-2 card-description whitespace-nowrap'>
                Solana [SOL]
            </div>
        </div>
    );
}
  
export default SolCard;