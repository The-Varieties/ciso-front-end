import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
import './style.css';
import { useNavigate } from 'react-router-dom';

function AddInstance(){

    const [name,setname] = useState('');
    const [ipaddress, setipadd] = useState('');
    const [securitykey, setsecuritykey] = useState('');
    const [accesskey, setaccesskey] = useState('');

    const addName =(e)=>{
        setname(e.target.value);
    }

    const addIP =(e)=>{
        setipadd(e.target.value);
    }

    const addseckey =(e)=>{
        setsecuritykey(e.target.value);
    }

    const addacckey =(e)=>{
        setaccesskey(e.target.value);
    }

    const handlesubmit=(event)=>{
        console.log(`
        Name:${name}
        IpAddress:${ipaddress}
        Securitykey:${securitykey}
        Accesskey:${accesskey}
        `);
        event.preventDefault();
    }

    let navigate = useNavigate();

    const addinstance = () => {
        alert("A new instance has added!");
    }


    return (
        <div className="AddingInstanceForm">
            <h2>Add New Instance</h2>
            <form>
                <label>Instance Name: </label>
                <input
                type="text"
                required
                />
                <label>IP Address: </label>
                <input
                type="text"
                required
                />
                <label>Security Key: </label>
                <input
                type="text"
                required
                />
                <label>Access Key: </label>
                <input
                type="text"
                required
                />
                <div class="clickbutton">
                    <button className='btnadd' onClick= {addinstance}>Add Instance</button>
                    <button className='cancelbtn' onClick={(e) => {navigate("/")}}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddInstance;