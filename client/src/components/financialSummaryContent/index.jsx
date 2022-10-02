import { FinanceSummaryTable } from "../financeSummaryTable"
import React from 'react'

export const FinancialSummaryContent = () => {
    return(
        <div>
            <h2 className="w-fit font-bold text-2xl mb-2">Financial Report (Year)</h2>
            <div className="flex w-full">
                <FinanceSummaryTable />

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
}