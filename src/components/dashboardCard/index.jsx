import RightArrow from "../../assets/Icons/right_arrow.svg";
import { useNavigate } from 'react-router-dom';
import { BsTrashFill } from "react-icons/bs";
import { deleteInstance } from "../../store/actions/instanceAction";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import '../../../node_modules/react-confirm-alert/src/react-confirm-alert.css';


function DashboardCard(props) {
    let navigate = useNavigate();

    const goNextPage = () => {
        if (props.hasOnClick)
            navigate(props.nextPageRoute);
    }

    const submit = () => {
        confirmAlert({
          title: 'Warning',
          message: 'The Cloud Infrastructure Instance will be permanently deleted!',
          buttons: [
            {
              label: 'Yes',
            },
            {
              label: 'No',
            }
          ]
        })
    };

    return (
        <div className={
            `py-5 px-10 w-full h-fit bg-white rounded-3xl shadow-lg shadow-black/50 bg-gradient-to-t 
            ${props.cardContent.instanceStatus === "Optimized" ? "from-card-blue to-card-blue/20" : (props.cardContent.instanceStatus === "Underutilized" ? "from-card-yellow to-card-yellow/20" : "from-card-red to-card-red/20")}
        `}>
            <div className="relative pb-10">
                <p>ID: {props.cardContent.id}</p>
                <h1 className="font-extrabold text-3xl pt-3 pb-1">{props.cardContent.name}</h1>
                <p><span className="font-bold">Status: </span>{props.cardContent.instanceStatus}</p>
                <p><span className="font-bold">IP Address: </span>{props.cardContent.ipAddress}</p>

                <div className="absolute right-0 top-0">
                    <button onClick={submit}><BsTrashFill/></button>
                </div>

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

export default connect(null, {deleteInstance})(DashboardCard);