import React, { useEffect } from 'react';
import Chart from "@chartiq/react-components"
import './chartiq-custom.css';
import { useSelector } from 'react-redux';

function TradingChart() {

  //coinPrice is updated every second.
  //I have to integrate that coinPrice and Chart Value
  const coinPrice = useSelector((state) => state.coinPrice);
  const { bitcoinPrice, ethereumPrice, solanaPrice, apePrice, adaPrice } = coinPrice;  

  const initChart = ({ chartEngine })=> {
    chartEngine.setChartType("line")
    chartEngine.setLineStyle({ color: "yellow" })
    chartEngine.setPeriodicity({ period: 1, timeUnit: "tick" });
    // setInterval(()=>{
    //   setUpdateValue(chartEngine);
     
    //   // chartEngine.updateChartData(
    //   //   { Last: bitcoinPrice, Volume: 100, DT: new Date() },
    //   //   null,
    //   //   { fillGaps: true }
    //   // );
    // }, 1000)
  }
  
  function setUpdateValue(chartEngine) {
    var value = Math.random() * 100;
    console.log("value ", value);
    console.log(Date.now());
    chartEngine.updateChartData(
        { Last: value, Volume: 100, DT: Date.now() },
        null,
        { fillGaps: true }
    );
  }

  useEffect(()=> {
    //I think I have to write code here.
  }, [coinPrice]);


	return <Chart chartInitialized={initChart}/>
}
export default TradingChart;