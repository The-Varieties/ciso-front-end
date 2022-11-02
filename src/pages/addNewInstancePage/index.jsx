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
        <div className="bg-pink pt-6 pb-4 px-10 my-24 mx-12 md:my-40 md:mx-96 h-full block border-black border-2 rounded-xl">
            <h2 className='text-pinky-red font-bold text-3xl text-center'>Add New Instance</h2>
            <form>
                <label className='block text-lg mt-5'>AWS Access Key: </label>
                <input type="text" required onChange={addacckey} className="block rounded-md py-2 pl-2 w-full mt-2"/>
                <label className='block text-lg mt-5'>AWS Secret Key: </label>
                <input type="text" onChange={addseckey} className="block rounded-md py-2 pl-2 w-full mt-2"/>
                
                <div className='flex w-full justify-center mt-10'>
                    <button className='btnadd' onClick= {addinstance}>Add Instance</button>
                    <button className='cancelbtn' onClick={(e) => {navigate("/")}}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default connect(null, {addNewInstance})(AddInstance);