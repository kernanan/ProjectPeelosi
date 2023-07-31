'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react'
//const DynamicBarChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import Chart from 'react-apexcharts'
//import {VictoryArea, VictoryBar, VictoryGroup} from 'victory'
import { IconName } from "react-icons/fa";
import {getMarketData, getTargetData, getStocksBoughtByData} from 'src/app/HardcodedAPICaller'
//import {getMarketData, getTargetData} from 'src/app/APICaller'

var dateOption = '2W'
var targetData = {'name': 'Nancy Pelosi', 'values': [[],[]]}
var stockData = {'ticker': 'META', 'name': 'Meta Platforms Inc.', 'currentValue': '208.12'}
var singleTargetMode = true
var graphData = {'dateOption': '2W',
                 'seriesData': getMarketData('asdf', '2W')['seriesData']}
var secondaryGraphData = {}
var counter = 0

export default function Home() {
  return (
    <div className="homeContainer">
        <div className="mainContainer">
            {projectHeader()}
            <div className="graphModeContainer">
                {graphSwitcher()}
            </div>
            <div className="dataContainer">
                <div className="chartContainer">
                    {stockChart()}
                </div>
                <div className="controlPanelContainer">
                    <div className="stockPanel">
                        <div className="stockInfoRowHead">
                            <h3 className="targetBoxTitle">Stock</h3>
                            {stockSearchBox()}
                        </div>
                        <div className="stockInfoRow">
                            <h3 className="stockBoxCategory">Most Recent Value</h3>
                            {stockWorth()}
                        </div>
                        <div className="stockInfoRow">
                            <h3 className="stockBoxCategory">Ticker</h3>
                            {stockName()}
                        </div>
                        <div className="stockInfoRow">
                            <h3 className="stockBoxCategory">Timeline</h3>
                            {timelineOptions()}
                        </div>
                    </div>
                    {targetSearchBar()}
                </div>
            </div>
        </div>

    </div>
  )
}

function graphSwitcher() {
    const [oneTargetView, setTargetView] = useState(true)

    const switchMode = () => {
        console.log(getStocksBoughtByData('A', 'asdf'))
        if (oneTargetView == true) {
            let next = false
            setTargetView(next)
            singleTargetMode = next
        }
        else {
            let next = true
            setTargetView(next)
            singleTargetMode = next
        }

    }

    if (oneTargetView == true) {
        return(
            <div className="switchGraphText"><b>Switch To: <button className="switchGraphButton" onClick={switchMode}>Multi Target Mode</button></b></div>
        )
    } else {
        return(
            <div className="switchGraphText"><b>Switch To: <button className="switchGraphButton" onClick={switchMode}>Single Target Mode</button></b></div>
        )
    }

}

function countButton() {
    const [count, setCount] = useState(0);

    const handleCount = () => {
        let nextCount = count + 1
        setCount(nextCount)
        counter = nextCount
    }

    return(
        <button className="sampleTargetName" onClick={handleCount}>{counter}</button>
    )
}

function displayButton() {
    return (
        <div className="sampleTargetName">{counter}</div>
    )
}

function timelineOptions() {
    const [stockMarketData, setStockMarketData] = useState([])

    const get2WMarketData = () => {
        let apiResponse = getMarketData('META', '2W')
        let value = apiResponse['currentValue']
        let seriesD = apiResponse['seriesData']
        console.log(seriesD)
        setStockMarketData(seriesD)
        graphData['seriesData'] = seriesD
        stockData['currentValue'] = value
        dateOption = '2W'
    }

    const get1MMarketData = () => {
        let apiResponse = getMarketData('META', '1M')
        let value = apiResponse['currentValue']
        let seriesD = apiResponse['seriesData']
        console.log(seriesD)
        setStockMarketData(seriesD)
        graphData['seriesData'] = seriesD
        stockData['currentValue'] = value
        dateOption = '1M'
    }

    const get1YMarketData = () => {
        let apiResponse = getMarketData('META', '1Y')
        let dateRange = apiResponse['x']
        let marketData = apiResponse['y']
        let value = apiResponse['currentValue']
        console.log(marketData)
        setStockMarketData(marketData)
        graphData['dateRange'] = dateRange
        graphData['stockMarket'] = marketData
        stockData['currentValue'] = value
        dateOption = '1Y'
    }

    const get3YMarketData = () => {
        let apiResponse = getMarketData('META', '3Y')
        let dateRange = apiResponse['x']
        let marketData = apiResponse['y']
        let value = apiResponse['currentValue']
        console.log(marketData)
        setStockMarketData(marketData)
        graphData['dateRange'] = dateRange
        graphData['stockMarket'] = marketData
        stockData['currentValue'] = value
        dateOption = '3Y'
    }

    return (
    <div className="timelineOptionContainer">
        <button className="timelineOption" onClick={get2WMarketData}>2W</button>
        <button className="timelineOption" onClick={get1MMarketData}>1M</button>
        <button className="timelineOption" onClick={get1YMarketData}>1Y</button>
        <button className="timelineOption" onClick={get3YMarketData}>3Y</button>
    </div>
    )
}

function targetSearchBar() {

    const [currentTarget, setCurrentTarget] = useState(" ")

    const handleInputTargetChange = (event) => {
        setCurrentTarget(event.target.value);
    }

    if(!singleTargetMode){
        return (<div></div>)
    }

    const searchForNewTarget = () => {
        let apiResponse = getTargetData(currentTarget, dateOption)
        let buys = apiResponse['buys']
        let sells = apiResponse['sells']
        setCurrentTarget("")
        targetData['name'] = currentTarget
        setTargetBuys(buys)
        setTargetSells(sells)
        console.log(buys)
        graphData['targetBuys'] = buys
        graphData['targetSells'] = sells
    }

    const searchForPelosi = () => {
        let apiResponse = getTargetData("Nancy Pelosi", dateOption)
        let newSeries = {'name': 'Nancy Pelosi', 'values': [apiResponse[0], apiResponse[1]]}
        setCurrentTarget(newSeries)
        targetData = newSeries
    }
    const searchForGarcia = () => {
        let apiResponse = getTargetData("Mike Garcia", dateOption)
        console.log(apiResponse)
        let newSeries = {'name': 'Mike Garcia', 'values': [apiResponse[0], apiResponse[1]]}
        setCurrentTarget(newSeries)
        targetData = newSeries
    }
    const searchForSBuyer = () => {
        let apiResponse = getTargetData("Stephen Buyer", dateOption)
    }

    return (
        <div className="targetPanel">
            <h3 className="targetBoxTitle">Target</h3>
            <button className="sampleTargetName" onClick={searchForPelosi}>Nancy Pelosi</button>
            <button className="sampleTargetName" onClick={searchForGarcia}>Mike Garcia</button>
            <button className="sampleTargetName" onClick={searchForSBuyer}>Stephen Buyer</button>
            <div className="box">
                <form className="searchBox" name="search">
                    <input type="text" className="input" value={currentTarget}
                    onChange={handleInputTargetChange} name="txt" onmouseout="this.value = ''; this.blur();" />
                </form>
                <button className="searchButton" onClick={searchForNewTarget}>Search</button>
            </div>
        </div>

    )
}

function stockSearchBox() {
    const [currentStock, setCurrentStock] = useState("")

    const handleInputStockChange = (event) => {
        setCurrentStock(event.target.value);
    }

    const searchForNewTarget = () => {
        let apiResponse = getMarketData(currentStock, dateOption)
        let value = apiResponse['currentValue']
        let name = apiResponse['name']
        let seriesD = apiResponse['seriesData']
        stockData['ticker'] = currentStock
        setCurrentStock("")
        stockData['name'] = name
        graphData['seriesData'] = seriesD
        stockData['currentValue'] = value
    }

    return (
        <div className="searchBoxHolder">
            <h2 className="tickerName"><b>{stockData['ticker']}</b></h2>
            <div className="box">
            <form className="searchBox" name="search">
                <input type="text" className="input" value={currentStock}
                onChange={handleInputStockChange} name="txt" onmouseout="this.value = ''; this.blur();" />
            </form>
            <button className="searchButton" onClick={searchForNewTarget}>Search</button>
            </div>
        </div>
    )
}

function stockWorth() {
    return (
        <h2 className="stockValue">{stockData['currentValue']}</h2>
    )
}

function stockName() {
    return (
        <h2 className="stockName">{stockData['name']}</h2>
    )
}

function projectHeader() {
    let disname = targetData['name']
    return (
        <div className= "titleContainer">
            <h1 className="projectTitle">You vs Pelosi</h1>
            <h1 className="projectSubHeader"><b>{stockData['ticker']}</b> stocks owned by <b>{disname}</b> against the market</h1>
        </div>
    )
}

function politicianSearchBar() {
    return (
        <div>
            <button>bawls</button>
        </div>
    )
}

function stockChart(){
    if (singleTargetMode == true) {
        var series = [
          {
            name: 'marketData',
            type: 'area',
            data: graphData['seriesData']
          },
          {
            name: 'Target Buys',
            type: "column",
            data: targetData['values'][0],
          },
          {
            name: 'Target Sells',
            type: "column",
            data: targetData['values'][1],
          }
        ];

        var options = {
          chart: {
            id: 'area',
            stacked: false,
            toolbar: {
                show: false,
            }
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1, 2],
            formatter: function(val, opt) {
                if (val != null) {
                    return val
                }
            }
          },
          xaxis: {
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        colors: '#B9B9B9'
                    },
                    datetimeUTC: false,
                },
                type: 'datetime',

          },
          yaxis: [{
                title: {
                    text: 'USD Worth',
                    style: {
                        color: '#CACACA',
                    }
                },
                labels: {
                    style: {
                        colors: '#B9B9B9',
                    }
                },
          },
          {
                title: {
                    text: 'Stock Quantity',
                    style: {
                        color: '#CACACA',
                    }
                },
                labels: {
                    style: {
                        colors: '#B9B9B9',
                    }
                },
                opposite: true
          }],
          legend: {
            labels: {
                colors: '#CACACA',
                show: true
            }
          },
          colors: ['#3A0080', '#003c00', '#460000'],
            fill: {
              type: 'gradient',
              gradient: {
                opacityFrom: 1,
                opacityTo: 0.6,
                type: "vertical"
              }
            },
          stroke: {
            width: [0,0,0]
          },
          plotOptions: {
            line: {
                columnWidth: "10%",
                      dataLabels: {
                        position: 'top', // Display the bar values on top of the bars
                        enabled: true, // Enable data labels on hover
                      },
            },
            bar: {
                dataLabels: {
                    position: 'bottom'
                }
            }
          },
        };

        return (
          <div>
            <Chart options={options} series={series} />
          </div>
        );
    } else {
          var seriesData = getStocksBoughtByData('asdf', 'asfd')
          var series = [
          ];
          series.push({name: 'marketData',
                       type: 'area',
                       data: graphData['seriesData']})

        var barColors = ['#3A0080']
        for (let i = 0; i < seriesData[0].length; i++) {
            series.push(seriesData[0][i])
            barColors.push('#003c00')
        }
        for (let i = 0; i < seriesData[1].length; i++) {
            series.push(seriesData[1][i])
            barColors.push('#460000')
        }
        console.log(series)

        var options = {
          chart: {
            id: 'line',
            stacked: false,
            toolbar: {
                show: false,
            }
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1, 2],
            formatter: function(val, opt) {
                if (val != null) {
                    return val
                }
            }
          },
          xaxis: {
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        colors: '#B9B9B9'
                    }
                },
                type: "datetime"
          },
          yaxis: [{
                title: {
                    text: 'USD Worth',
                    style: {
                        color: '#CACACA',
                    }
                },
                labels: {
                    style: {
                        colors: '#B9B9B9',
                    }
                },
          },
          {
                title: {
                    text: 'Stock Quantity',
                    style: {
                        color: '#CACACA',
                    }
                },
                labels: {
                    style: {
                        colors: '#B9B9B9',
                    }
                },
                opposite: true
          }],
          legend: {
            labels: {
                colors: '#CACACA',
                show: true
            }
          },
          colors: barColors,
            fill: {
              type: 'gradient',
              gradient: {
                opacityFrom: 1,
                opacityTo: 0.6,
                type: "vertical"
              }
            },
          stroke: {
            width: [0,0,0]
          },
          plotOptions: {
            line: {
                columnWidth: "10%",
                      dataLabels: {
                        position: 'top', // Display the bar values on top of the bars
                        enabled: true, // Enable data labels on hover
                      },
            },
            bar: {
                dataLabels: {
                    position: 'bottom'
                }
            }
          },
        };


        return (
              <div>
                <Chart options={options} series={series} />
              </div>
        );
    }

 }
