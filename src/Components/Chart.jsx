import React from 'react'
import {Line} from "react-chartjs-2"
import {Chart as ChartJs,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend} from "chart.js"

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend

)


const Chart = (arr=[],currency,days) => {
    const prices=[1,2,3,4,5,]
    const date=[23/12/12,23/12/11,22/12/15]


  return (
    <Line options={{
        responsive:true
    }}
       data={{
        labels:date,
        datasets:[{
            label:`price in ${currency}`,
            data:prices,borderColor:"rgb(25,99,132)",
            backgroundColor:"rgb(25,99,132,0.5)"
        }]
    }}
    />
  )
}

export default Chart