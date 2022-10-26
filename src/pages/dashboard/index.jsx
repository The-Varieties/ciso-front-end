import React, { useEffect, useRef } from 'react';
import './index.css';
import { useState } from 'react';
import InterfaceDropdownMenu from "../../components/interfacemenubar";
import { connect } from 'react-redux';
import { getInstanceList } from '../../store/actions/instanceAction';
import logo from '../../assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';

function Dashboard(props){
	const [loaded, setLoaded] = useState(false)
	const tableRef = useRef(null);
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

	useEffect(() => {
		const intervalId = setInterval(() => {
			props.getInstanceList();
			setContentMap(props.instanceList);
		}, 3000)
		
		return () => clearInterval(intervalId);
	})

	useEffect(() => {
		if(tableRef.current != null) {
			setLoaded(true)
		}
	}, [contentMap.length])

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
			<div className="flex mr-16 xl:mr-0 mt-14">
				<div className="w-96 ml-12 pl-1">
					<img src={logo} alt='logo'></img>
				</div>
				<InterfaceDropdownMenu resetToken = {props.resetToken} />
			</div>

			<div className='mx-16 mt-20'>
				<h1 className={`w-fit text-white text-3xl font-bold`}>{contentMap.length > 0 ? "Chua's List of Instances" : "Loading..."}</h1>
			</div>

			<div className={`flex w-full mt-6 delay-300 duration-1000 transform transition-all ease-out ${loaded ? "opacity-1 translate-y-0" : "opacity-0 translate-y-20"}`}>
				{contentMap.length > 0 
					? 	<table className='border w-full mx-16 text-white' ref={tableRef}>
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
								{props.instanceList.map((data, index) => {
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
					:	<div></div>
				}
			</div>
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