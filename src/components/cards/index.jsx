// This component will draw a div for the card
// It will then accept the content of the card as the parameter

//Parameter
//cardContent: HTML codes of things to include inside of the card
//hasOnClick: bool
//nextPageRoute: route

// Card clickable, route to given page

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card(props) {
    let navigate = useNavigate();

    const goNextPage = () => {
        if (props.hasOnClick)
            navigate(props.nextPageRoute);
    }

    return (
        <div className={`pb-12 pt-7 px-10 w-full h-full bg-white rounded-lg shadow-lg shadow-black/50 ${props.hasOnClick ? "cursor-pointer" : "cursor-auto"}`} onClick={goNextPage} >
            {props.cardContent}
        </div>
    )
}

export default Card;