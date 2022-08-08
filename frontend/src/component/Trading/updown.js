import React from "react";
import SvgDown from "../Svg/svgdown";
import SvgUp from "../Svg/svgup";

function UpDown(props) {
    let width = props.width ? props.width : "16"; 
    return (
        <>
            {
                props.state === "up" ? (
                    <svg width="8" height="10" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg" color={`#72f238`} size="16" className={`fill-current w-[${width}px] min-w-[${width}px] h-auto`}><path d="M8 5.551L4 2.643 0 5.551V2.908L4 0l4 2.908V5.55zM8 10L4 7.092 0 10V7.357l4-2.908 4 2.908V10z" fill="currentColor" fillRule="evenodd"></path></svg>

                ) : (
                    <svg width="8" height="10" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg" color={`#FF4949`} size="16" className={`fill-current w-[${width}px] min-w-[${width}px] h-auto`}><path d="M8 4.449L4 7.357 0 4.449v2.643L4 10l4-2.908V4.45zM8 0L4 2.908 0 0v2.643l4 2.908 4-2.908V0z" fill="currentColor" fillRule="evenodd"></path></svg>
                )
            }
        </>
    );
}

export default UpDown;