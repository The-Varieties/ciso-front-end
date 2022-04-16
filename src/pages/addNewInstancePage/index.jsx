// Components:
// - formInputField
// - customFormButton

import React from 'react';
import './index.css';

function AddInstance(props){



    return (
        <div class="AddingInstanceForm">
        <form class="form"action="#">
        <h1>Adding Instance</h1>
            <div class="inputContainer">
                <label for="" class="label">Instance Name: </label><br/>
                <input type="text" class="input"></input>
            </div>
            <div class="inputContainer">
                <label for="" class="label">IP Address: </label><br/>
                <input type="text" class="input"></input>
            </div>

            <button  type="submit" class="addbtn" value="Add">Add Instance</button >
        </form>
        </div>
    )
}

export default AddInstance;