import React, { useEffect } from 'react';
import DashboardCard from '../../components/dashboardCard';
import './index.css';
import { useState } from 'react';
import InterfaceDropdownMenu from "../../components/interfacemenubar";
import { connect } from 'react-redux';
import { getInstanceList } from '../../store/actions/instanceAction';

function Dashboard(props){
    const [loaded, setLoaded] = useState(false);
    const [contentMap, setContentMap] = useState(null);

    const onLoadFunc = () => {
        setLoaded(true);
    }
    
    useEffect(() => {
        props.getInstanceList();
    }, [])

    useEffect(() => {
        const interval = setInterval(async () => {props.getInstanceList();}, 3000)
        setContentMap(props.instanceList);
        return() => {clearInterval(interval)};
    })

    return (
        <div>
            <div className="dropdownbar mr-16"> 
                <InterfaceDropdownMenu />
            </div>

            <div className='mx-16 mt-24'>
                <h1 className={`text-white text-3xl font-bold delay-100 duration-1000 transform transition-all ease-out ${loaded ? "opacity-1 translate-x-0" : "opacity-0 -translate-x-20"}`} onLoad={onLoadFunc}>Username's List of Instances</h1>

                <div className={`grid grid-cols-3 gap-8 items-center h-full delay-100 duration-1000 transform transition-all ease-out ${loaded ? "opacity-1 translate-y-0" : "opacity-0 translate-y-20"}`} onLoad={onLoadFunc}>
                    {contentMap && contentMap.map((instance, index) => (
                        <div className="my-10" key={index}>
                            <DashboardCard cardContent = {instance} hasOnClick = {true} nextPageRoute = {"/data-vis-page"} />              
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({instanceList: state.instance.instanceList})

export default connect(mapStateToProps, {getInstanceList})(Dashboard);