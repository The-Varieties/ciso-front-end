import RightArrow from "../../assets/Icons/right_arrow.svg";
import { useNavigate } from 'react-router-dom';

function DashboardCard(props) {
    let navigate = useNavigate();

    const goNextPage = () => {
        if (props.hasOnClick)
            navigate(props.nextPageRoute);
    }

    return (
        <div className={
            `py-5 px-10 w-full h-fit bg-white rounded-3xl shadow-lg shadow-black/50 bg-gradient-to-t 
            ${props.cardContent.instanceStatus === "Optimized" ? "from-card-green to-card-green/20" : (props.cardContent.instanceStatus === "Underutilized" ? "from-card-yellow to-card-yellow/20" : "from-card-red to-card-red/20")}
        `}>
            <div className="relative pb-10">
                <p>ID: {props.cardContent.id}</p>
                <h1 className="font-extrabold text-3xl pt-3 pb-1">{props.cardContent.name}</h1>
                <p><span className="font-bold">Status: </span>{props.cardContent.instanceStatus}</p>
                <p><span className="font-bold">IP Address: </span>{props.cardContent.ipAddress}</p>

                <div className="absolute right-0 bottom-0">
                    <div className="flex cursor-pointer" onClick={goNextPage}>
                        <p className="italic">See More</p>
                        <img src={RightArrow} alt="Next Arrow"/>
                    </div>
                </div>
                
            </div>    
        </div>
    )
}

export default DashboardCard;