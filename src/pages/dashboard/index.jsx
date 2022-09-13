import React, { useEffect } from 'react';
import './index.css';
import { useState } from 'react';
import InterfaceDropdownMenu from "../../components/interfacemenubar";
import { connect } from 'react-redux';
import { getInstanceList } from '../../store/actions/instanceAction';
import logo from '../../assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';

function Dashboard(props){
    const [loaded, setLoaded] = useState(true);
    const [contentMap, setContentMap] = useState([]);

    let navigate = useNavigate();

    const goNextPage = (instance_name, instance_id) => {
        navigate('/data-vis-page', { 
            state: {
                instanceName: instance_name, 
                instanceId: instance_id
            }
        });
    }

    const onLoadFunc = () => {
        setLoaded(false);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            props.getInstanceList();
            setContentMap(props.instanceList);
        }, 3000)
        
        return () => clearInterval(intervalId);
    })

    const tableHeadingList = {name: "tableHeadingList", values: [
        'ID',
        'Name',
        'ipv4',
        'Region',
        'Instance Type',
        'Status',
        'Detail'
    ]}

    return (
        <div className='block'>
            <div className="navigation mr-20">
                <div className="icon-logo">
                    <img src={logo} alt='logo'></img>
                </div>
                <div className="dropdownbar"> 
                    <InterfaceDropdownMenu />
                </div>
            </div>

            {contentMap.length > 0 ? 
                <div className='block w-full mt-20'>
                    <h1 className={`w-fit text-white text-3xl font-bold ml-16`}>Chua's List of Instances</h1>

                    <div className='flex w-full mt-6'>
                        <table className='border w-full mx-16 text-white'>
                            <thead className='border'>
                                <tr>
                                    {tableHeadingList.values.map((heading) => {
                                        return(
                                            <th className='border' key={heading}>{heading}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody className='border'>
                                {props.instanceList.map((data) => {
                                    return(
                                        <tr className='border text-center' key={data.instance_id}>
                                            <td className='border'>{data.instance_id}</td>
                                            <td className='border'>{data.instance_name}</td>
                                            <td className='border'>{data.instance_ipv4}</td>
                                            <td className='border'>{data.instance_region}</td>
                                            <td className='border'>{data.instance_type}</td>
                                            <td className='border'>{data.instance_status[2]}</td>   
                                            <td className='border cursor-pointer font-bold hover:text-card-blue duration-300' onClick={() => goNextPage(data.instance_name, data.instance_id)}>View More</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
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

/*
Code Reference

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

*/