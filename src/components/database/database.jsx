import React, { useState }  from "react";
import './index.css';
import BackArrow from "../../components/backArrow";
import data from "./testing-data.json";


const DatabasePage=()=>{

    const [passdatabases] = useState(data);
    const [selectedDate, setDate] = useState();

    return(
        <div>
            <div class="backarrow">
            <BackArrow backPath = "/"/>
            </div>

            <input type="date" onChange={e=>setDate(e.target.value)}></input>

            <div className="database-container">
            <table className="db-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>RAM</th>
                <th>Storage</th>
                <th>CPU</th>
                <th>IPv4</th>
            </tr>
            </thead>
            <tbody>
                {passdatabases.map((passdatabase)=> (
                <tr>
                <td>{passdatabase.Name}</td>
                <td>{passdatabase.RAM}</td>
                <td>{passdatabase.Storage}</td>
                <td>{passdatabase.CPU}</td>
                <td>{passdatabase.IPv4}</td>
            </tr>
            ))}
            </tbody>
            </table>
            </div>
        </div>
    );
};

export default DatabasePage;