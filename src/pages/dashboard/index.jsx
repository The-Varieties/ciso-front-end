import React, { useEffect, useRef } from 'react';
import './index.css';
import { useState } from 'react';
import InterfaceDropdownMenu from "../../components/interfacemenubar";
import { connect } from 'react-redux';
import { getInstanceList } from '../../store/actions/instanceAction';
import logo from '../../assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';
import {getUser} from "../../store/actions/userAction";
import {GetUserIdFromToken} from "../../utils/tokenDecoder";
import {resetFinancialReport} from "../../store/actions/financialReportAction";

function Dashboard(props){
	const [loaded, setLoaded] = useState(false)
	const tableRef = useRef(null);
	const [contentMap, setContentMap] = useState([]);
	const userId = GetUserIdFromToken();
	const [isValid, setIsValid] = useState(false);

	let navigate = useNavigate();

	const goNextPage = (instance_name, instance_id) => {
		setContentMap([])
		setIsValid(false)
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
			props.getUser(userId);
			setContentMap(props.instanceList);

			if (props.instanceList.length > 0) {
				props.instanceList.forEach((instance) => {
					if (instance.instance_status !== 'Pending') {
						setIsValid(true)
					}
				})
			}
		}, 3000)

		return () => clearInterval(intervalId);
	}, [props, userId, contentMap])

	useEffect(() => {
		if(tableRef.current != null) {
			setLoaded(true)
		}
		props.resetFinancialReport();
	}, //eslint-disable-next-line
		[contentMap.length])

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
			<div className="block sm:flex mr-16 xl:mr-0 mt-14">
				<div className="w-96 ml-12 pl-1">
					<img src={logo} alt='logo'></img>
				</div>
				<InterfaceDropdownMenu resetToken = {props.resetToken} />
			</div>

			<div className='mx-16 mt-20'>
				<h1 className={`w-fit text-white text-3xl font-bold`}>{isValid ? `${props.userData.user_lastname}'s List of Instances` : "Loading..."}</h1>
			</div>

			<div className={`block flex w-full mt-6 delay-300 duration-1000 transform transition-all ease-out ${isValid ? "opacity-1 translate-y-0" : "opacity-0 translate-y-20"}`}>
				{isValid &&
					<table className='border w-full mx-16 text-white' ref={tableRef}>
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
									data.instance_status !== 'Pending' &&
									<tr className='border text-center' key={data.instance_id}>
										<td className='border'>{data.instance_id}</td>
										<td className='border'>{data.instance_name}</td>
										<td className='border'>{data.instance_ipv4}</td>
										<td className='border'>{data.instance_region}</td>
										<td className='border'>{data.instance_type}</td>
										<td className={`border ${data.instance_status === 'Optimized' ? "text-green-500" : [data.instance_status === 'UnderUtilized' ? "text-yellow-300" : "text-red-600"]}`}>{data.instance_status}</td>
										<td className='border cursor-pointer font-bold hover:text-card-blue duration-300' onClick={() => goNextPage(data.instance_name, data.instance_id)}>View More</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({instanceList: state.instance.instanceList, userData:state.userinfo.userinfo})

export default connect(mapStateToProps, {getInstanceList, getUser, resetFinancialReport})(Dashboard);
