import React from 'react';

function SvgRollbitCoin(props) {
    // const [register, setRegister] = useState(false)

    // useEffect(() => {
    //     //componentWillmount
    // }, [])

    return (
        <div className={`w-[${props.width}px] flex`}>
            <svg width={`${props.width}px`} height={`${props.width}px`} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" size="50" className="css-jaiznb"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(-263.000000, -203.000000)"><g transform="translate(263.000000, 203.000000)"><rect fill="#FEA101" fillRule="nonzero" x="0" y="0" width="128" height="128" rx="64"></rect><path d="M105.5,64 C105.5,44.9462 90.0413,29.5 70.972,29.5 C70.082,29.5 69.1998,29.5336 68.3267,29.5997 L16,31.9643 L51.6073,35.4325 L51.5869,35.4463 L64.3131,36.4 L49.998,36.5924 C45.7522,39.8412 42.2832,44.0528 39.9178,48.9007 L27.0983,50.4464 L38.6251,51.906 C37.215,55.6695 36.444,59.7448 36.444,64 C36.444,68.2552 37.215,72.3305 38.6251,76.094 L27.0983,77.5536 L39.9178,79.0993 C42.2825,83.9458 45.7501,88.1563 49.9943,91.4047 L64.3131,91.5999 L51.5868,92.5536 C51.5936,92.5582 51.6005,92.5628 51.6073,92.5675 L16,96.0357 L68.3267,98.4003 C69.1998,98.4664 70.082,98.5 70.972,98.5 C90.0413,98.5 105.5,83.0538 105.5,64 Z M58.024,64 C58.024,71.1452 63.821,76.9375 70.972,76.9375 C78.123,76.9375 83.92,71.1452 83.92,64 C83.92,56.8548 78.123,51.0625 70.972,51.0625 C63.821,51.0625 58.024,56.8548 58.024,64 Z" fill="#FFFFFF"></path></g></g></g></svg>
        </div>
    );
}
  
export default SvgRollbitCoin;