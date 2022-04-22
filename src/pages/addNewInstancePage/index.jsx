// Components:
// - formInputField
// - customFormButton

import React from 'react';
import './style.css';

function AddInstance(props){

    /*
    const addinstance = (x)=>{
        setAdding(x);
    }*/


    return (
        <div class="AddingInstanceForm">
            <form class="form"action="#">
                <h1 className='text-center'>Adding Instance</h1>
                <div class="inputContainer">
                    <label for="" class="label">Instance Name: </label><br/>
                    <input type="text" class="input"></input>
                </div>
                <div class="inputContainer">
                    <label for="" class="label">IP Address: </label><br/>
                    <input type="text" class="input"></input>
                </div>
                <div class="inputContainer">
                    <label for="" class="label">Security Key: </label><br/>
                    <input type="text" class="input"></input>
                </div>
                <div class="inputContainer">
                    <label for="" class="label">Access Key: </label><br/>
                    <input type="text" class="input"></input>
                </div>

                <button  type="submit" class="addbtn" value="Add">Add Instance</button >
            </form>
        </div>
    )
}

export default AddInstance;