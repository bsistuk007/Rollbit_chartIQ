import React, { useEffect } from "react";
import './progressbar.css';

function ProgressBar() {
    
    useEffect(()=>{
        var i = 1;
        var elem = document.getElementById("myBar");
        var width = 0.1;
        var id = setInterval(frame, 10);
        function frame() {
          if (width >= 100) {
            clearInterval(id);
            i = 0;
          } else {
            width = width + 0.14;
            elem.style.width = width + "%";
          }
        }
    }, [])

    return (
        <div id="myProgress">
            <div id="myBar"></div>
        </div>
    )
}

export default ProgressBar;