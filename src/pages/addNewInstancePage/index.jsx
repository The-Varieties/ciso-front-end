// Components:
// - formInputField
// - customFormButton

import React from 'react';
import './style.css';

function AddInstance(){

    //const {adding, handleSubmit} = useForm();

    return (
        <div class="AddingInstanceForm">
            <form class="form" action="#">
                <p class='heading'><strong>Adding Instance</strong></p>
                <div class="inputContainer">
                    <label for="" class="labeltext">Instance Name: </label><br/>
                    <input type="text" class="inputtext"></input>
                </div>
                <div class="inputContainer">
                    <label for="" class="labeltext">Ip Address: </label><br/>
                    <input type="text" class="inputtext"></input>
                </div>

                <button  type="submit" class="addbtn" value="Add">Add Instance</button >
                <button  type="submit" class="cancelbtn" value="cancel">Cancel</button >
            </form>
        </div>
    )
}

export default AddInstance;