import React from "react";
import database from '../../assets/Images/database.png';
import BackArrow from "../../components/backArrow";


function DatabasePage(){


    return(
        <div class="">
            
            <div class="backarrow">
            <BackArrow />
            </div>

            <div className="mx-40">
                <img src={database}></img>
            </div>
        </div>
    )
}

export default DatabasePage;