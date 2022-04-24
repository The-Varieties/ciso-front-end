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