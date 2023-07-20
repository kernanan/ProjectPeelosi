'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react'
//const DynamicBarChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import DynamicBarChart from 'react-apexcharts'
import { IconName } from "react-icons/fa";
import {getMarketData} from 'APICaller'

var targetName = 'Nancy Pelosi'
var stockStats = {'ticker': 'META', 'Name': 'Meta Platforms Inc.', 'CurrentValue': '208.12'}
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
                {projectHeader(targetName, "META")}
            </div>
            <div className="dataContainer">
                <div className="chartContainer">
                    {stockChart()}
                </div>
                <div className="controlPanelContainer">
                    <div className="stockPanel">
                        <div className="stockInfoRow">
                            <h3 className="targetBoxTitle">Stock</h3>
                            {stockName("Meta Platforms Inc.")}
                        </div>
                        <div className="stockInfoRow">
                            <h3 className="stockBoxCategory">Most Recent Value</h3>
                            {stockWorth(208.12)}
                        </div>
                        <div className="stockInfoRow">
                            <h3 className="stockBoxCategory">Ticker</h3>
                            {stockName("META")}
                        </div>
                        <div className="stockInfoRow">
                            <h3 className="stockBoxCategory">Timeline</h3>
                            {timelineOptions()}
                        </div>
                    </div>
                    <div className="targetPanel">
                        <h3 className="targetBoxTitle">Target</h3>
                        {sampleTargetName("Nancy Pelosi")}
                        {sampleTargetName("Mike Garcia")}
                        {sampleTargetName("Paul Mitchell")}
                        {targetSearchBar()}
                    </div>
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
        console.log(marketData)
        setStockMarketData(marketData)
        graphData['dateRange'] = dateRange
        graphData['stockMarket'] = marketData
    }

    const get1MMarketData = () => {
        let apiResponse = getMarketData('META', '1M')
        let dateRange = apiResponse['x']
        let marketData = apiResponse['y']
        console.log(marketData)
        setStockMarketData(marketData)
        graphData['dateRange'] = dateRange
        graphData['stockMarket'] = marketData
    }

    const get1YMarketData = () => {
        let apiResponse = getMarketData('META', '1Y')
        let dateRange = apiResponse['x']
        let marketData = apiResponse['y']
        console.log(marketData)
        setStockMarketData(marketData)
        graphData['dateRange'] = dateRange
        graphData['stockMarket'] = marketData
    }

    const get3YMarketData = () => {
        let apiResponse = getMarketData('META', '3Y')
        let dateRange = apiResponse['x']
        let marketData = apiResponse['y']
        console.log(marketData)
        setStockMarketData(marketData)
        graphData['dateRange'] = dateRange
        graphData['stockMarket'] = marketData
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
    return (
    <div class="box">
        <form className="searchBox" name="search">
            <input type="text" class="input" name="txt" onmouseout="this.value = ''; this.blur();" />
        </form>
    <button className="searchButton">Search</button>
    </div>
    )
}

function stockName(name) {
    return (
        <h2 className="stockName">{name}</h2>
    )
}

function stockWorth(value) {
    return (
        <h2 className="stockValue">{value}</h2>
    )
}

function sampleTargetName(name) {
    return (
        <h2 className="sampleTargetName">{name}</h2>
    )
}

function projectHeader(politicianName, stockName) {
    return (
        <div>
            <h1 className="projectTitle">You vs Pelosi</h1>
            <h1 className="projectSubHeader">{stockName} stocks owned by {politicianName} against the market</h1>
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

function targetPanelChooser() {
    return(
<form>
	<label for="search">Search</label>
	<input id="search" type="search" pattern=".*\S.*" required />
	<span class="caret"></span>
</form>
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
