import React from "react";
import './index.css';
import profile from '../../assets/Images/profile.jpg'
import BackArrow from "../backArrow";
import {useLocation} from 'react-router-dom';

function ProfilePage() {
  const location = useLocation()
  const { from } = location.state

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
                    <p>Jentz</p>
                </div>
                <div className="column">
                    <h2>Last Name</h2>
                    <p>Chua</p>
                </div>
                <div className="column">
                    <h2 >Username</h2>
                    <p>Jentz_Chua</p>
                </div>
                <div className="column">
                    <h2>Email</h2>
                    <p>123@gmail.com</p>
                </div>
            </div>
            <button className="edit-button">Edit Profile</button>
        </div>
    </div>
  )
}

export default ProfilePage;