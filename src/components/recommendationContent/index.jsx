import React from 'react';

export const RecommendationContent = (props) => {
    // console.log(props.recommendationsList)

    return(
        <div>
            <h2 className="text-black w-fit font-bold font-italic text-2xl">Recommendation</h2>

            {(props.recommendationsList && props.recommendationsList.length > 0 ? 
                props.recommendationsList.map((recommendation, index) => {
                    const stepsArr = [];

                    for(let i = 0; i < recommendation.steps.length; i++) {
                        stepsArr.push(<li className="text-sm" key={i}>{recommendation.steps[i]}</li>)
                    }
                    
                    return (
                        <div className="mt-3" key={index}>
                            <h2 className="text-indigo-800 w-fit font-black text-base">{recommendation.recommendation}</h2>
                            <p className="text-black w-fit text-sm">{recommendation.details}</p>
                            <p className="text-black w-fit text-sm italic font-bold">How-to:</p>
                            <div className="ml-1"> {stepsArr} </div>
                        </div>
                    )
                })
            : 
            <div>
                <p className="text-indigo-800 w-fit font-black text-base">This instance is in its best utilization</p>
            </div>
            )}
        </div>
    )
}