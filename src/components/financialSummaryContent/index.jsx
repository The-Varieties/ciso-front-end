import FinanceSummaryTable from "../financeSummaryTable"
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";

const FinancialSummaryContent = (props) => {
    const [savingPercentage, setSavingPercentage] = useState(0)
    const [isOptimizedHigher, setIsOptimizedHigher] = useState(false)

    useEffect(() => {
        if (props.financialReport !== null) {
            const percentage = ((props.financialReport['optimized_monthly_price'] / props.financialReport['current_monthly_price']) * 100).toFixed(2)
            setSavingPercentage(percentage)

            if (props.financialReport['optimized_monthly_price'] > props.financialReport['current_monthly_price']) {
                setIsOptimizedHigher(true)
            } else {
                setIsOptimizedHigher(false)
            }
        }
    }, [props.financialReport])

    return(
        <div>
            <h2 className="w-fit font-bold text-2xl mb-2">Financial Report (Monthly)</h2>
            <div className="flex w-full">
                <FinanceSummaryTable />

                <div className="flex w-full">
                    <div className="mx-auto my-auto flex">
                        {props.financialReport &&
                            props.financialReport['optimized_monthly_price'] !== props.financialReport['current_monthly_price']
                            ?   <>
                                    <div className="block">
                                        <p className="font-bold text-2xl">You {isOptimizedHigher ? 'need to add' : 'can save'} your</p>
                                        <p className="text-right font-bold text-xl">budget up to</p>
                                    </div>
                                    <p className="font-bold text-6xl ml-2">{savingPercentage}%</p>
                                </>
                            :   <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    financialReport: state.financialReport.financialReport
})

export default connect(mapStateToProps)(FinancialSummaryContent);