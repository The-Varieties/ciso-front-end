// It will show the financial report of the instance by taking the data as parameter
import React, { useState } from "react";
import './index.css';
import BackArrow from "../../components/backArrow";
import fdata from "./financial-datatest.json";
import ldata from "./list-data.json";


function FinancialReport(){

    const [financialdata] = useState(fdata);
    const [financiallistdata] = useState(ldata);


    return(
        <div>
        <div class="mt-6 ml-8">
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

        <div class="financiallist-container">
            <table class="findatalist-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Instance Name</th>
                    <th>RAM</th>
                    <th>CPU</th>
                    <th>Expenses</th>
                </tr>
            </thead>
            <tbody>
                {financiallistdata.map((listdatas)=> (
                <tr>
                    <td>{listdatas.ID}</td>
                    <td>{listdatas.Instance_Name}</td>
                    <td>{listdatas.RAM}</td>
                    <td>{listdatas.CPU}</td>
                    <td>{listdatas.Expenses}</td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
        
        </div>
    )
}

export default FinancialReport;