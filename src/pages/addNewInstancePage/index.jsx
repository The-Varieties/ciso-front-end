import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewInstance } from '../../store/actions/instanceAction';

function AddInstance(props){
    const [newInstanceMap, setNewInstanceMap] = useState({
        access_key: "",
        secret_key: ""
    });

    const addseckey =(e)=>{
        setNewInstanceMap({
            ...newInstanceMap, 
            'secret_key': `${e.target.value}`
        });
    }

    const addacckey =(e)=>{
        setNewInstanceMap({
            ...newInstanceMap, 
            'access_key': `${e.target.value}`
        });
    }

    let navigate = useNavigate();

    const addinstance = (event) => {
        event.preventDefault();
        props.addNewInstance(newInstanceMap);
        alert("A new instance has added!");
        navigate("/");
    }

    return (
        <div className="AddingInstanceForm">
            <h2>Add New Instance</h2>
            <form>
                <label>AWS Access Key: </label>
                <input type="text" required onChange={addacckey}/>

                <label>AWS Secret Key: </label>
                <input type="text" onChange={addseckey}/>

                {/* <label>AWS Session Token: </label>
                <input type="text" required onChange={addsesskey}/> */}

                <div class="clickbutton">
                    <button className='btnadd' onClick= {addinstance}>Add Instance</button>
                    <button className='cancelbtn' onClick={(e) => {navigate("/")}}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default connect(null, {addNewInstance})(AddInstance);