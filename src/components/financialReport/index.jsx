// It will show the financial report of the instance by taking the data as parameter
import React, { useState } from "react";
import './index.css';
import BackArrow from "../../components/backArrow";
import data from "./financial-datatest.json";


function FinancialReport(){

    const [financialdata] = useState(data);


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

        <div className="financial-container">
            <table className="findata-table">
            <thead>
            <tr>
                <th>Curret Spent</th>
                <th>Optimized Spent</th>
                <th>Potential Saving</th>
            </tr>
            </thead>
            <tbody>
                {financialdata.map((findatas)=> (
                <tr>
                <td>{findatas.Curret_Spent}</td>
                <td>{findatas.Optimized_Spent}</td>
                <td>{findatas.Potential_Saving}</td>
            </tr>
            ))}
            </tbody>
            </table>
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