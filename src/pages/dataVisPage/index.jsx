import Card from "../../components/cards";
import pie_chart from "../../assets/DummyImages/pie_chart.svg";
import line_graph from "../../assets/DummyImages/line_graph.svg";
import { useEffect, useState } from 'react';
import RightSizingComponent from "../../components/rightSizingComponent";
import RadioInput from "../../components/radioInput";

function DataVisPage() {
    const [checked, setChecked] = useState("RAM");

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const toggleRadio = (e) => {
        setChecked(e.target.value);
    }

    const instanceDetail = {'name': 'instanceDetail', 'value': [
        {'title': 'Region', 'content': 'Asia Pacific (Jakarta)'},
        {'title': 'Operating System', 'content': 'Linux'},
        {'title': 'On-Demand Hourly Cost', 'content': '1.53'},
        {'title': '1 YR Std Reserved Hourly Cost', 'content': '0.964'},
        {'title': 'Pricing Plan', 'content': 'EC2 Instance Savings Plan'},
        {'title': 'Reservation Term', 'content': '1 Year'},
        {'title': 'Payment Option', 'content': 'No Upfront'},
        {'title': 'EBS Volume Storage Type', 'content': 'General Purpose SSD (gp2)'},
    ]}

    const recommendationData = {'name': 'recommendationData', 'value': [
        {
            'title': 'Downsize RAM from 8GB to 2GB', 
            'content':  `
                            You might want to downsize your RAM from 8GB to 2GB to cut down some cost as shown on the Financial Report.
                            Downsizing your RAM into the most optimal usage will not make your instance to be slower yet it is still in the range that is appropriate according to your usage.
                        `
        },
        {
            'title': 'Downsize CPU from 4 CPUs to 2 CPUs', 
            'content':  `
                            You might want to downsize your CPU from using 4 CPUs to 2 CPUs only to cut down some cost as shown on the Financial Report.
                            Downsizing your CPU into the most optimal usage will not make your instance to be slower yet it is still in the range that is appropriate according to your usage.
                        `
        },
    ]}

    const content = (
        <div>
            <h2 className="text-black w-fit font-bold text-3xl">Chosen Component</h2>

            <div className="flex">
                <div className="mt-5 flex align-baseline mr-12">
                    <input type="radio" id="ram_radio" name="ram_radio" value="RAM" className="w-5 h-5 my-auto" checked={checked === "RAM"} onChange={toggleRadio}/>
                    <label htmlFor="ram_radio" className="text-xl ml-2">RAM</label>
                </div>

                <div className="mt-5 flex align-baseline mr-12">
                    <input type="radio" id="cpu_radio" name="cpu_radio" value="CPU" className="w-5 h-5 my-auto" checked={checked === "CPU"} onChange={toggleRadio}/>
                    <label htmlFor="cpu_radio" className="text-xl ml-2">CPU</label>
                </div>

                <div className="mt-5 flex align-baseline mr-12">
                    <input type="radio" id="disk_radio" name="disk_radio" value="Disk" className="w-5 h-5 my-auto" checked={checked === "Disk"} onChange={toggleRadio}/>
                    <label htmlFor="disk_radio" className="text-xl ml-2">Disk</label>
                </div>

                <div className="mt-5 flex align-baseline mr-12">
                    <input type="radio" id="network_radio" name="network_radio" value="Network" className="w-5 h-5 my-auto" checked={checked === "Network"} onChange={toggleRadio}/>
                    <label htmlFor="network_radio" className="text-xl ml-2">Network</label>
                </div>
            </div>

            <div className="py-10">
                <div className="w-full border-t border-gray-500"></div>
            </div>

            <h2 className="text-black w-fit font-bold text-3xl mb-2">Instance Details</h2>
            {instanceDetail && instanceDetail.value.map((instance, index) => (
                <p key={index}><span className="font-bold">{instance.title}:</span> {instance.content}</p>
            ))}
        </div>
    )

    const financeTable = (
        <table>
            <tbody>
                <tr>
                    <td className="font-bold italic">Current Spending</td>
                </tr>
                <tr>
                    <td>Amazon Elastic Block Storage (EBS)</td>
                    <td className="text-right w-32">703.73 USD</td>
                </tr>
                <tr>
                    <td>Amazon EC2 Instance Savings Plans Instances</td>
                    <td className="text-right">3.00 USD</td>
                </tr>
                <tr>
                    <td className="font-bold italic text-right">Sub-total:</td>
                    <td className="font-bold text-right">706.73 USD</td>
                </tr>
                <tr className="h-2"></tr>
                <tr>
                    <td className="font-bold italic">Recommended Rightsizing with Spending</td>
                </tr>
                <tr>
                    <td>Reduce Number of Allocated CPUs to 2 CPUs</td>
                    <td className="text-right">-100.00 USD</td>
                </tr>
                <tr>
                    <td className="font-bold italic text-right">Sub-total:</td>
                    <td className="font-bold text-right">-100.00 USD</td>
                </tr>
                <tr className="h-2"></tr>
                <tr>
                    <td className="font-bold italic">Spending After Rightsizing</td>
                </tr>
                <tr>
                    <td>Current Spending</td>
                    <td className="text-right">706.73 USD</td>
                </tr>
                <tr>
                    <td>Recommended Rightsizing Spending</td>
                    <td className="text-right">-100.00 USD</td>
                </tr>
                <tr>
                    <td className="font-bold italic text-right">Sub-total:</td>
                    <td className="font-bold text-right">606.73 USD</td>
                </tr>
            </tbody>
        </table>
    )

    const financialContent = (
        <div>
            <h2 className="w-fit font-bold text-3xl mb-2">Financial Report (Year)</h2>
            <div className="flex w-full">
                {financeTable}

                <div className="flex mx-auto my-auto">
                    <div className="block">
                        <p className="font-bold text-3xl">You can save your</p>
                        <p className="text-right font-bold text-3xl">budget up to</p>
                    </div>
                    <p className="font-bold text-7xl ml-2">14.15%</p>
                </div>
            </div>
            

        </div>
    )

    const recommendationContent = (
        <div>
            <h2 className="text-black w-fit font-bold font-italic text-3xl">Recommendation </h2>

            {recommendationData && recommendationData.value.map((recommendation, index) => (
                <div className="mt-5" key={index}>
                    <h2 className="text-indigo-800 w-fit font-black text-xl">{recommendation.title}</h2>
                    <p className="text-black w-fit text-base">{recommendation.content}</p>
                </div>
            ))}
        </div>
    )

    return (
        <div className="mx-16 my-5">
            {/* <RightSizingComponent /> */}

            <div className="flex mt-20">
                <div className="w-4/12 ml-2">
                    <h2 className="text-white text-xl font-medium mb-4">Last 24 Hours</h2>
                    <img src={line_graph} alt="Dummy Line Graph"/>
                </div>
                
                <div className="w-4/12">
                    <h2 className="text-white text-xl font-medium mb-4">Last 7 Days</h2>
                    <img src={line_graph} alt="Dummy Line Graph"/>
                </div>

                <div className="w-4/12">
                    <h2 className="text-white text-xl font-medium mb-4">Last 30 Days</h2>
                    <img src={line_graph} alt="Dummy Line Graph"/>
                </div>
            </div>

            <div className="mt-20 mb-10 grid grid-cols-5 gap-5">
                <div className="col-span-3"> <Card cardContent = {content} /> </div>
                <div className="col-span-2"> <Card cardContent = {recommendationContent} /> </div>
                <div className="col-span-5"> <Card cardContent = {financialContent} /> </div>
            </div>
        </div>
    )
}

export default DataVisPage;