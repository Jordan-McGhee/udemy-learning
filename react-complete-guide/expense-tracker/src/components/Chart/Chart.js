import "./Chart.css"

import ChartBar from "./ChartBar"

const Chart = (props) => {

    // returns an array of all values in our dataPoints array
    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value)

    // grabs the max value. Uses spread operator to pass all values in dataPointValues array as stand alone elements and finds the max
    const totalMaximum = Math.max(...dataPointValues)

    return (
        <div className = "chart">

            { props.dataPoints.map(dataPoint => 

                <ChartBar
                    key = { dataPoint.label }
                    value = { dataPoint.value }
                    maxValue = { totalMaximum }
                    label = { dataPoint.label }
                />

            ) }

        </div>
    )
}

export default Chart