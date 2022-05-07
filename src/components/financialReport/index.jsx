// It will show the financial report of the instance by taking the data as parameter
import React from "react";
import './index.css';
import BackArrow from "../../components/backArrow";
import instance_image from '../../assets/Images/instance.png';


function FinancialReport(){


    return(
        <div>
        <div class="backarrow">
            <BackArrow backPath = "/dashboard" />
        </div>

        <form class="choose_instance">
            
            <label class="groupby">Group By:</label>
                <select id="instance_type">
                    <option value="t2.micro">t2.micro</option>
                    <option value="t1.small">t1.small</option>
                    <option value="t2.medium">t2.medium</option>
                </select>

            <label class="groupby">Sort By:</label>
                <select id="instance_sort">
                    <option value="red">Ascending Order</option>
                    <option value="orange">Descending Order</option>
                </select>
        </form>

        <div class="total_spent">
            <div class="check_spent">
                <p>Current Spent: </p>
                <p>Optimized Spent:</p>
                <p>Potential Saving:</p>
            </div>
            <div class="cost_spent">
                <p>$100 </p>
                <p>$100 </p>
                <p>$100 </p>
            </div>
        </div>

        <div class="instance_image">
            <img src={instance_image}></img>
        </div>
        
        </div>
    )
}

export default FinancialReport;