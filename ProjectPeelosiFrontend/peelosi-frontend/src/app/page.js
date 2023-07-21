'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react'
//const DynamicBarChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import DynamicBarChart from 'react-apexcharts'
import { IconName } from "react-icons/fa";
import {getMarketData, getTargetData} from 'APICaller'

var dateOption = '2W'
var targetData = {'name': 'Nancy Pelosi'}
var stockData = {'ticker': 'META', 'name': 'Meta Platforms Inc.', 'currentValue': '208.12'}
var graphData = {'dateRange': ['07-01-2022', '08-01-2022', '09-01-2022', '10-01-2022', '11-01-2022', '12-01-2022', '01-01-2023', '02-01-2023', '03-01-2023', '04-01-2023', '05-01-2023', '06-01-2023', '07-01-2023'],
                'stockMarket': [12, 19, 3, 5, 2, 3, 1, 1, 1, 1, 3, 5, 8],
                'targetBuys': [5, null, null, 7, 8],
                'targetSells': [3, null, 6, null, null, null, null, 4]}

var counter = 0

export default function Home() {
  return (
    <div className="homeContainer">
        <div className="mainContainer">
            <div className="titleContainer">
                {projectHeader()}
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
        let dateRange = apiResponse['x']
        let marketData = apiResponse['y']
        let value = apiResponse['currentValue']
        console.log(marketData)
        setStockMarketData(marketData)
        graphData['dateRange'] = dateRange
        graphData['stockMarket'] = marketData
        stockData['currentValue'] = value
        dateOption = '2W'
    }

    const get1MMarketData = () => {
        let apiResponse = getMarketData('META', '1M')
        let dateRange = apiResponse['x']
        let marketData = apiResponse['y']
        let value = apiResponse['currentValue']
        console.log(marketData)
        setStockMarketData(marketData)
        graphData['dateRange'] = dateRange
        graphData['stockMarket'] = marketData
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
    const [targetBuys, setTargetBuys] = useState([])
    const [targetSells, setTargetSells] = useState([])

    const handleInputTargetChange = (event) => {
        setCurrentTarget(event.target.value);
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
        let buys = apiResponse['buys']
        let sells = apiResponse['sells']
        setCurrentTarget("")
        targetData['name'] = "Nancy Pelosi"
        setTargetBuys(buys)
        setTargetSells(sells)
        console.log(buys)
        graphData['targetBuys'] = buys
        graphData['targetSells'] = sells
    }
    const searchForGarcia = () => {
        let apiResponse = getTargetData("Mike Garcia", dateOption)
        let buys = apiResponse['buys']
        let sells = apiResponse['sells']
        setCurrentTarget("")
        targetData['name'] = "Mike Garcia"
        setTargetBuys(buys)
        setTargetSells(sells)
        console.log(buys)
        graphData['targetBuys'] = buys
        graphData['targetSells'] = sells
    }
    const searchForSBuyer = () => {
        let apiResponse = getTargetData("Stephen Buyer", dateOption)
        let buys = apiResponse['buys']
        let sells = apiResponse['sells']
        setCurrentTarget("")
        targetData['name'] = "Stephen Buyer"
        setTargetBuys(buys)
        setTargetSells(sells)
        console.log(buys)
        graphData['targetBuys'] = buys
        graphData['targetSells'] = sells
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
        let y = apiResponse['y']
        let name = apiResponse['name']
        let value = apiResponse['currentValue']
        stockData['ticker'] = currentStock
        setCurrentStock("")
        stockData['name'] = name
        graphData['stockMarket'] = y
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
        <div>
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
    var series = [
      {
        name: 'Stock Market',
        type: 'area',
        data: graphData['stockMarket'],
      },
      {
        name: 'Target Buys',
        type: 'column',
        data: graphData['targetBuys'],
      },
      {
        name: 'Target Sells',
        type: 'column',
        data: graphData['targetSells'],
      }
    ];

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
        enabledOnSeries: [1, 2]
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
            categories: graphData['dateRange'],
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
        <DynamicBarChart options={options} series={series} />
      </div>
    );
 }
