import React from 'react';
import metamaskImg from './../../assets/img/metamask.png'

function SvgMetamask() {
    // const [register, setRegister] = useState(false)

    // useEffect(() => {
    //     //componentWillmount
    // }, [])

    return (
        <div className='w-[30px] flex'>
            <img src={metamaskImg} className="w-[18px] max-w-[18px] h-auto"/>
        </div> 
    );
}
  
export default SvgMetamask;