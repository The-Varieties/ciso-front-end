// This component will draw the back arrow and take a route as a parameter
// onClick, this component will direct the users to the passed route from the parameter

import backArrow from "../../assets/Icons/back_arrow.svg";
import { useNavigate } from 'react-router-dom';

function BackArrow(props) {
    let navigate = useNavigate();

    return(
        <div onClick={(e) => {navigate("/")}}>
            <img src={backArrow} alt="Back Arrow" className="w-7 cursor-pointer" />
        </div>
    )
}

export default BackArrow;