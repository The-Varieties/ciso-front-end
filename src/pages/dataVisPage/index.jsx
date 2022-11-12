import Card from "../../components/cards";
import { useEffect, useState } from 'react';
import RightSizingComponent from "../../components/rightSizingComponent";
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import {useLocation, useNavigate} from "react-router-dom";
import { connect } from "react-redux";
import {
    getInstance,
    getDataVis,
    getUsageCategory, optimizeInstance, resetInstanceList
} from "../../store/actions/instanceAction";
import FinancialSummaryContent from "../../components/financialSummaryContent";
import * as ChartSetting from '../../utils'
import { InstanceDetail } from "../../components/instanceDetail";
import { RecommendationContent } from "../../components/recommendationContent";
import React from 'react';
import {CircularProgress, Dialog} from '@mui/material';
import {GetUserIdFromToken} from "../../utils/tokenDecoder";

function DataVisPage(props) {
    const [checked, setChecked] = useState("24 hours");
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
    const {state} = useLocation();
    const {instanceName, instanceId} = state;
    const [rightsizingCat, setRightsizingCat] = useState([]);
    const [recommendationsList, setRecommendationsList] = useState(null);
    const [vis_cpu, setVis_cpu] = useState(<h2 className="text-white">Loading...</h2>);
    const [vis_ram, setVis_ram] = useState(<h2 className="text-white">Loading...</h2>);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const navigate = useNavigate();
    const userId = GetUserIdFromToken();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(!isButtonClicked) {
                props.getInstance(instanceId);
                props.getDataVis(instanceName, checked)
                props.getUsageCategory(instanceName)
            }
            setRightsizingCat(props.instance.instance_status);
            setRecommendationsList(props.usageCategory.recommendations);

            if(props.visualization) {
                setLabels([])
                for(let i = 0; i < props.visualization.length; i++) {
                    let labelArr = [];
                    for(let j = 0; j < props.visualization[i].data.results[0]['values'].length; j++) {
                        const rawLabel = props.visualization[i].data.results[0]['values'][j][0];

                        if(i === 0) {
                            let splitLabel = rawLabel.split("T")
                            let dateInfo = splitLabel[0].split('-')
                            labelArr.push(`${dateInfo[1]}-${dateInfo[2]} ${splitLabel[1].split("+")[0]}`)
                        } else {
                            labelArr.push(rawLabel.split("T")[0])
                        }
                    }
                    setLabels(labels => [...labels, labelArr]);
                }

                const valArrCPU = [];
                const valArrRAM = [];

                let chosenDataCPU = props.visualization[0].data;
                let chosenDataRAM = props.visualization[1].data;

                if(chosenDataCPU) {
                    for(let i = 0; i < chosenDataCPU.results.length; i++) {
                        for(let j = 0; j < chosenDataCPU.results[i]['values'].length; j++) {
                            const value = chosenDataCPU.results[i]['values'][j][1].split(" ")[0];
            
                            valArrCPU.push(value);
                        }
                    }
                }
                
                if(chosenDataRAM) {
                    for(let i = 0; i < chosenDataRAM.results.length; i++) {
                        for(let j = 0; j < chosenDataRAM.results[i]['values'].length; j++) {
                            const value = chosenDataRAM.results[i]['values'][j][1].slice(0, -3);
        
                            valArrRAM.push(value);
                        }
                    }
                }
                
                const reshapedArrCPU = [];
                const reshapedArrRAM = [];

                if(chosenDataCPU) {
                    for(let i  = 0; i < chosenDataCPU.results.length; i++) {
                        reshapedArrCPU.push(valArrCPU.splice(0, chosenDataCPU.results[0]['values'].length));
                    }
                }
                
                if(chosenDataRAM) {
                    for(let i  = 0; i < chosenDataRAM.results.length; i++) {
                        reshapedArrRAM.push(valArrRAM.splice(0, chosenDataRAM.results[0]['values'].length));
                    }
                }
                
                setValues([])

                setValues(values => [...values, reshapedArrCPU]);
                setValues(values => [...values, reshapedArrRAM]);
            }
        }, 2000)

        return () => clearInterval(intervalId);
    })

    const setLoading = () => {
        setVis_cpu(<h2 className="text-white">Loading...</h2>)
        setVis_ram(<h2 className="text-white">Loading...</h2>)
    }

    const setChartData = (dataset) => {
        setVis_cpu( <Line data = {{ labels: labels[0], datasets: dataset[0] }} options= {ChartSetting.lineChartSetting}/>)
        setVis_ram( <Line data = {{ labels: labels[1], datasets: dataset[1] }} options= {ChartSetting.lineChartSetting}/>)
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

    Chart.register(ChartSetting.annotationLineSetting);

    const handleChangeInstanceType = async (instanceName, instanceId) => {
        setIsButtonClicked(true)

        const optimizedInstanceData = {
            "user_id": userId,
            "instance_id": props.instance.instance_id,
            "target_instance_type": props.usageCategory.recommended_instance_family
        }

        await props.optimizeInstance(optimizedInstanceData)

        props.resetInstanceList()

        navigate('/')
    }

    return (
        <div className="mx-16 my-5">
            <Dialog
                open = {recommendationsList == null
                    ?? props.visualization === undefined
                    ?? props.instance.instance_status === 'Pending'}
                PaperProps={{style: {backgroundColor: 'transparent', boxShadow: 'none'}}}
            >
                <CircularProgress color = "warning"/>
            </Dialog>     

            <Dialog open = {isButtonClicked} PaperProps={{style: {backgroundColor: 'transparent', boxShadow: 'none'}}}>
                <CircularProgress color = "warning"/>
            </Dialog>

            <RightSizingComponent 
                rightsizingCat = {rightsizingCat} 
                checked = {checked} 
                dropdownCallback = {changeTime} 
                dataVisTimeList = {dataVisTimeList}
                loadingSetter = {setIsButtonClicked}
                optimizeButtonHandle = {() => handleChangeInstanceType(instanceName, instanceId)}
            />

            <div className="grid grid-cols-2 gap-16 mt-28 w-full">
                <div className="w-full">
                    <h2 className="text-white text-xl font-medium mb-4">Last {checked} - CPU%</h2>
                    <div className="h-72">{vis_cpu}</div>
                </div>
                
                <div className="w-full">
                    <h2 className="text-white text-xl font-medium mb-4">Last {checked} - RAM (MB)</h2>
                    <div className="h-72">{vis_ram}</div>
                </div>
            </div>

            <div className="mt-20 mb-10 grid grid-cols-6 gap-5">
                <div className="col-span-3"> <Card cardContent = {
                    <InstanceDetail
                        instance = {props.instance}
                        recommendedInstanceType = {props.usageCategory.recommended_instance_family}
                    />
                }/> </div>
                <div className="col-span-3"> <Card cardContent = {<RecommendationContent recommendationsList = {recommendationsList} />} /> </div>
                <div className="col-span-6"> <Card cardContent = {<FinancialSummaryContent />} /> </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    instance: state.instance.instance,
    visualization: state.visualization.visualization,
    usageCategory: state.usageCategory.usageCategory
})

const mapDispatchToProps = {
    getInstance,
    getDataVis,
    getUsageCategory,
    optimizeInstance,
    resetInstanceList
}

export default connect(mapStateToProps, mapDispatchToProps)(DataVisPage);