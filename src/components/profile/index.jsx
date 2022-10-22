import React,{useState} from "react";
import './index.css';
import profile from '../../assets/Images/profile.png'
import BackArrow from "../backArrow";
import {useLocation} from 'react-router-dom';
import { getUser } from "../../store/actions/userAction";
import { connect } from "react-redux";
import { GetUserIdFromToken } from "../../utils/tokenDecoder";
import { useEffect } from "react";


function ProfilePage(props) {

    const location = useLocation()
    const { from } = location.state

    props.getUser(GetUserIdFromToken());
    const profiledata = useState(props.userData);
    // console.log(GetUserIdFromToken()) // can use this function to get the id

    //const userid1 = props.getUser(GetUserIdFromToken());

    // const getinfo = props.userData;
    // props.userData

    //console.log(props.userData);
    //console.log(profiledata);

    // const data1 = props.getUser(GetUserIdFromToken());
    
    // console.log(data1);

    // useEffect((profiledata) => {
    //     if(profiledata == null){
    //         props.getUser(GetUserIdFromToken());
    //     } else if(props.userData !== null && props.userData.length !== 0) {
    //         props.getUser(GetUserIdFromToken());
    //     } else{
    //         GetUserIdFromToken();
    //     }
    // }, [props.userData])

    return (
    <div className="container">
        <div className="backarrow">
            <BackArrow backPath = {`/${from}`} />
        </div>
        <div className="md:flex bg-slate-100 p-6 md:p-0 md:m-10 md:mt-32 mt-32">
            <img src={profile} alt="Profile" className="w-25 h-full object-cover m-auto md:m-auto" width="384" height="512"/>
            <div className="m-auto bg-green-200 p-3 text-lg space-y-4 md:w-full md:m-4">
                <h1 className="pt-4 md:p-8 text-center space-y-4 md:text-[42px] text-[30px]">NeXphos Member</h1>
                <hr class="border-1 border-black"/>
                <div className="grid grid-cols-2 gap-6 p-5">
                    <div className="">
                        <h2 className="text-[24px]">First Name</h2>
                        {profiledata.map((profiledata, index)=> (
                        <p key={index} className="text-[20px]">{profiledata.user_firstname}</p>
                        ))}
                    </div>
                    <div className="">
                        <h2 className="text-[24px]">Last Name</h2>
                        {profiledata.map((profiledata, index)=> (
                        <p key={index} className="text-[20px]">{profiledata.user_lastname}</p>
                        ))}
                    </div>
                    <div className="">
                        <h2 className="text-[24px]">Username</h2>
                        {profiledata.map((profiledata, index)=> (
                        <p key={index} className="text-[20px]">{profiledata.user_username}</p>
                        ))}
                    </div>
                    <div className="">
                        <h2 className="text-[24px]">Email</h2>
                        {profiledata.map((profiledata, index)=> (
                        <p key={index} className="text-[20px]">{profiledata.user_email}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => ({userData:state.userinfo.userinfo});

const mapDispatchToProps = {getUser}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);