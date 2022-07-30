import React, { useEffect } from 'react';
import DashboardCard from '../../components/dashboardCard';
import './index.css';
import { useState } from 'react';
import InterfaceDropdownMenu from "../../components/interfacemenubar";
import { connect } from 'react-redux';
import { getInstanceList } from '../../store/actions/instanceAction';
import logo from '../../assets/Images/logo.png';

function Dashboard(props){
    const [loaded, setLoaded] = useState(false);
    const [contentMap, setContentMap] = useState([]);

    const onLoadFunc = () => {
        setLoaded(true);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            props.getInstanceList();
            setContentMap(props.instanceList);
        }, 3000)
        
        return () => clearInterval(intervalId);
    })

    return (
        <div>
            <div className="navigation mr-20">
                <div className="icon-logo">
                    <img src={logo}></img>
                </div>
                <div className="dropdownbar"> 
                    <InterfaceDropdownMenu />
                </div>
            </div>

            {contentMap.length > 0 ? 
                <div className='mx-16 mt-20'>
                    <h1 className={`w-fit text-white text-3xl font-bold`}>Chua's List of Instances</h1>
                    <div className={`grid grid-cols-3 gap-8 items-center h-full delay-100 duration-1000 transform transition-all ease-out ${loaded ? "opacity-1 translate-y-0" : "opacity-0 translate-y-20"}`} onLoad={onLoadFunc}>
                        {contentMap && contentMap.map((instance, index) => (
                            <div className="my-10" key={index}>
                                <DashboardCard cardContent = {instance} hasOnClick = {true} nextPageRoute = {"/data-vis-page"} />              
                            </div>
                        ))}
                    </div>
                </div>
            :
                <div className='mx-16 mt-20'>
                    <h1 className={`w-fit text-white text-3xl font-bold`}>Loading...</h1>
                </div>
                
            }
        </div>
    )
}

const mapStateToProps = (state) => ({instanceList: state.instance.instanceList})

export default connect(mapStateToProps, {getInstanceList})(Dashboard);