import React from "react";
import './index.css';
import BackArrow from "../../components/backArrow";


function DatabasePage(){


    return(
        <div class="">
            
            <div class="backarrow">
            <BackArrow />
            </div>

            <table>
            <tr>
                <th>Name</th>
                <th>RAM</th>
                <th>Storage</th>
                <th>CPU</th>
                <th>IPv4</th>
            </tr>
            <tr>
                <td>Instance 1</td>
                <td>4 GB</td>
                <td>12 GB</td>
                <td>t2.xlarge</td>
                <td>192.168.0.0</td>
            </tr>
            <tr>
                
            </tr>
            <tr>
                <td>Instance 2</td>
                <td>1 GB</td>
                <td>2 GB</td>
                <td>t2.micro</td>
                <td>164.172.66.55</td>
            </tr>
            <tr>
                <td>Instance 3</td>
                <td>2 GB</td>
                <td>6 GB</td>
                <td>t2.small</td>
                <td>77.156.66.40</td>
            </tr>
            <tr>
                <td>Instance 4</td>
                <td>1 GB</td>
                <td>4 GB</td>
                <td>t2.medium</td>
                <td>22.22.65.141</td>
            </tr>
            </table>
        </div>
    )
}

export default DatabasePage;