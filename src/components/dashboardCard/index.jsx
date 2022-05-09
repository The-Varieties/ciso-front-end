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
            navigate(props.nextPageRoute, { state: {instanceName: props.cardContent.instance_name}});
    }
    
    const submit = () => {
        confirmAlert({
          title: 'Warning',
          message: 'The Cloud Infrastructure Instance will be permanently deleted!',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {props.deleteInstance(props.cardContent.instance_id);}
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
            ${props.cardContent.instance_status === 0 ? "from-card-green to-card-green/20" : (props.cardContent.instance_status === 1 ? "from-card-yellow to-card-yellow/20" : "from-card-red to-card-red/20")}
        `}>
            <div className="relative pb-10">
                <p>ID: {props.cardContent.instance_id}</p>
                <h1 className="font-extrabold text-3xl pt-3 pb-1">{props.cardContent.instance_name}</h1>
                <p><span className="font-bold">Status: </span>{props.cardContent.instance_status === 0 ? "Optimized" : (props.cardContent.instance_status === 1 ? "Underutilized" : "Overutilized")}</p>
                <p><span className="font-bold">IP Address: </span>{props.cardContent.instance_ipv4}</p>

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