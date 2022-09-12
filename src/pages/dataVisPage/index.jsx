import Card from "../../components/cards";
import { useEffect, useState } from 'react';
import { RightSizingComponent } from "../../components/rightSizingComponent";
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getInstance, getDataVis, getUsageCategory } from "../../store/actions/instanceAction";
import { FinancialSummaryContent } from "../../components/financialSummaryContent";
import * as ChartSetting from '../../utils'
import { InstanceDetail } from "../../components/instanceDetail";
import { RecommendationContent } from "../../components/recommendationContent";

function DataVisPage(props) {
    const [checked, setChecked] = useState("24 hours");
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
    const {state} = useLocation();
    const {instanceName, instanceId} = state;
    const [rightsizingCat, setRightsizingCat] = useState([]);
    const [recommendationsList, setRecommendationsList] = useState(null);
    const [vis_24, setVis_24] = useState(<h2 className="text-white">Loading...</h2>);
    const [vis_7d, setVis_7d] = useState(<h2 className="text-white">Loading...</h2>);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            props.getInstance(instanceId);
            props.getDataVis(instanceName, checked)
            props.getUsageCategory(instanceName, checked)
            setRightsizingCat(props.instance.instance_status);
            setRecommendationsList(props.usageCategory.recommendations);

            if(props.visualization) {
                setLabels([])
                for(let i = 0; i < props.visualization.length; i++) {
                    let labelArr = [];
                    for(let j = 0; j < props.visualization[i].data.results[0]['values'].length; j++) {
                        const rawLabel = props.visualization[i].data.results[0]['values'][j][0];

                        if(i === 0) {
                            labelArr.push(rawLabel.split("T")[1].split("+")[0])
                        } else {
                            labelArr.push(rawLabel.split("T")[0])
                        }
                    }
                    setLabels(labels => [...labels, labelArr]);
                }

                const valArr = [];
                const valArr7 = [];

                let chosenData = props.visualization[0].data;
                let chosenData7 = props.visualization[1].data;

                if(chosenData) {
                    for(let i = 0; i < chosenData.results.length; i++) {
                        for(let j = 0; j < chosenData.results[i]['values'].length; j++) {
                            const value = chosenData.results[i]['values'][j][1].split(" ")[0];
            
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
                
                const reshapedArr = [];
                const reshapedArr7 = [];

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
                
                setValues([])

                setValues(values => [...values, reshapedArr]);
                setValues(values => [...values, reshapedArr7]);
            }
        }, 2000)

        return () => clearInterval(intervalId);
    })

    const setLoading = () => {
        setVis_24(<h2 className="text-white">Loading...</h2>)
        setVis_7d(<h2 className="text-white">Loading...</h2>)
    }

    const setChartData = (dataset) => {
        setVis_24( <Line data = {{ labels: labels[0], datasets: dataset[0] }} options= {ChartSetting.lineChartSetting}/>)
        setVis_7d( <Line data = {{ labels: labels[1], datasets: dataset[1] }} options= {ChartSetting.lineChartSetting}/>)
    }

    useEffect(() => {
        if(props.visualization && values.length > 0) {
            let dataset = []
            let color_swatches = [
                "rgb(135, 100, 69)",
                "rgb(202, 150, 92)",
                "rgb(238, 195, 115)",
                "rgb(244, 223, 186)",
            ]

            for(let i = 0; i < props.visualization.length; i++) {
                let data = []
                for(let j = 0; j < props.visualization[i].data.results.length; j++) {
                    data.push({
                        label: props.visualization[i].data.results[j]['sub'],
                        data: values[0][j],
                        tension: 0.2,
                        borderColor: color_swatches[j],
                        fill: true,
                    })
                }
                dataset.push(data)
            }
            
            props.visualization[0].data.time !== `last ${checked}` ? setLoading() : setChartData(dataset)
        }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values])
    
    const changeTime = (e) => {
        setChecked(e.target.attributes.value.value);
        setValues([])
        setLoading();
    }

    const dataVisTimeList = {name: "dataVisTimeList", values: [
            {menuName: "24 hours"},
            {menuName: '7 days'},
            {menuName: "30 days"},
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

    return (
        <div className="mx-16 my-5">
            <RightSizingComponent 
                rightsizingCat = {rightsizingCat} 
                checked = {checked} 
                dropdownCallback = {changeTime} 
                dataVisTimeList = {dataVisTimeList}
            />

            <div className="grid grid-cols-2 gap-16 mt-28 w-full">
                <div className="w-full">
                    <h2 className="text-white text-xl font-medium mb-4">Last {checked} - CPU%</h2>
                    <div className="h-72">{vis_24}</div>
                </div>
                
                <div className="w-full">
                    <h2 className="text-white text-xl font-medium mb-4">Last {checked} - RAM (MB)</h2>
                    <div className="h-72">{vis_7d}</div>
                </div>
            </div>

            <div className="mt-20 mb-10 grid grid-cols-5 gap-5">
                <div className="col-span-3"> <Card cardContent = {<InstanceDetail instance = {props.instance} />} /> </div>
                <div className="col-span-2"> <Card cardContent = {<RecommendationContent recommendationsList = {recommendationsList} />} /> </div>
                <div className="col-span-5"> <Card cardContent = {<FinancialSummaryContent />} /> </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({instance: state.instance.instance, visualization: state.visualization.visualization, usageCategory: state.usageCategory.usageCategory})

const mapDispatchToProps = {getInstance, getDataVis, getUsageCategory}

export default connect(mapStateToProps, mapDispatchToProps)(DataVisPage);