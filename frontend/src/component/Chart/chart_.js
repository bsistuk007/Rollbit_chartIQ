import React, { useEffect, useState } from 'react';
import Chart from "@chartiq/react-components"
// import { default as Chart } from "@chartiq/react-components/src/Chart";
// import CIQ from "chartiq/js/componentUI";

// import ActiveTrader from "@chartiq/react-components/ActiveTrader";


// import 'chartiq/plugins/activetrader/cryptoiq';
import './chartiq-custom.css';
import { useSelector } from 'react-redux';

function TradingChart() {
  const [period, setPeriod] = useState();
  const [stxx, setChartIQSTX] = useState();
  const coinPrice = useSelector((state) => state.coinPrice);
  const { bitcoinPrice, ethereumPrice, solanaPrice, apePrice, adaPrice } = coinPrice;
  const sampleData = [{"Date":"2015-04-16 16:00","Open":152.13,"High":152.19,"Low":152.08,"Close":152.11,"Volume":4505569},
  {"Date":"2015-04-17 09:30","Open":151.76,"High":151.83,"Low":151.65,"Close":151.79,"Volume":2799990},
  {"Date":"2015-04-17 09:35","Open":151.79,"High":151.8,"Low":151.6,"Close":151.75,"Volume":1817706},
  {"Date":"2015-04-17 09:40","Open":151.74,"High":151.96,"Low":151.74,"Close":151.84,"Volume":2127911}];
  // const quotefeed = {};
  // quotefeed.url = 'https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT"]';
  // const chartConfig = {
  //                       initialSymbol: 'BTCUSD',
  //                       menuChartStyle: [
  //                         { type: "radio", label: "Line", cmd: "Layout.ChartType()", iconCls: "line", value: "line" },
  //                         { type: "radio", label: "Candle", cmd: "Layout.ChartType()", iconCls: "candle", value: "candle"},
  //                       ],
                        
  //                     };

  // quotefeed.translate = (response, cb) => {
  //   var lines = response;
  //   var newQuotes = [];
  //   for (var i = 0; i < lines.length; i++) {
  //     var fields = lines[i];
  //     newQuotes[i] = {};
  //     newQuotes[i].Date = new Date(); // Or set newQuotes[i].DT if you have a JS Date
  //     newQuotes[i].Open = fields.Open;
  //     newQuotes[i].High = fields.High;
  //     newQuotes[i].Low = fields.Low;
  //     newQuotes[i].Close = fields.Close;
  //     newQuotes[i].Volume = fields.Volume;
  //   }
  //   return newQuotes;
  // };

  // quotefeed.fetchInitialData = (symbol, startDate, endDate, params, cb) => {
  //   // // var newQuotes = this.translate(sampleData);
  //   // console.log("fetchInitialData");
  //   // cb({ quotes: quotefeed.translate(sampleData) });

  //   var url = this.url + "?symbol" + symbol;
  //   url += "&interval=" + params.interval;
  //   url += "&period=" + params.period;
  //   url += "&startDate=" + startDate;
  //   url += "&endDate" + endDate;

  //   // CIQ.postAjax(url, null, function(status, response) {
  //   //   // process the HTTP response from the datafeed
  //   //   if (status == 200) {
  //   //     // if successful response from datafeed
  //   //     newQuotes = this.translate(response);
  //   //     cb({ quotes: newquotes });
  //   //   } else {
  //   //     // else error response from datafeed
  //   //     cb({ error: status });
  //   //   }
  //   //   return;
  //   // }); 
  // };
  
  // quotefeed.fetchUpdateData = (symbol, startDate, params, cb) => {
  //   console.log("fetchUpdateData", quotefeed.translate(sampleData));
  //   // var newQuotes = this.translate(sampleData);
  //   cb({ quotes: quotefeed.translate(sampleData) });
    
  // };
  
  // quotefeed.fetchPaginationData = (symbol, startDate, endDate, params, cb) => {
  //   console.log("fetchPaginationData");
  //   // var newQuotes = this.translate(sampleData);
  //   cb({ quotes: quotefeed.translate(sampleData) });
  // };

  const initChart = ({ chartEngine })=> {
    chartEngine.setChartType("line")
    chartEngine.setLineStyle({ color: "yellow" })
    chartEngine.setPeriodicity({ period: 1, timeUnit: "tick" });
    setInterval(()=>{
      var value = Math.random() * 1000;
      console.log(new Date());
      // chartEngine.updateChartData();

      // chartEngine.updateChartData(
      //   { Last: bitcoinPrice, Volume: 100, DT: new Date() },
      //   null,
      //   { fillGaps: true }
      // );
    }, 3000)

    // setInterval(()=>{
    //   chartEngine.updateChartData(
    //     { Last: bitcoinPrice, Volume: 100, DT: new Date() },
    //     null,
    //     { fillGaps: true }
    //   );
    // }, 3000)
    // chartEngine.attachQuoteFeed(quotefeed, {refreshInterval : 1});
  }

  useEffect(()=> {
    // const chartEngine = new CIQ.ChartEngine({
    //   container: document.querySelector(".chartContainer")
    // });
    // setChartIQSTX(chartEngine);
    
    // stxx.loadChart("SPY", {
    //   masterData: sample5min,
    //   periodicity: {
    //     period: 1,
    //     interval: 5,
    //     timeUnit: "minute"
    //   }
    // });    
  }, []);

  // useEffect(() => {
  //   if(stxx) {
  //     console.log('update ', stxx)
  //     stxx.updateChartData(
  //       { Last: bitcoinPrice, Volume: 100, DT: new Date() },
  //       null,
  //       { fillGaps: true }
  //     );
  //   }
  // }, [bitcoinPrice])


  return <Chart chartInitialized={initChart}/>
}
export default TradingChart;