import Card from "../../components/cards";
import { useEffect, useState } from 'react';
import RightSizingComponent from "../../components/rightSizingComponent";
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {getInstance} from '../../store/actions/instanceAction';

function DataVisPage(props) {
    const [checked, setChecked] = useState("CPU");
    const [chosenRadio, setChosenRadio] = useState(0);
    const [label24, setLabel24] = useState([]);
    const [values24, setValues24] = useState([]);
    const [values7, setValues7] = useState([]);
    const [values30, setValues30] = useState([]);
    const {state} = useLocation();
    const {instanceName} = state;
    const [rightsizingCat, setRightsizingCat] = useState([]);
    const [recommendationsList, setRecommendationsList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const valArr = [];
        const valArr7 = [];
        const valArr30 = [];

        let chosenData;
        let chosenDummy_7;
        let chosenDummy_30;

        if(chosenRadio === 0) {
            chosenData = dataSampleFromEndpoint;
            chosenDummy_7 = data_be_7;
            chosenDummy_30 = data_be_30;
        } else {
            chosenData = memoryDataSample;
            chosenDummy_7 = data_be_memory_dummy_7;
            chosenDummy_30 = data_be_memory_dummy_30;
        }

        for(let i = 0; i < chosenData.results.length; i++) {
            for(let j = 0; j < chosenData.results[i]['values'].length; j++) {
                const value = chosenData.results[i]['values'][j][1];

                valArr.push(value);
            }
        }

        for(let i = 0; i < chosenDummy_7.values[0].data.length; i++) {
            for(let j = 0; j < chosenDummy_7.values[0].data[i]['value'].length; j++) {
                const value = chosenDummy_7.values[0].data[i]['value'][j];

                valArr7.push(value);
            }
        }

        for(let i = 0; i < chosenDummy_30.values[0].data.length; i++) {
            for(let j = 0; j < chosenDummy_30.values[0].data[i]['value'].length; j++) {
                const value = chosenDummy_30.values[0].data[i]['value'][j];

                valArr30.push(value);
            }
        }

        const reshapedArr = [];
        const reshapedArr7 = [];
        const reshapedArr30 = [];

        for(let i  = 0; i < chosenData.results.length; i++) {
            reshapedArr.push(valArr.splice(0, chosenData.results[0]['values'].length));
        }

        for(let i  = 0; i < chosenDummy_7.values[0].data.length; i++) {
            reshapedArr7.push(valArr7.splice(0, chosenDummy_7.values[0].data[i]['value'].length));
        }

        for(let i  = 0; i < chosenDummy_30.values[0].data.length; i++) {
            reshapedArr30.push(valArr30.splice(0, chosenDummy_30.values[0].data[i]['value'].length));
        }

        setValues24(values24 => [...values24, ...reshapedArr]);
        setValues7(values7 => [...values7, ...reshapedArr7]);
        setValues30(values30 => [...values30, ...reshapedArr30]);
    }, [chosenRadio])

    useEffect(() => {
        for(let i = 0; i < dataSampleFromEndpoint.results[0]['values'].length; i++) {
            const rawLabel = dataSampleFromEndpoint.results[0]['values'][i][0];
            const splitLabel = rawLabel.split("T")[1].split("+")[0]

            setLabel24(label24 => [...label24, splitLabel]);
        }
    }, [])

    useEffect(() => {
        props.getInstance(instanceName);
        setRightsizingCat(props.instance.instance.usage_cat);

        if(props.instance.instance.recommendations) {
            setRecommendationsList(...recommendationsList, props.instance.instance.recommendations);
        }
    }, [props.instance.instance.usage_cat])
    
    const toggleRadio = (e) => {
        setChecked(e.target.value);

        if(e.target.value === 'CPU') {
            setChosenRadio(0)
            setValues24([])
            setValues7([])
            setValues30([])
        } else if(e.target.value === 'Memory') {
            setChosenRadio(1)
            setValues24([])
            setValues7([])
            setValues30([])
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

    const recommendationContent = (
        <div>
            <h2 className="text-black w-fit font-bold font-italic text-2xl">Recommendation</h2>

            {(recommendationsList.length != 0 ? 
                recommendationsList.map((recommendation, index) => {
                    const stepsArr = [];
    
                    for(let i = 0; i < recommendation.steps.length; i++) {
                        stepsArr.push(<li className="text-sm" key={i}>{recommendation.steps[i]}</li>)
                    }
                    
                    return (
                        <div className="mt-3" key={index}>
                            <h2 className="text-indigo-800 w-fit font-black text-base">{recommendation.recommendation}</h2>
                            <p className="text-black w-fit text-sm">{recommendation.details}</p>
                            <p className="text-black w-fit text-sm italic font-bold">How-to:</p>
                            <div className="ml-1"> {stepsArr} </div>
                        </div>
                    )
                })
            : 
                null
            )}
        </div>
    )

    const data_be_7 = {
        'name': 'CPU',
        'values':[
            {
                'time': 'Last 7 Days',
                'labels': ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                'data': [
                    {
                        "sub": "system", 
                        "value": [55, 55, 54, 55, 55, 56, 57]
                    },
                    {
                        "sub": "user", 
                        "value": [12, 12, 13, 15, 22, 15, 12]
                    },
                    {
                        "sub": "iowait", 
                        "value": [33, 34, 44, 33, 32, 34, 31]
                    },
                    {
                        "sub": "idle", 
                        "value": [5, 10, 7, 2, 4, 5, 6, 2]
                    }
                ]
            }
        ]
    }

    const data_be_30 = {
        'name': 'CPU',
        'values':[
            {
                'time': 'Last 30 Days',
                'labels': [
                    "01-04", "02-04", "03-04", "04-04", "05-04", "06-04", "07-04", "08-04", "09-04", "10-04",
                    "11-04", "12-04", "13-04", "14-04", "15-04", "16-04", "17-04", "18-04", "19-04", "20-04",
                    "21-04", "22-04", "23-04", "24-04", "25-04", "26-04", "27-04", "28-04", "29-04", "30-04",
                ],
                'data': [
                    {
                        "sub": "system", 
                        "value": [
                            20, 21, 22, 21, 22, 22, 23, 21, 22, 22, 22, 22, 22, 22, 21,
                            21, 22, 21, 22, 20, 21, 22, 21, 22, 23, 23, 21, 20, 22, 24,
                        ]
                    },
                    {
                        "sub": "user", 
                        "value": [
                            3, 4, 5, 4, 3, 2, 2, 3, 4, 5, 4, 3, 2, 2, 1,
                            6, 5, 4, 2, 1, 1, 2, 1, 2, 3, 3, 1, 3, 2, 4,
                        ]
                    },
                    {
                        "sub": "iowait", 
                        "value": [
                            6, 4, 5, 4, 6, 7, 7, 6, 4, 5, 4, 6, 2, 4, 1,
                            6, 5, 4, 8, 9, 9, 9, 6, 5, 4, 3, 2, 3, 2, 4,
                        ]
                    },
                    {
                        "sub": "idle", 
                        "value": [
                            5, 15, 5, 15, 5, 15, 5, 15, 5, 15, 5, 15, 5, 15, 15,
                            15, 5, 15, 15, 5, 5, 15, 15, 15, 15, 5, 5, 15, 5, 5,
                        ]
                    }
                ]
            },
        ]
    }

    const data_be_memory_dummy_7 = {
        'name': 'Memory',
        'values':[
            {
                'time': 'Last 7 Days',
                'labels': ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                'data': [
                    {
                        "sub": "system", 
                        "value": [22, 23, 21, 22, 21, 23, 22]
                    },
                    {
                        "sub": "user", 
                        "value": [32, 31, 31, 30, 32, 33, 34]
                    },
                    {
                        "sub": "iowait", 
                        "value": [11, 12, 11, 11, 11, 11, 21]
                    },
                    {
                        "sub": "idle", 
                        "value": [32, 21, 25, 28, 23, 21, 25, 27]
                    }
                ]
            }
        ]
    }

    const data_be_memory_dummy_30 = {
        'name': 'Memory',
        'values':[
            {
                'time': 'Last 30 Days',
                'labels': [
                    "01-04", "02-04", "03-04", "04-04", "05-04", "06-04", "07-04", "08-04", "09-04", "10-04",
                    "11-04", "12-04", "13-04", "14-04", "15-04", "16-04", "17-04", "18-04", "19-04", "20-04",
                    "21-04", "22-04", "23-04", "24-04", "25-04", "26-04", "27-04", "28-04", "29-04", "30-04",
                ],
                'data': [
                    {
                        "sub": "system", 
                        "value": [
                            13, 14, 15, 14, 13, 12, 12, 13, 14, 15, 14, 13, 12, 12, 11,
                            26, 25, 24, 22, 21, 21, 22, 21, 22, 23, 23, 21, 23, 22, 24,
                        ]
                    },
                    {
                        "sub": "user", 
                        "value": [
                            15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                            15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                        ]
                    },
                    {
                        "sub": "iowait", 
                        "value": [
                            46, 44, 45, 44, 46, 47, 47, 46, 44, 45, 44, 46, 42, 44, 41,
                            36, 35, 34, 38, 39, 39, 39, 36, 35, 34, 33, 32, 33, 32, 34,
                        ]
                    },
                    {
                        "sub": "idle", 
                        "value": [
                            20, 21, 22, 21, 22, 22, 23, 21, 22, 22, 22, 22, 22, 22, 21,
                            21, 22, 21, 22, 20, 21, 22, 21, 22, 23, 23, 21, 20, 22, 24,
                        ]
                    }
                ]
            },
        ]
    }

    const memoryDataSample = {
        "name": "memory",
        "time": "last 24 hours",
        "hostname": "node",
        "results": [
            {
                "sub": "system",
                "values": [
                    [
                        "2022-05-03T14:11:19+07:00",
                        "0.22"
                    ],
                    [
                        "2022-05-03T15:11:19+07:00",
                        "0.23"
                    ],
                    [
                        "2022-05-03T16:11:19+07:00",
                        "0.22"
                    ],
                    [
                        "2022-05-03T17:11:19+07:00",
                        "0.21"
                    ]
                ]
            },
            {
                "sub": "user",
                "values": [
                    [
                        "2022-05-03T14:11:19+07:00",
                        "0.21"
                    ],
                    [
                        "2022-05-03T15:11:19+07:00",
                        "0.31"
                    ],
                    [
                        "2022-05-03T16:11:19+07:00",
                        "1.50"
                    ],
                    [
                        "2022-05-03T17:11:19+07:00",
                        "1.08"
                    ]
                ]
            },
            {
                "sub": "iowait",
                "values": [
                    [
                        "2022-05-03T14:11:19+07:00",
                        "0.02"
                    ],
                    [
                        "2022-05-03T15:11:19+07:00",
                        "0.03"
                    ],
                    [
                        "2022-05-03T16:11:19+07:00",
                        "0.04"
                    ],
                    [
                        "2022-05-03T17:11:19+07:00",
                        "0.02"
                    ]
                ]
            },
            {
                "sub": "idle",
                "values": [
                    [
                        "2022-05-03T14:11:19+07:00",
                        "4.5"
                    ],
                    [
                        "2022-05-03T15:11:19+07:00",
                        "3.4"
                    ],
                    [
                        "2022-05-03T16:11:19+07:00",
                        "2.3"
                    ],
                    [
                        "2022-05-03T17:11:19+07:00",
                        "1.2"
                    ]
                ]
            }
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
                context.strokeStyle = 'rgba(255,255,255,0.7)';
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
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'index',
                    intersect: false
                }
            }}
        />
    )

    const vis_7d = (
        <Line
            data = {{
                labels: data_be_7['values'][0]['labels'],
                datasets: [
                    {
                        label: data_be_7['values'][0]['data'][0]['sub'],
                        data: values7[0],
                        borderColor: "rgb(135, 100, 69)",
                        tension: 0.5
                    },
                    {
                        label: data_be_7['values'][0]['data'][1]['sub'],
                        data: values7[1],
                        fill: true,
                        backgroundColor: 'rgba(202, 150, 92, 0.1)',
                        borderColor: "rgb(202, 150, 92)",
                        tension: 0.5
                    },
                    {
                        label: data_be_7['values'][0]['data'][2]['sub'],
                        data: values7[2],
                        fill: true,
                        backgroundColor: 'rgba(238, 195, 115, 0.1)',
                        borderColor: "rgb(238, 195, 115)",
                        tension: 0.5
                    },
                    {
                        label: data_be_7['values'][0]['data'][3]['sub'],
                        data: values7[3],
                        fill: true,
                        backgroundColor: 'rgba(244, 223, 186, 0.1)',
                        borderColor: "rgb(244, 223, 186)",
                        tension: 0.5
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
                        max: 100,
                        min: 0,
                    },
                    x: {
                        grid: {
                            color: 'rgba(47,79,79,0.3)',
                            borderColor: 'white'
                        },
                        ticks: {
                            color: 'white',
                        }
                    },
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'index',
                    intersect: false
                }
            }}
        />
    )

    const vis_30d = (
        <Line
            data = {{
                labels: data_be_30['values'][0]['labels'],
                datasets: [
                    {
                        label: data_be_30['values'][0]['data'][0]['sub'],
                        data: values30[0],
                        borderColor: "rgb(135, 100, 69)",
                        tension: 0.5
                    },
                    {
                        label: data_be_30['values'][0]['data'][1]['sub'],
                        data: values30[1],
                        fill: true,
                        backgroundColor: 'rgba(202, 150, 92, 0.1)',
                        borderColor: "rgb(202, 150, 92)",
                        tension: 0.5
                    },
                    {
                        label: data_be_30['values'][0]['data'][2]['sub'],
                        data: values30[2],
                        fill: true,
                        backgroundColor: 'rgba(238, 195, 115, 0.1)',
                        borderColor: "rgb(238, 195, 115)",
                        tension: 0.5
                    },
                    {
                        label: data_be_30['values'][0]['data'][3]['sub'],
                        data: values30[3],
                        fill: true,
                        backgroundColor: 'rgba(244, 223, 186, 0.1)',
                        borderColor: "rgb(244, 223, 186)",
                        tension: 0.5
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
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'index',
                    intersect: false
                }
            }}
        />
    )

    return (
        <div className="mx-16 my-5">
            <RightSizingComponent rightsizingCat = {rightsizingCat} />

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

const mapStateToProps = (state) => ({instance: state.instance})

export default connect(mapStateToProps, {getInstance})(DataVisPage);