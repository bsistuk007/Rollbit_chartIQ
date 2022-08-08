import React, { useEffect, useState } from 'react';
import Chart from "@chartiq/react-components"
// import ActiveTrader from "@chartiq/react-components/ActiveTrader";


// import 'chartiq/plugins/activetrader/cryptoiq';
import './chartiq-custom.css';

function TradingChart() {
  const [period, setPeriod] = useState();

  const chartConfig = {
                        initialSymbol: 'BTC',
                        menuChartStyle: [
                          { type: "radio", label: "Line", cmd: "Layout.ChartType()", iconCls: "line", value: "line" },
                          { type: "radio", label: "Candle", cmd: "Layout.ChartType()", iconCls: "candle", value: "candle"},
                        ],
                        
                      };
  useEffect(()=> {
    // let stxx = new CIQ.ChartEngine({
    //                       container: document.querySelector(".chartContainer")
    //                   });
    // console.log("stxx ", stxx);
    // console.log("symbol ",stxx.getSymbols())
  }, []);

  const initChart = ({ chartEngine })=> {
    chartEngine.setChartType("line")
    chartEngine.setLineStyle({ color: "yellow" })
    chartEngine.setPeriodicity({ period: 1, timeUnit: "tick" });
  }

	// return <Chart chartInitialized={initChart} />
	return <Chart chartInitialized={initChart}/>
	// return <ActiveTrader />
}
export default TradingChart;