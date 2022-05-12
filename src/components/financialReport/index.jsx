// It will show the financial report of the instance by taking the data as parameter
import React from "react";
import './index.css';
import BackArrow from "../../components/backArrow";



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

        <div className="mx-16 relative flex-wrap item-start my-10">
            <div className="lg:w-1/4 w-full lg:pr-3">
                <div className="bg-gray-200 rounded-xl p-6">
                    <h2 className="text-2xl font-bold mb-5">t2.medium</h2>
                    <div className="text-grey-800 leading-relaxed mb-6">

                    </div>
                </div>
            </div>
        </div>
        
        </div>
    )
}

export default FinancialReport;