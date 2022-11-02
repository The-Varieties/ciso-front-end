import React, {useEffect, useState} from "react";
import './index.css';
import profile from '../../assets/Images/profile.png'
import BackArrow from "../backArrow";
import {useLocation} from 'react-router-dom';
import { getUser } from "../../store/actions/userAction";
import { connect } from "react-redux";
import {GetUserIdFromToken} from "../../utils/tokenDecoder";

function ProfilePage(props) {
    const location = useLocation()
    const { from } = location.state
    const [profiledata, setProfileData] = useState(null)
    const userId = GetUserIdFromToken();

    useEffect(() => {
        if(profiledata === null || profiledata.length === 0) {
            props.getUser(userId);
            setProfileData(props.userData);
        }
    }, //eslint-disable-next-line
        [props.userData])

    return (
    <div className="m-0 p-0">
        <div className="m-10">
            <BackArrow backPath = {`/${from}`} />
        </div>
        <div className="flex font-medium items-center justify-center">
        <div className="w-1/3 mx-auto bg-[#20354b] rounded-2xl px-10 py-8 shadow-lg">
            <img src={profile} alt="Profile" className="mt-5 mx-auto"/>
            <h1 className="pt-4 text-center space-y-4 text-[36px]">NeXphos Member</h1>
            <hr className="border-2 border-black bg-black"/>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="">
                    <h2 className="text-emerald-400 font-semibold text-[20px]">First Name</h2>
                    {profiledata != null
                        ? <p className="text-emerald-400 text-[18px]">{profiledata.user_firstname}</p>
                        : <div></div>
                    }
                </div>
                <div className="">
                    <h2 className="text-emerald-400 font-semibold text-[20px]">Last Name</h2>
                    {profiledata != null
                        ? <p className="text-emerald-400 text-[18px]">{profiledata.user_lastname}</p>
                        : <div></div>
                    }
                </div>
                <div className="">
                    <h2 className="text-emerald-400 font-semibold text-[20px]">Username</h2>
                    {profiledata != null
                        ? <p className="text-emerald-400 text-[18px]">{profiledata.user_username}</p>
                        : <div></div>
                    }
                </div>
                <div className="">
                    <h2 className="text-emerald-400 font-semibold text-[20px]">Email</h2>
                    {profiledata != null
                        ? <p className="text-emerald-400 text-[18px]">{profiledata.user_email}</p>
                        : <div></div>
                    }
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