// This component will draw a div for the card
// It will then accept the content of the card as the parameter

//Parameter
//cardContent: HTML codes of things to include inside of the card

function Card(props) {
    return (
        <div className="py-10 w-content h-content bg-white rounded-lg shadow-lg shadow-black/50">
            {props.cardContent}
        </div>
    )
}

export default Card;