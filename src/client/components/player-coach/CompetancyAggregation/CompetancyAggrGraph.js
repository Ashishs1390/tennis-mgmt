import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function CompetancyAggrGraph(props) {
    const [labels, setLabels] = useState([]);
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        setLabels(Object.keys(props.data));
        setGraphData(Object.values(props.data));
    }, [props]);
    const options = {
        indexAxis: 'y',
        legend: {
            display: false
        },
        scales: {
            x: {
                min: 0,
                max: 10
            }

        },
        elements: {
            bar: {
                borderWidth: 1,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        layout: {
            padding: 1
        }
       
    };


    const dataBar = {
        labels: [...labels],
        datasets: [
            {
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                backgroundColor: '#EC932F',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [...graphData]
            }
        ]
    };

    return (
        <div>
            <Bar data={dataBar} options={options} />
        </div>
    )
};

export default CompetancyAggrGraph;

