'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react'
//const DynamicBarChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import DynamicBarChart from 'react-apexcharts'
import { IconName } from "react-icons/fa";

export default function Home() {
  return (
    <div className="homeContainer">
        <div className="mainContainer">
            <div className="titleContainer">
                {projectHeader("Nancy Pelosi", "META")}
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

function timelineOptions() {
    return (
    <div className="timelineOptionContainer">
        <button className="timelineOption">2W</button>
        <button className="timelineOption">1M</button>
        <button className="timelineOption">1Y</button>
        <button className="timelineOption">5Y</button>
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
    const [isClient, setIsClient] = useState(false);

    var series = [
      {
        name: 'Stock Market',
        type: 'area',
        data: [12, 19, 3, 5, 2, 3, 1, 1, 1, 1, 3, 5, 8],
      },
      {
        name: 'Target Buys',
        type: 'column',
        data: [5, null, null, 7, 8],
      },
      {
        name: 'Target Sells',
        type: 'column',
        data: [3, null, 6, null, null, null, null, 4],
      }
    ];

    var options = {
      chart: {
        id: 'line',
        stacked: false,
        toolbar: {
            show: false,
//            tools: {
//              download: true,
//              selection: false,
//              zoom: false,
//              zoomin: false,
//              zoomout: false,
//              pan: false,
//            }
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
            categories: ['07-01-2022', '08-01-2022', '09-01-2022', '10-01-2022', '11-01-2022', '12-01-2022', '01-01-2023', '02-01-2023', '03-01-2023', '04-01-2023', '05-01-2023', '06-01-2023', '07-01-2023'],
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
