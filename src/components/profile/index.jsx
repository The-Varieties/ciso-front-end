import React,{useState} from "react";
import './index.css';
import profile from '../../assets/Images/profile.jpg'
import BackArrow from "../backArrow";
import {useLocation} from 'react-router-dom';
import { getUser } from "../../store/actions/userAction";
import data from "./profile.json";
import { connect } from "react-redux";
import { GetUserIdFromToken } from "../../utils/tokenDecoder";
import { useEffect } from "react";


function ProfilePage(props) {
    const location = useLocation()
    const { from } = location.state
    const [profiledata] = useState(props.userData);
    // console.log(GetUserIdFromToken()) // can use this function to get the id

    // const userid1 = props.getUser(GetUserIdFromToken());

    // const getinfo = props.userData;
    // props.userData

    // console.log(props.userData);

    // const data1 = props.getUser(GetUserIdFromToken());
    
    // console.log(data1);



    return (
    <div className="container">
        <div className="backarrow">
            <BackArrow backPath = {`/${from}`} />
        </div>
        <div className="profile_detail">
            <img src={profile} alt="Profile"/>
            <h1 className="membername">NeXphos Member</h1>
            <hr/>
            <div className="info-container">
                <div className="column">
                    <h2>First Name</h2>
                    {profiledata.map((profiledata, index)=> (
                    <p key={index}>{profiledata.FirstName}</p>
                    ))}
                </div>
                <div className="column">
                    <h2>Last Name</h2>
                    {profiledata.map((profiledata, index)=> (
                    <p key={index}>{profiledata.LastName}</p>
                    ))}
                </div>
                <div className="column">
                    <h2 >Username</h2>
                    {profiledata.map((profiledata, index)=> (
                    <p key={index}>{profiledata.UserName}</p>
                    ))}
                </div>
                <div className="column">
                    <h2>Email</h2>
                    {profiledata.map((profiledata, index)=> (
                    <p key={index}>{profiledata.Email}</p>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => ({userData:state.userinfo.userinfo});

const mapDispatchToProps = {getUser}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);