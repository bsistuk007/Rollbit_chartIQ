import React from "react";
import './slider.css';

function Slider() {
    // const multiplierValue = 
    const sliderStepValue = [1,2,5,10,20,50,100,200,500,1000];
    const sliderChange = (e) => {
        let multiplierValue = sliderStepValue[e.target.value];
        console.log(multiplierValue);
    }
    // const wagerChange=(e) => {
    //     // var regex = /^\d{1,4}(?:\.\d{0,3})?$/;
    //     const re = /^[0-9.,\b]+$/;
    //     if (e.target.value === '' || re.test(e.target.value)) {
    //         console.log(e.target.value);
    //         console.log(numeral(e.target.value).format('0,0.00'))
    //         setWager(numeral(e.target.value).format('0,0'));
    //     } 
    // }

    return (
            <div className="slidecontainer">
                <input type="range" min="0" max="9" className="slider" id="myRange" onChange={e=>sliderChange(e)}/>
                <div className="flex justify-between">
                    <div>x1 · <span className="text-[#72F238]">Safe</span></div>
                    <div><span className="text-[#FF4949]">Wild</span> · x1000</div>
                </div>
            </div>
    )
}

export default Slider