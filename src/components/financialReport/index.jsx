import './index.css';
import BackArrow from "../../components/backArrow";
import {connect} from "react-redux";
import {getAllInstanceFinancialReport} from "../../store/actions/financialReportAction";
import React, {useEffect} from "react";
import {CircularProgress, Dialog} from "@mui/material";

const FinancialReport = (props) => {
    useEffect(() => {
        if(props.financialReport == null) {
            props.getAllInstanceFinancialReport();
        }
    }, //eslint-disable-next-line
    [props.financialReport])

    const textColorDefiner = (optimizedCost, currentCost) => {
        if (optimizedCost > currentCost) return "text-red-700"
        return "text-black"
    }

    return(
        <div>
            <Dialog open = {props.financialReport == null} PaperProps={{style: {backgroundColor: 'transparent', boxShadow: 'none'}}}>
                <CircularProgress color = "warning"/>
            </Dialog>

            <div className="mt-6 ml-8">
                <BackArrow backPath = "/dashboard" />
            </div>

            <div className="financial-container">
                <table className="findata-table">
                    <thead>
                        <tr>
                            <th>Current Spending</th>
                            <th>Optimized Spending</th>
                            <th>{
                                props.financialReport &&
                                props.financialReport['total_optimized_montly_price'] > props.financialReport['total_current_monthly_price']
                                    ? 'Extra Expenses'
                                    : 'Potential Saving'
                            }</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.financialReport &&
                            <tr>
                                <td>{props.financialReport['total_current_monthly_price']}</td>
                                <td>{props.financialReport['total_optimized_montly_price']}</td>
                                <td>{props.financialReport['total_potential_savings']}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

            <div class="financiallist-container">
                <table class="findatalist-table">
                    <thead>
                        <tr>
                            <th rowSpan="2">Instance Name</th>
                            <th rowSpan="2">Instance Type</th>
                            <th colSpan="2">Current</th>
                            <th colSpan="2">Optimized</th>
                            <th rowSpan="2">Optimized Cost Change</th>
                        </tr>
                        <tr>
                            <th>Hourly Cost</th>
                            <th>Monthly Cost</th>
                            <th>Hourly Cost</th>
                            <th>Monthly Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='h-5'> {/*This one is used to give some spaces to the table*/}
                            <td></td>
                        </tr>
                        {props.financialReport && props.financialReport.data.map((instanceFinancialReport) => {
                            return(
                                <tr>
                                    <td>{instanceFinancialReport.instance['instance_name']}</td>
                                    <td>{instanceFinancialReport.instance['instance_type']}</td>
                                    <td>{instanceFinancialReport['current_hourly_price']}</td>
                                    <td>{instanceFinancialReport['current_monthly_price']}</td>

                                    <td className={`
                                        ${textColorDefiner(
                                            instanceFinancialReport['optimized_hourly_price'],
                                            instanceFinancialReport['current_hourly_price']
                                        )}
                                    `}>
                                        {instanceFinancialReport['optimized_hourly_price']}
                                    </td>

                                    <td className={`
                                        ${textColorDefiner(
                                            instanceFinancialReport['optimized_monthly_price'],
                                            instanceFinancialReport['current_monthly_price']
                                        )}
                                    `}>
                                        {instanceFinancialReport['optimized_monthly_price']}
                                    </td>

                                    <td className={`
                                        ${textColorDefiner(
                                            instanceFinancialReport['optimized_monthly_price'],
                                            instanceFinancialReport['current_monthly_price']
                                        )}
                                    `}>
                                        {instanceFinancialReport['potential_savings']}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className='ml-10'>
                <p className='text-gray-400 text-sm mt-5'>*report is valid for the last 30 days</p>
                <p className='text-gray-400 text-sm'>**currency is in USD</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    financialReport: state.financialReport.financialReport
})

export default connect(mapStateToProps, {getAllInstanceFinancialReport})(FinancialReport);