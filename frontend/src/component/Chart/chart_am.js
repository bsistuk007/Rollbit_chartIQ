import React, { useEffect, useRef, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5themesAnimated from "@amcharts/amcharts5/themes/Animated";
import am5themesResponsive from "@amcharts/amcharts5/themes/Responsive";
import { ChartData } from "./mock"
import { useSelector } from 'react-redux';

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
    // setHeight(ref.current.offsetHeight);
    const root = am5.Root.new("chartdiv");
    root.setThemes([
      am5themesAnimated.new(root),
      am5themesResponsive.new(root)
    ]);
    root.interfaceColors.set("grid", am5.color(0xFFFFFF));
    root.interfaceColors.set("text", am5.color(0xFFFFFF));
    root.interfaceColors.set("secondaryButtonText", am5.color(0xFFFFFF));
    root.interfaceColors.set("background", am5.color(0x212B36));
    const stockChart = root.container.children.push(
      am5stock.StockChart.new(root, {})
    );
    root.numberFormatter.set("numberFormat", "#,###.00");

    // Create a main stock panel (chart)
    const mainPanel = stockChart.panels.push(
      am5stock.StockPanel.new(root, {
        wheelY: "zoomX",
        panX: true,
        panY: true
      })
    );

    const valueAxis = mainPanel.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          pan: "zoom",
        }),
        extraMin: 0.1, // adds some space for for main series
        tooltip: am5.Tooltip.new(root, {}),
        numberFormat: "#,###.00",
        extraTooltipPrecision: 2
      })
    );
    const dateAxis = mainPanel.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        baseInterval: {
          timeUnit: "minute",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      })
    );
    
    // add range which will show current value
    const currentValueDataItem = valueAxis.createAxisRange(valueAxis.makeDataItem({ value: 0 }));
    const currentLabel = currentValueDataItem.get("label");
    if (currentLabel) {
      currentLabel.setAll({
        fill: am5.color(0xffffff),
        background: am5.Rectangle.new(root, { fill: am5.color(0x000000) })
      })
    }
    
    const currentGrid = currentValueDataItem.get("grid");
    if (currentGrid) {
      currentGrid.setAll({ strokeOpacity: 0.5, strokeDasharray: [2, 5] });
    }

    const valueSeries = mainPanel.series.push(
      am5xy.CandlestickSeries.new(root, {
        name: "USDT/BUSD",
        clustered: false,
        valueXField: "Date",
        valueYField: "Close",
        highValueYField: "High",
        lowValueYField: "Low",
        openValueYField: "Open",
        calculateAggregates: true,
        xAxis: dateAxis,
        yAxis: valueAxis,
        legendValueText:
          "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
        legendRangeValueText: ""
      })
    );
    valueSeries.set("fill", am5.color(0xff0000));
    // Set main value series
    stockChart.set("stockSeries", valueSeries);

    // Add a stock legend
    const valueLegend = mainPanel.plotContainer.children.push(
      am5stock.StockLegend.new(root, { stockChart })
    );

    // Set main series
    valueLegend.data.setAll([valueSeries]);

    // Add cursor(s)
    mainPanel.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        yAxis: valueAxis,
        xAxis: dateAxis,
        snapToSeries: [valueSeries],
        snapToSeriesBy: "y!"
      })
    );

    // Data generator
    const firstDate = new Date();
    let lastDate;
    let value = 1200;

    // set data to all series
    valueSeries.data.setAll(ChartData);

    // update data
    let previousDate;

    setInterval(() => {
      const valueSeries = stockChart.get("stockSeries");
      const date = Date.now();
      const lastDataObject = valueSeries.data.getIndex(valueSeries.data.length - 1);
      if (lastDataObject) {
        let previousDate = lastDataObject.Date;
        const previousValue = lastDataObject.Close;
    
        value = am5.math.round(previousValue + (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2, 2);
    
        let high = lastDataObject.High;
        let low = lastDataObject.Low;
        let open = lastDataObject.Open;
    
        if (am5.time.checkChange(date, previousDate, "minute")) {
          open = value;
          high = value;
          low = value;
    
          const dObj1 = {
            Date: date,
            Close: value,
            Open: value,
            Low: value,
            High: value
          };
    
          valueSeries.data.push(dObj1);
          previousDate = date;
        } else {
          if (value > high) {
            high = value;
          }
    
          if (value < low) {
            low = value;
          }
    
          const dObj2 = {
            Date: date,
            Close: value,
            Open: open,
            Low: low,
            High: high
          };
    
          valueSeries.data.setIndex(valueSeries.data.length - 1, dObj2);
        }
        // update current value
        if (currentLabel) {
          currentValueDataItem.animate({ key: "value", to: value, duration: 500, easing: am5.ease.out(am5.ease.cubic) });
          currentLabel.set("text", stockChart.getNumberFormatter().format(value));
          const bg = currentLabel.get("background");
          if (bg) {
              if(value < open){      
                bg.set("fill", root.interfaceColors.get("negative"));
              }
              else{
                bg.set("fill", root.interfaceColors.get("positive"));
              }
          }
        }
      }
    }, 1000);

    return () => {
      root.dispose();
    }

  }, [ref.current])
  

    return (
        <>
          <div id="chartdiv" >
          </div>
        </>
    );
}
  
export default TradingChart;