import React from 'react';
import SvgNft from '../Svg/svgnft';

function NftCard(props) {
    // const [register, setRegister] = useState(false)

    // useEffect(() => {
    //     //componentWillmount
    // }, [])

    return (
        <div className='crypto-card' onClick={props.onClick}>
            <div className='flex justify-center h-[75px]'>
                <div className='items-center self-center'>
                    <SvgNft></SvgNft>
                </div>
            </div>
            <div className='mt-2 card-description'>
                NFT
            </div>
        </div>
    );
}
  
export default NftCard;