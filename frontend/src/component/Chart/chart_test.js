
import React, { useEffect, useRef, useState } from 'react';
// import {Chart} from 'chart.js';
import { Line } from "react-chartjs-2";
import ChartStreaming from 'chartjs-plugin-streaming';

import moment from "moment";
import { useSelector } from 'react-redux';

Line.register(ChartStreaming);
// const Chart = require("react-chartjs-2").Chart;


const chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)"
  };
  
//   const color = Chart.helpers.color;

  const data = {
    datasets: [
      {
        label: "Dataset 1 (linear interpolation)",
        // backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false,
        lineTension: 0,
        data: []
      }
    ]
  };

  const options = {
    // elements: {
    //   line: {
    //     tension: 1
    //   }
    // },
    scales: {
        x: {
            type: 'realtime',
            realtime: {
              onRefresh: function(chart) {
                chart.data.datasets.forEach(function(dataset) {
                  dataset.data.push({
                    x: Date.now(),
                    y: Math.random()
                  });
                });
              }
            }
          }
    
    }
  };
function TradingChart() {
  const coinPrice = useSelector((state) => state.coinPrice);
  const { bitcoinPrice, ethereumPrice, solanaPrice, apePrice, adaPrice } = coinPrice;
  const { selectionCoinType } = useSelector(state => state.coin);
  const [selectionCoinPrice, setSelectionCoinPrice] = useState();
  const [height, setHeight] = React.useState(0);
  const ref = useRef(null);

  useEffect(() => {
    switch(selectionCoinType) {
        case "BTC":
            setSelectionCoinPrice(bitcoinPrice);
            break;
        case "ETH":
            setSelectionCoinPrice(ethereumPrice);
            break;
        case "SOL":
            setSelectionCoinPrice(solanaPrice);
            break;
        case "APE":
            setSelectionCoinPrice(apePrice);
            break;
        case "ADA":
            setSelectionCoinPrice(adaPrice);
            break;
        default:
            break;
    }
  }, [selectionCoinType, coinPrice])

  useEffect(() => {

  }, [])

  

    return (
        <>
          <Line data={data} options={options} />
        </>
    );
}
  
export default TradingChart;