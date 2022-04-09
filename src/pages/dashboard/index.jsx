// Components:
// - toolMenu
// - userProfileIcon
// - cards
// - deleteInstance

import React from 'react';
import Card from "../../components/cards";
import './index.css';

//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

function Dashboard(){    
    const contentMap = {name: "instanceList", values: [
            {name: "Instance 1", id: "de8q9dn9", ipAddress: "192.168.77.43", instanceStatus: "Optimized"},
            {name: "Instance 2", id: "324iorn", ipAddress: "10.0.8.55", instanceStatus: "Overutilized"},
            {name: "Instance 3", id: "f32fplr4", ipAddress: "172.168.9.98", instanceStatus: "Underutilized"},
        ]
    }

    

    return (
        <div className="h-screen">
            <div className="navbar">
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
            </div>

            <div className="grid grid-cols-3 gap-8 items-center h-full mx-16">
                {contentMap.values.map((instance, index) => (
                    <div className="my-10" key={index}>
                        <Card cardContent = {instance} hasOnClick = {true} nextPageRoute = {"/data-vis-page"}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;

