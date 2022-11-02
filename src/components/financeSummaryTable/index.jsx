import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {getInstanceFinancialReport} from "../../store/actions/financialReportAction";

const FinanceSummaryTable = (props) => {
    const [isOptimizedHigher, setIsOptimizedHigher] = useState(false)

    useEffect(() => {
        if(props.financialReport == null && props.instance.instance_aws_id) {
            props.getInstanceFinancialReport(props.instance.instance_aws_id)
        }
    }, //eslint-disable-next-line
        [props.instance])

    useEffect(() => {
        if (props.financialReport) {
            if (props.financialReport['optimized_monthly_price'] > props.financialReport['current_monthly_price']) {
                setIsOptimizedHigher(true)
            } else {
                setIsOptimizedHigher(false)
            }
        }
    }, [props.financialReport])

    return(
        props.financialReport !== null
            ? <table className='w-full'>
                <tbody>
                    <tr>
                        <td className="font-bold italic">Current Spending</td>
                    </tr>
                    <tr>
                        <td>Hourly Spending</td>
                        <td className="text-right w-40">{props.financialReport['current_hourly_price']} USD</td>
                    </tr>
                    <tr>
                        <td>Monthly Spending</td>
                        <td className="text-right">{props.financialReport['current_monthly_price']} USD</td>
                    </tr>
                    <tr className="h-2"></tr>
                    <tr>
                        <td className="font-bold italic">Optimized Spending</td>
                    </tr>
                    <tr>
                        <td>Hourly Spending</td>
                        <td className="text-right">{props.financialReport['optimized_hourly_price']} USD</td>
                    </tr>
                    <tr>
                        <td>Monthly Spending</td>
                        <td className="text-right">{props.financialReport['optimized_monthly_price']} USD</td>
                    </tr>
                    <tr className="h-2"></tr>
                    <tr>
                        <td className="font-bold italic">Summary</td>
                    </tr>
                    <tr>
                        <td>{isOptimizedHigher ? 'Additional Expenses' : 'Potential Saving'}</td>
                        <td className="text-right">{props.financialReport['potential_savings']} USD</td>
                    </tr>
                </tbody>
            </table>
            : <div></div>
    )
}

const mapStateToProps = (state) => ({
    instance: state.instance.instance,
    financialReport: state.financialReport.financialReport
})

export default connect(mapStateToProps, {getInstanceFinancialReport})(FinanceSummaryTable);