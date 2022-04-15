// Components:
// - toolMenu
// - userProfileIcon
// - cards
// - deleteInstance

import React from 'react';
import DashboardCard from '../../components/dashboardCard';
import './index.css';
import { useState } from 'react';

function Dashboard(){
    const [loaded, setLoaded] = useState(false);

    const onLoadFunc = () => {
        setLoaded(true);
    }

    const contentMap = {name: "instanceList", values: [
            {name: "Instance 1", id: "de8q9dn9", ipAddress: "192.168.77.43", instanceStatus: "Optimized"},
            {name: "Instance 2", id: "324iorn", ipAddress: "10.0.8.55", instanceStatus: "Overutilized"},
            {name: "Instance 3", id: "f32fplr4", ipAddress: "172.168.9.98", instanceStatus: "Underutilized"},
        ]
    }

    return (
        <div>
            {/* <div className="navbar">
                <a href="#">NeXphos</a>
                    <div className="subnav">
                        <button className="subnavbtn">Profile <i className="fa fa-caret-down" /></button>
                        <div className="subnav-content">
                            <a href="#bring">View Profile</a>
                            <a href="#deliver">Logout</a>
                        </div>
                    </div>
                    <div className="subnav">
                        <button className="subnavbtn">Instance Module <i className="fa fa-caret-down" /></button>
                        <div className="subnav-content">
                            <a href="#">Add Instance</a>
                            <a href="#">Delete Instance</a>
                            <a href="#">Database</a>
                            <a href="#">Financial System</a>
                        </div>
                    </div>
            </div> */}

            <div className='mx-16 mt-32'>
                <h1 className={`text-white text-3xl font-bold delay-100 duration-1000 transform transition-all ease-out ${loaded ? "opacity-1 translate-x-0" : "opacity-0 -translate-x-20"}`} onLoad={onLoadFunc}>Username's List of Instances</h1>

                <div className={`grid grid-cols-3 gap-8 items-center h-full delay-100 duration-1000 transform transition-all ease-out ${loaded ? "opacity-1 translate-y-0" : "opacity-0 translate-y-20"}`} onLoad={onLoadFunc}>
                    {contentMap.values.map((instance, index) => (
                        <div className="my-10" key={index}>
                            <DashboardCard cardContent = {instance} hasOnClick = {true} nextPageRoute = {"/data-vis-page"}/>              
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

//instance.instanceStatus === "Optimized" ? "#4BE16C" : (instance.instanceStatus === "Underutilized" ? "#FDF44D" : "#FF2929")