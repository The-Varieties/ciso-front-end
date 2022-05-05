import Card from "../../components/cards";
import pie_chart from "../../assets/DummyImages/pie_chart.svg";
import line_graph from "../../assets/DummyImages/line_graph.svg";
import { useEffect, useState } from 'react';
import RightSizingComponent from "../../components/rightSizingComponent";
import RadioInput from "../../components/radioInput";
import {Chart as ChartJS} from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js'

function DataVisPage() {
    const [checked, setChecked] = useState("CPU");
    const [chosenRadio, setChosenRadio] = useState(0);
    const [label24, setLabel24] = useState([]);
    const [values24, setValues24] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0);

        const valArr = [];

        for(let i = 0; i < dataSampleFromEndpoint.results[0]['values'].length; i++) {
            const rawLabel = dataSampleFromEndpoint.results[0]['values'][i][0];
            const splitLabel = rawLabel.split("T")[1].split("+")[0]

            setLabel24(label24 => [...label24, splitLabel]);
        }

        for(let i = 0; i < dataSampleFromEndpoint.results.length; i++) {
            for(let j = 0; j < dataSampleFromEndpoint.results[i]['values'].length; j++) {
                const value = dataSampleFromEndpoint.results[i]['values'][j][1];

                valArr.push(value);
            }
        }

        const reshapedArr = [];
        for(let i  = 0; i < dataSampleFromEndpoint.results[0]['values'].length; i++) {
            reshapedArr.push(valArr.splice(0, dataSampleFromEndpoint.results[0]['values'].length));
        }

        setValues24(values24 => [...values24, ...reshapedArr]);
    }, [])

    const toggleRadio = (e) => {
        setChecked(e.target.value);

        if(e.target.value == 'CPU') {
            setChosenRadio(0)
        } else if(e.target.value == 'Memory') {
            setChosenRadio(1)
        }
    }

    const instanceDetail = {'name': 'instanceDetail', 'value': [
        {'title': 'Region', 'content': 'Asia Pacific (Jakarta)'},
        {'title': 'Operating System', 'content': 'Linux'},
        {'title': 'On-Demand Hourly Cost', 'content': '1.53'},
        {'title': '1 YR Std Reserved Hourly Cost', 'content': '0.964'},
        {'title': 'Pricing Plan', 'content': 'EC2 Instance Savings Plan'},
        {'title': 'Reservation Term', 'content': '1 Year'},
        {'title': 'Payment Option', 'content': 'No Upfront'},
        {'title': 'EBS Volume Storage Type', 'content': 'General Purpose SSD (gp2)'},
    ]}

    const content = (
        <div>
            <h2 className="text-black w-fit font-bold text-2xl">Chosen Component</h2>

            <div className="flex mt-2">
                <div className="flex align-baseline mr-12">
                    <input type="radio" id="cpu_radio" name="cpu_radio" value="CPU" className="w-5 h-5 my-auto" checked={checked === "CPU"} onChange={toggleRadio}/>
                    <label htmlFor="cpu_radio" className="text-base ml-2">CPU</label>
                </div>

                <div className="flex align-baseline mr-12">
                    <input type="radio" id="memory_radio" name="memory_radio" value="Memory" className="w-5 h-5 my-auto" checked={checked === "Memory"} onChange={toggleRadio}/>
                    <label htmlFor="memory_radio" className="text-base ml-2">Memory</label>
                </div>
            </div>

            <div className="py-8">
                <div className="w-full border-t border-gray-500"></div>
            </div>

            <h2 className="text-black w-fit font-bold text-2xl mb-2">Instance Details</h2>
            {instanceDetail && instanceDetail.value.map((instance, index) => (
                <p key={index} className="text-base"><span className="font-bold">{instance.title}:</span> {instance.content}</p>
            ))}
        </div>
    )

    const financeTable = (
        <table>
            <tbody>
                <tr>
                    <td className="font-bold italic">Current Spending</td>
                </tr>
                <tr>
                    <td>Amazon Elastic Block Storage (EBS)</td>
                    <td className="text-right w-32">703.73 USD</td>
                </tr>
                <tr>
                    <td>Amazon EC2 Instance Savings Plans Instances</td>
                    <td className="text-right">3.00 USD</td>
                </tr>
                <tr>
                    <td className="font-bold italic text-right">Sub-total:</td>
                    <td className="font-bold text-right">706.73 USD</td>
                </tr>
                <tr className="h-2"></tr>
                <tr>
                    <td className="font-bold italic">Recommended Rightsizing with Spending</td>
                </tr>
                <tr>
                    <td>Reduce Number of Allocated CPUs to 2 CPUs</td>
                    <td className="text-right">-100.00 USD</td>
                </tr>
                <tr>
                    <td className="font-bold italic text-right">Sub-total:</td>
                    <td className="font-bold text-right">-100.00 USD</td>
                </tr>
                <tr className="h-2"></tr>
                <tr>
                    <td className="font-bold italic">Spending After Rightsizing</td>
                </tr>
                <tr>
                    <td>Current Spending</td>
                    <td className="text-right">706.73 USD</td>
                </tr>
                <tr>
                    <td>Recommended Rightsizing Spending</td>
                    <td className="text-right">-100.00 USD</td>
                </tr>
                <tr>
                    <td className="font-bold italic text-right">Sub-total:</td>
                    <td className="font-bold text-right">606.73 USD</td>
                </tr>
            </tbody>
        </table>
    )

    const financialContent = (
        <div>
            <h2 className="w-fit font-bold text-2xl mb-2">Financial Report (Year)</h2>
            <div className="flex w-full">
                {financeTable}

                <div className="flex mx-auto my-auto">
                    <div className="block">
                        <p className="font-bold text-3xl">You can save your</p>
                        <p className="text-right font-bold text-3xl">budget up to</p>
                    </div>
                    <p className="font-bold text-7xl ml-2">14.15%</p>
                </div>
            </div>
            

        </div>
    )

    const recommendationData = {
        "cpu": 3.014285714285677,
        "ram": 32.334294715948076,
        "usage_cat": 1,
        "recommendations": [
            {
                "recommendation": "Downsize the underutilized EC2 instance",
                "details": "Downsize the EC2 instances by selecting the right instance family to fit the current workload, so it will reduce operation costs",
                "steps": [
                    "Navigate to the EC2 dashboard in your AWS",
                    "Select the underutilized instance and stop it",
                    "Change the current instance type to downsize it",
                    "After choosing the right instance type, then apply it",
                    "Start the EC2 instance again"
                ]
            }
        ]
    }

    const recommendationContent = (
        <div>
            <h2 className="text-black w-fit font-bold font-italic text-2xl">Recommendation</h2>

            {recommendationData && recommendationData.recommendations.map((recommendation, index) => {
                const stepsArr = [];

                for(let i = 0; i < recommendation.steps.length; i++) {
                    stepsArr.push(<li className="text-sm" key={i}>{recommendation.steps[i]}</li>)
                }
                
                return (
                    <div className="mt-2" key={index}>
                        <h2 className="text-indigo-800 w-fit font-black text-base">{recommendation.recommendation}</h2>
                        <p className="text-black w-fit text-sm">{recommendation.details}</p>
                        <p className="text-black w-fit text-sm italic font-bold">How-to:</p>
                        <div className="ml-1"> {stepsArr} </div>
                        
                    </div>
                )
            })}
        </div>
    )

    const data_be = {
        'name': 'CPU',
        'values':[
            {
                'time': 'CPU% Last 24 Hours',
                'labels': ["12PM", "1PM", "2PM", "3PM", "4PM", "5PM"],
                'data': [
                    {
                        "sub": "Total", 
                        "value": [90, 98, 97, 92, 99, 95]
                    },
                    {
                        "sub": "System", 
                        "value": [1, 12, 23, 34, 45, 56]
                    },
                    {
                        "sub": "User", 
                        "value": [32, 32, 12, 34, 12, 20]
                    },
                    {
                        "sub": "lowait", 
                        "value": [1, 5, 10, 15, 20, 34]
                    }
                ]
            },
            {
                'time': 'Last 7 Days',
                'labels': ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                'data': [
                    {
                        "sub": "Total", 
                        "value": [55, 55, 54, 55, 55, 56, 57]
                    },
                    {
                        "sub": "System", 
                        "value": [12, 12, 13, 15, 22, 15, 12]
                    },
                    {
                        "sub": "User", 
                        "value": [33, 34, 44, 33, 32, 34, 31]
                    },
                    {
                        "sub": "lowait", 
                        "value": [5, 10, 7, 2, 4, 5, 6, 2]
                    }
                ]
            },
            {
                'time': 'Last 30 Days',
                'labels': [
                    "01-04", "02-04", "03-04", "04-04", "05-04", "06-04", "07-04", "08-04", "09-04", "10-04",
                    "11-04", "12-04", "13-04", "14-04", "15-04", "16-04", "17-04", "18-04", "19-04", "20-04",
                    "21-04", "22-04", "23-04", "24-04", "25-04", "26-04", "27-04", "28-04", "29-04", "30-04",
                ],
                'data': [
                    {
                        "sub": "Total", 
                        "value": [
                            20, 21, 22, 21, 22, 22, 23, 21, 22, 22, 22, 22, 22, 22, 21,
                            21, 22, 21, 22, 20, 21, 22, 21, 22, 23, 23, 21, 20, 22, 24,
                        ]
                    },
                    {
                        "sub": "System", 
                        "value": [
                            3, 4, 5, 4, 3, 2, 2, 3, 4, 5, 4, 3, 2, 2, 1,
                            6, 5, 4, 2, 1, 1, 2, 1, 2, 3, 3, 1, 3, 2, 4,
                        ]
                    },
                    {
                        "sub": "User", 
                        "value": [
                            6, 4, 5, 4, 6, 7, 7, 6, 4, 5, 4, 6, 2, 4, 1,
                            6, 5, 4, 8, 9, 9, 9, 6, 5, 4, 3, 2, 3, 2, 4,
                        ]
                    },
                    {
                        "sub": "lowait", 
                        "value": [
                            5, 15, 5, 15, 5, 15, 5, 15, 5, 15, 5, 15, 5, 15, 15,
                            15, 5, 15, 15, 5, 5, 15, 15, 15, 15, 5, 5, 15, 5, 5,
                        ]
                    }
                ]
            },
        ]
    }

    const dataSampleFromEndpoint = {
        "name": "cpu",
        "time": "last 24 hours",
        "hostname": "node",
        "results": [
            {
                "sub": "system",
                "values": [
                    [
                        "2022-05-03T14:11:19+07:00",
                        "0.11460402696608946"
                    ],
                    [
                        "2022-05-03T15:11:19+07:00",
                        "0.4461703738680719"
                    ],
                    [
                        "2022-05-03T16:11:19+07:00",
                        "0.4543584379358438"
                    ],
                    [
                        "2022-05-03T17:11:19+07:00",
                        "0.4019177126917713"
                    ]
                ]
            },
            {
                "sub": "user",
                "values": [
                    [
                        "2022-05-03T14:11:19+07:00",
                        "0.22050527786796537"
                    ],
                    [
                        "2022-05-03T15:11:19+07:00",
                        "0.8206391604522963"
                    ],
                    [
                        "2022-05-03T16:11:19+07:00",
                        "1.0756624825662482"
                    ],
                    [
                        "2022-05-03T17:11:19+07:00",
                        "1.0872733612273362"
                    ]
                ]
            },
            {
                "sub": "iowait",
                "values": [
                    [
                        "2022-05-03T14:11:19+07:00",
                        "0.026527739087301588"
                    ],
                    [
                        "2022-05-03T15:11:19+07:00",
                        "0.05123537678782476"
                    ],
                    [
                        "2022-05-03T16:11:19+07:00",
                        "0.03720362622036261"
                    ],
                    [
                        "2022-05-03T17:11:19+07:00",
                        "0.04735006973500697"
                    ]
                ]
            },
            {
                "sub": "idle",
                "values": [
                    [
                        "2022-05-03T14:11:19+07:00",
                        "6.829833821434583"
                    ],
                    [
                        "2022-05-03T15:11:19+07:00",
                        "2.051405812124374"
                    ],
                    [
                        "2022-05-03T16:11:19+07:00",
                        "2.306032078103226"
                    ],
                    [
                        "2022-05-03T17:11:19+07:00",
                        "2.2845536959553714"
                    ]
                ]
            }
        ]
    }

    Chart.register({
        id: 'annotationLine',
        afterDraw: function(chart, easing) {
            if(chart.tooltip._active && chart.tooltip._active.length) {
                const context = chart.ctx;
                const x = chart.tooltip._active[0].element.x;
                const topY = chart.scales.y.top;
                const bottomY = chart.scales.y.bottom;

                for(let i = 0; i < chart.tooltip.labelColors.length; i++) {
                    chart.tooltip.labelColors[i]['backgroundColor'] = chart.tooltip.labelColors[i]['borderColor']
                }
       
                context.save();
                context.beginPath();
                context.moveTo(x, topY);
                context.lineTo(x, bottomY);
                context.lineWidth = 2;
                context.strokeStyle = 'rgba(255,255,255,0.8)';
                context.stroke();
                context.restore();
            }
        }
    });

    const vis_24 = (
        <Line
            data = {{
                labels: label24,
                datasets: [
                    {
                        label: dataSampleFromEndpoint.results[0]['sub'],
                        data: values24[0],
                        borderColor: "rgb(135, 100, 69)",
                        tension: 0.2
                    },
                    {
                        label: dataSampleFromEndpoint.results[1]['sub'],
                        data: values24[1],
                        fill: true,
                        backgroundColor: 'rgba(202, 150, 92, 0.1)',
                        borderColor: "rgb(202, 150, 92)",
                        tension: 0.2
                    },
                    {
                        label: dataSampleFromEndpoint.results[2]['sub'],
                        data: values24[2],
                        fill: true,
                        backgroundColor: 'rgba(238, 195, 115, 0.1)',
                        borderColor: "rgb(238, 195, 115)",
                        tension: 0.2
                    },
                    {
                        label: dataSampleFromEndpoint.results[3]['sub'],
                        data: values24[3],
                        fill: true,
                        backgroundColor: 'rgba(244, 223, 186, 0.1)',
                        borderColor: "rgb(244, 223, 186)",
                        tension: 0.2
                    }
                ]
            }}
            options= {{
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 30,
                            color: 'white'
                        }
                    },
                    tooltip: {
                        displayColors: true
                    }
                },
                scales: {
                    y: {
                        grid: {
                            color: 'rgba(47,79,79,0.3)',
                            borderColor: 'white'
                        },
                        ticks: {
                            color: 'white'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(47,79,79,0.3)',
                            borderColor: 'white'
                        },
                        ticks: {
                            color: 'white',
                        }
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    position: 'cursor'
                },
                hover: {
                    mode: 'point',
                    intersect: false
                }
            }}
        />
    )

    const vis_7d = (
        <Line
            data = {{
                labels: data_be['values'][1]['labels'],
                datasets: [
                    {
                        label: data_be['values'][1]['data'][0]['sub'],
                        data: data_be['values'][1]['data'][0]['value'],
                        borderColor: "rgb(135, 100, 69)",
                        tension: 0.5,
                        pointRadius: 0
                    },
                    {
                        label: data_be['values'][1]['data'][1]['sub'],
                        data: data_be['values'][1]['data'][1]['value'],
                        fill: true,
                        backgroundColor: 'rgba(202, 150, 92, 0.1)',
                        borderColor: "rgb(202, 150, 92)",
                        tension: 0.5,
                        pointRadius: 0
                    },
                    {
                        label: data_be['values'][1]['data'][2]['sub'],
                        data: data_be['values'][1]['data'][2]['value'],
                        fill: true,
                        backgroundColor: 'rgba(238, 195, 115, 0.1)',
                        borderColor: "rgb(238, 195, 115)",
                        tension: 0.5,
                        pointRadius: 0
                    },
                    {
                        label: data_be['values'][1]['data'][3]['sub'],
                        data: data_be['values'][1]['data'][3]['value'],
                        fill: true,
                        backgroundColor: 'rgba(244, 223, 186, 0.1)',
                        borderColor: "rgb(244, 223, 186)",
                        tension: 0.5,
                        pointRadius: 0
                    }
                ]
            }}
            options= {{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 30,
                            color: 'white'
                        }                        
                    }
                },
                scales: {
                    y: {
                        grid: {
                            color: 'rgba(47,79,79,0.3)',
                            borderColor: 'white'
                        },
                        ticks: {
                            color: 'white',
                        },
                        min: 0,
                        max: 100
                    },
                    x: {
                        grid: {
                            color: 'rgba(47,79,79,0.3)',
                            borderColor: 'white'
                        },
                        ticks: {
                            color: 'white',
                        }
                    }
                }
            }}
        />
    )

    const vis_30d = (
        <Line
            data = {{
                labels: data_be['values'][2]['labels'],
                datasets: [
                    {
                        label: data_be['values'][2]['data'][0]['sub'],
                        data: data_be['values'][2]['data'][0]['value'],
                        borderColor: "rgb(135, 100, 69)",
                        tension: 0.5
                    },
                    {
                        label: data_be['values'][2]['data'][1]['sub'],
                        data: data_be['values'][2]['data'][1]['value'],
                        fill: true,
                        backgroundColor: 'rgba(202, 150, 92, 0.1)',
                        borderColor: "rgb(202, 150, 92)",
                        tension: 0.5,
                        pointRadius: 0
                    },
                    {
                        label: data_be['values'][2]['data'][2]['sub'],
                        data: data_be['values'][2]['data'][2]['value'],
                        fill: true,
                        backgroundColor: 'rgba(238, 195, 115, 0.1)',
                        borderColor: "rgb(238, 195, 115)",
                        tension: 0.5,
                        pointRadius: 0
                    },
                    {
                        label: data_be['values'][2]['data'][3]['sub'],
                        data: data_be['values'][2]['data'][3]['value'],
                        fill: true,
                        backgroundColor: 'rgba(244, 223, 186, 0.1)',
                        borderColor: "rgb(244, 223, 186)",
                        tension: 0.5,
                        pointRadius: 0
                    }
                ]
            }}
            options= {{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 30,
                            color: 'white'
                        }
                    }
                },
                scales: {
                    y: {
                        grid: {
                            color: 'rgba(47,79,79,0.3)',
                            borderColor: 'white'
                        },
                        ticks: {
                            color: 'white',
                        },
                        min: 0,
                        max: 100
                    },
                    x: {
                        grid: {
                            color: 'rgba(47,79,79,0.3)',
                            borderColor: 'white'
                        },
                        ticks: {
                            color: 'white',
                        }
                    }
                }
            }}
        />
    )

    return (
        <div className="mx-16 my-5">
            {/* <RightSizingComponent /> */}

            <div className="block mt-20">
                <div className="w-full ml-2">
                    <h2 className="text-white text-xl font-medium mb-4">Last 24 Hours - {checked}%</h2>
                    <div className="h-72">{vis_24}</div>
                </div>
                
                <div className="w-full mt-10">
                    <h2 className="text-white text-xl font-medium mb-4">Last 7 Days - {checked}%</h2>
                    <div className="h-72">{vis_7d}</div>
                </div>

                <div className="w-full mt-10">
                    <h2 className="text-white text-xl font-medium mb-4">Last 30 Days - {checked}%</h2>
                    <div className="h-72">{vis_30d}</div>
                </div>
            </div>

            <div className="mt-20 mb-10 grid grid-cols-5 gap-5">
                <div className="col-span-3"> <Card cardContent = {content} /> </div>
                <div className="col-span-2"> <Card cardContent = {recommendationContent} /> </div>
                <div className="col-span-5"> <Card cardContent = {financialContent} /> </div>
            </div>
        </div>
    )
}

export default DataVisPage;