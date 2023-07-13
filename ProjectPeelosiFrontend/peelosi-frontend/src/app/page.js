'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react'
//const DynamicBarChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import DynamicBarChart from 'react-apexcharts'

export default function Home() {
  return (
    <div className="homeContainer">
        <div className="mainContainer">
            {projectHeader("Nancy Pelosi", "META")}
            <div className="dataContainer">
                <div className="chartContainer">
                    {stockChart()}
                </div>
                <div className="controlPanelContainer">
                    <div className="stockPanel">
                        <div className="stockInfoRow">
                        </div>
                        <div className="stockInfoRow">
                        </div>
                        <div className="stockInfoRow">
                        </div>
                        <div className="stockInfoRow">
                        </div>
                    </div>
                    <div className="targetPanel">
                    </div>
                </div>
            </div>
        </div>

    </div>
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

//function controlPanel(){
//    return(
//        <div>
//            <button>press me</button>
//        </div>
//    )
//}

function stockChart(){
    const [isClient, setIsClient] = useState(false);

    var series = [
      {
        name: 'Stock Market',
        type: 'area',
        data: [12, 19, 3, 5, 2, 3, 1, 1, 1, 1, 3, 5],
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
            categories: ['08-01-2022', '09-01-2022', '10-01-2022', '11-01-2022', '12-01-2022', '01-01-2023', '02-01-2023', '03-01-2023', '04-01-2023', '05-01-2023', '06-01-2023', '07-01-2023'],
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
      colors: ['#3e236e', '#005254', '#9F2B68'],
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 1,
            opacityTo: 0.8,
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
//      tooltip: {
//        enabled: true,
//        enabledOnSeries: [1],
//        shared: false,
//        x: {
//          show: true
//        },
//        marker: {
//          show: true,
//        },
//      },
//      onItemHover: {
//          highlightDataSeries: true
//      },

    };

    return (
      <div>
        <DynamicBarChart options={options} series={series} />
      </div>
    );
 }
