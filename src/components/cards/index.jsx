import React from 'react';

function Card(props) {
    return (
        <div className={`pt-7 px-10 w-full h-full bg-white rounded-lg shadow-lg shadow-black/50`}>
            <div className="pb-12">
                {props.cardContent}
            </div>
        </div>
    )
}

export default Card;