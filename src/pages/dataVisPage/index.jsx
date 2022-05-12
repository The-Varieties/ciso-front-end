import Card from "../../components/cards";
import { useEffect, useState } from 'react';
import RightSizingComponent from "../../components/rightSizingComponent";
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getInstance, getDataVis } from "../../store/actions/instanceAction";

function DataVisPage(props) {
    const [checked, setChecked] = useState("cpu");
    const [chosenRadio, setChosenRadio] = useState(0);
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
    const {state} = useLocation();
    const {instanceName, instanceId} = state;
    const [rightsizingCat, setRightsizingCat] = useState([]);
    const [recommendationsList, setRecommendationsList] = useState(null);
    const [vis_24, setVis_24] = useState(<h2 className="text-white">Loading...</h2>);
    const [vis_7d, setVis_7d] = useState(<h2 className="text-white">Loading...</h2>);
    const [vis_30d, setVis_24d] = useState(<h2 className="text-white">Loading...</h2>);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            props.getInstance(instanceId);
            props.getDataVis(instanceName, checked)
            setRightsizingCat(props.instance.instance_status[2]);

            setRecommendationsList(null)
            setRecommendationsList(props.instance.instance_status[3]);

            if(props.visualization) {
                setLabels([])
                for(let i = 0; i < props.visualization.length; i++) {
                    let labelArr = [];
                    for(let j = 0; j < props.visualization[i].data.results[0]['values'].length; j++) {
                        const rawLabel = props.visualization[i].data.results[0]['values'][j][0];

                        if(i == 0) {
                            labelArr.push(rawLabel.split("T")[1].split("+")[0])
                        } else {
                            labelArr.push(rawLabel.split("T")[0])
                        }
                        
                        setLabels(labels => [...labels, labelArr]);
                    }
                }
            }

            const valArr = [];
            const valArr7 = [];
            const valArr30 = [];

            let chosenData = props.visualization[0].data;
            let chosenData7 = props.visualization[1].data;
            let chosenData30 = props.visualization[2].data;

            if(chosenData) {
                for(let i = 0; i < chosenData.results.length; i++) {
                    for(let j = 0; j < chosenData.results[i]['values'].length; j++) {
                        const value = chosenData.results[i]['values'][j][1].split(" ")[0];

                        console.log(value)
        
                        valArr.push(value);
                    }
                }
            }
            
            if(chosenData7) {
                for(let i = 0; i < chosenData7.results.length; i++) {
                    for(let j = 0; j < chosenData7.results[i]['values'].length; j++) {
                        const value = chosenData7.results[i]['values'][j][1].slice(0, -3);
    
                        valArr7.push(value);
                    }
                }
            }

            if(chosenData30) {
                for(let i = 0; i < chosenData30.results.length; i++) {
                    for(let j = 0; j < chosenData30.results[i]['values'].length; j++) {
                        const value = chosenData30.results[i]['values'][j][1];
    
                        valArr30.push(value);
                    }
                }
            }
            
            const reshapedArr = [];
            const reshapedArr7 = [];
            const reshapedArr30 = [];

            if(chosenData) {
                for(let i  = 0; i < chosenData.results.length; i++) {
                    reshapedArr.push(valArr.splice(0, chosenData.results[0]['values'].length));
                }
            }
            
            if(chosenData7) {
                for(let i  = 0; i < chosenData7.results.length; i++) {
                    reshapedArr7.push(valArr7.splice(0, chosenData7.results[0]['values'].length));
                }
            }
            
            if(chosenData30) {
                for(let i  = 0; i < chosenData30.results.length; i++) {
                    reshapedArr30.push(valArr30.splice(0, chosenData30.results[0]['values'].length));
                }
            }
            
            setValues([])

            setValues(values => [...values, reshapedArr]);
            setValues(values => [...values, reshapedArr7]);
            setValues(values => [...values, reshapedArr30]);
        }, 2000)

        return () => clearInterval(intervalId);
    })

    useEffect(() => {
        if(props.visualization) {
            let data = []
            let color_swatches = [
                "rgb(135, 100, 69)",
                "rgb(202, 150, 92)",
                "rgb(238, 195, 115)",
                "rgb(244, 223, 186)",
            ]

            for(let i = 0; i < props.visualization[0].data.results.length; i++) {
                data.push({
                    label: props.visualization[0].data.results[i]['sub'],
                    data: values[0][i],
                    tension: 0.2,
                    borderColor: color_swatches[i],
                    fill: true,
                })
            }

            {props.visualization[0].data.name != checked ? 
                setVis_24(<h2 className="text-white">Loading...</h2>)
            : 
                setVis_24(
                    <Line
                        data = {{
                            labels: labels[0],
                            datasets: data,
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
            }
        }
    }, [values])
    
    const toggleRadio = (e) => {
        setChecked(e.target.value);
        
        if(e.target.value === 'CPU') {
            setChosenRadio(0)
            setValues([])
        } else if(e.target.value === 'Memory') {
            setChosenRadio(1)
            setValues([])
        }

        setVis_24(<h2 className="text-white">Loading...</h2>)
    }

    const instanceDetail = {'name': 'instanceDetail', 'value': [
        {'title': 'Name', 'content': props.instance.instance_name},
        {'title': 'IPv4', 'content': props.instance.instance_ipv4},
        {'title': 'Region', 'content': props.instance.instance_region},
        {'title': 'Operating System', 'content': props.instance.instance_os},
        {'title': 'Volume Type', 'content': props.instance.instance_volume_type},
        {'title': 'Instance Type', 'content': props.instance.instance_type},
        {'title': 'Pricing Plan', 'content': props.instance.instance_pricing_plan},
    ]}

    const content = (
        <div>
            <h2 className="text-black w-fit font-bold text-2xl">Chosen Component</h2>

            <div className="flex mt-2">
                <div className="flex align-baseline mr-12">
                    <input type="radio" id="cpu_radio" name="cpu_radio" value="cpu" className="w-5 h-5 my-auto" checked={checked === "cpu"} onChange={toggleRadio}/>
                    <label htmlFor="cpu_radio" className="text-base ml-2">CPU</label>
                </div>

                <div className="flex align-baseline mr-12">
                    <input type="radio" id="ram_radio" name="ram_radio" value="ram" className="w-5 h-5 my-auto" checked={checked === "ram"} onChange={toggleRadio}/>
                    <label htmlFor="ram_radio" className="text-base ml-2">RAM</label>
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

            {(recommendationsList != null ? 
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

    // const vis_7d = (
    //     <Line
    //         data = {{
    //             labels: data_be_7['values'][0]['labels'],
    //             datasets: [
    //                 {
    //                     label: data_be_7['values'][0]['data'][0]['sub'],
    //                     data: values7[0],
    //                     borderColor: "rgb(135, 100, 69)",
    //                     tension: 0.5
    //                 },
    //                 {
    //                     label: data_be_7['values'][0]['data'][1]['sub'],
    //                     data: values7[1],
    //                     fill: true,
    //                     backgroundColor: 'rgba(202, 150, 92, 0.1)',
    //                     borderColor: "rgb(202, 150, 92)",
    //                     tension: 0.5
    //                 },
    //                 {
    //                     label: data_be_7['values'][0]['data'][2]['sub'],
    //                     data: values7[2],
    //                     fill: true,
    //                     backgroundColor: 'rgba(238, 195, 115, 0.1)',
    //                     borderColor: "rgb(238, 195, 115)",
    //                     tension: 0.5
    //                 },
    //                 {
    //                     label: data_be_7['values'][0]['data'][3]['sub'],
    //                     data: values7[3],
    //                     fill: true,
    //                     backgroundColor: 'rgba(244, 223, 186, 0.1)',
    //                     borderColor: "rgb(244, 223, 186)",
    //                     tension: 0.5
    //                 }
    //             ]
    //         }}
    //         options= {{
    //             responsive: true,
    //             maintainAspectRatio: false,
    //             plugins: {
    //                 legend: {
    //                     position: 'right',
    //                     labels: {
    //                         padding: 30,
    //                         color: 'white'
    //                     }                        
    //                 }
    //             },
    //             scales: {
    //                 y: {
    //                     grid: {
    //                         color: 'rgba(47,79,79,0.3)',
    //                         borderColor: 'white'
    //                     },
    //                     ticks: {
    //                         color: 'white',
    //                     },
    //                     max: 100,
    //                     min: 0,
    //                 },
    //                 x: {
    //                     grid: {
    //                         color: 'rgba(47,79,79,0.3)',
    //                         borderColor: 'white'
    //                     },
    //                     ticks: {
    //                         color: 'white',
    //                     }
    //                 },
    //             },
    //             interaction: {
    //                 mode: 'index',
    //                 intersect: false
    //             },
    //             tooltips: {
    //                 mode: 'index',
    //                 intersect: false
    //             },
    //             hover: {
    //                 mode: 'index',
    //                 intersect: false
    //             }
    //         }}
    //     />
    // )

    // const vis_30d = (
    //     <Line
    //         data = {{
    //             labels: data_be_30['values'][0]['labels'],
    //             datasets: [
    //                 {
    //                     label: data_be_30['values'][0]['data'][0]['sub'],
    //                     data: values30[0],
    //                     borderColor: "rgb(135, 100, 69)",
    //                     tension: 0.5
    //                 },
    //                 {
    //                     label: data_be_30['values'][0]['data'][1]['sub'],
    //                     data: values30[1],
    //                     fill: true,
    //                     backgroundColor: 'rgba(202, 150, 92, 0.1)',
    //                     borderColor: "rgb(202, 150, 92)",
    //                     tension: 0.5
    //                 },
    //                 {
    //                     label: data_be_30['values'][0]['data'][2]['sub'],
    //                     data: values30[2],
    //                     fill: true,
    //                     backgroundColor: 'rgba(238, 195, 115, 0.1)',
    //                     borderColor: "rgb(238, 195, 115)",
    //                     tension: 0.5
    //                 },
    //                 {
    //                     label: data_be_30['values'][0]['data'][3]['sub'],
    //                     data: values30[3],
    //                     fill: true,
    //                     backgroundColor: 'rgba(244, 223, 186, 0.1)',
    //                     borderColor: "rgb(244, 223, 186)",
    //                     tension: 0.5
    //                 }
    //             ]
    //         }}
    //         options= {{
    //             responsive: true,
    //             maintainAspectRatio: false,
    //             plugins: {
    //                 legend: {
    //                     position: 'right',
    //                     labels: {
    //                         padding: 30,
    //                         color: 'white'
    //                     }
    //                 }
    //             },
    //             scales: {
    //                 y: {
    //                     grid: {
    //                         color: 'rgba(47,79,79,0.3)',
    //                         borderColor: 'white'
    //                     },
    //                     ticks: {
    //                         color: 'white',
    //                     },
    //                     min: 0,
    //                     max: 100
    //                 },
    //                 x: {
    //                     grid: {
    //                         color: 'rgba(47,79,79,0.3)',
    //                         borderColor: 'white'
    //                     },
    //                     ticks: {
    //                         color: 'white',
    //                     }
    //                 }
    //             },
    //             interaction: {
    //                 mode: 'index',
    //                 intersect: false
    //             },
    //             tooltips: {
    //                 mode: 'index',
    //                 intersect: false
    //             },
    //             hover: {
    //                 mode: 'index',
    //                 intersect: false
    //             }
    //         }}
    //     />
    // )

    return (
        <div className="mx-16 my-5">
            <RightSizingComponent rightsizingCat = {rightsizingCat} />

            <div className="block mt-20">
                <div className="w-full ml-2">
                    <h2 className="text-white text-xl font-medium mb-4">Last 24 Hours - {checked.toUpperCase()}{checked === "cpu" ? "%" : " (MB)"}</h2>
                    <div className="h-72">{vis_24}</div>
                </div>
                
                <div className="w-full mt-10">
                    <h2 className="text-white text-xl font-medium mb-4">Last 7 Days - {checked.toUpperCase()}{checked === "cpu" ? "%" : " (MB)"}</h2>
                    <div className="h-72">{vis_7d}</div>
                </div>

                {/* <div className="w-full mt-10">
                    <h2 className="text-white text-xl font-medium mb-4">Last 30 Days - {checked}%</h2>
                    <div className="h-72">{vis_30d}</div>
                </div> */}
            </div>

            <div className="mt-20 mb-10 grid grid-cols-5 gap-5">
                <div className="col-span-3"> <Card cardContent = {content} /> </div>
                <div className="col-span-2"> <Card cardContent = {recommendationContent} /> </div>
                <div className="col-span-5"> <Card cardContent = {financialContent} /> </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({instance: state.instance.instance, visualization: state.visualization.visualization})

const mapDispatchToProps = {getInstance, getDataVis}

export default connect(mapStateToProps, mapDispatchToProps)(DataVisPage);