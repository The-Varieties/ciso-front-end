import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewInstance } from '../../store/actions/instanceAction';

function AddInstance(props){
    const [newInstanceMap, setNewInstanceMap] = useState({
        instance_name: "",
        instance_ipv4: "",
        // instance_AWSSecretKey: "",
        // instance_AWSAccessKey: ""
    });

    const addName =(e)=>{
        setNewInstanceMap({
            ...newInstanceMap, 
            'instance_name': `${e.target.value}`
        });
    }

    const addIP =(e)=>{
        setNewInstanceMap({
            ...newInstanceMap, 
            'instance_ipv4': `${e.target.value}`
        });
    }

    const addseckey =(e)=>{
        setNewInstanceMap({
            ...newInstanceMap, 
            'instance_AWSSecretKey': `${e.target.value}`
        });
    }

    const addacckey =(e)=>{
        setNewInstanceMap({
            ...newInstanceMap, 
            'instance_AWSAccessKey': `${e.target.value}`
        });
    }

    const handlesubmit=(event)=>{
        event.preventDefault();
        props.addNewInstance(newInstanceMap);
        navigate("/");
    }

    let navigate = useNavigate();

    return (
        <div className="AddingInstanceForm">
            <h2>Add New Instance</h2>
            <form>
                <label>Instance Name: </label>
                <input type="text" required onChange={addName}/>

                <label>IP Address: </label>
                <input type="text" required onChange={addIP}/>

                <label>Security Key: </label>
                <input type="text" onChange={addseckey}/>

                <label>Access Key: </label>
                <input type="text" onChange={addacckey}/>

                <button className='btnadd' onClick={handlesubmit} >Add Instance</button>
                <button className='cancelbtn' onClick={(e) => {navigate("/")}}>Cancel</button>
            </form>
        </div>
    )
}

export default connect(null, {addNewInstance})(AddInstance);