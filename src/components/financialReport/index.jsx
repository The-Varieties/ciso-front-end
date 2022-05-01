// It will show the financial report of the instance by taking the data as parameter
import React from "react";
import financialimg from '../../assets/Images/financialreport.png'
import './index.css';
import BackArrow from "../../components/backArrow";


function FinancialReport(){


    return(
        <div class="">
            
            <div class="backarrow">
            <BackArrow />
            </div>

            <div className="mx-40">
                <img src={financialimg}></img>
            </div>
        </div>
    )
}

export default FinancialReport;