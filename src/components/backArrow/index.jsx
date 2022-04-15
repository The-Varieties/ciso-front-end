// This component will draw the back arrow and take a route as a parameter
// onClick, this component will direct the users to the passed route from the parameter

import backArrow from "../../assets/Icons/back_arrow.svg";
import { useNavigate } from 'react-router-dom';

function BackArrow(props) {
    let navigate = useNavigate();

    return(
        <div className="my-auto">
            <img src={backArrow} alt="Back Arrow" className="h-7 cursor-pointer" onClick={(e) => {navigate("/")}}/>
        </div>
    )
}

export default BackArrow;