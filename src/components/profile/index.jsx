import React from "react";
import './index.css';
import profile from '../../assets/Images/profile.jpg'
import BackArrow from "../backArrow";
import {useLocation} from 'react-router-dom';

function ProfilePage() {
  const location = useLocation()
  const { from } = location.state

  return (
    <div class="container">
        <div class="backarrow">
            <BackArrow backPath = {`/${from}`} />
        </div>
        <div class="profile_detail">
            <img src={profile} alt="Profile"/>
            <h1 class="membername">NeXphos Member</h1>
            <hr/>
            <div class="info-container">
                <div class="column">
                    <h2>First Name</h2>
                    <p>Jentz</p>
                </div>
                <div class="column">
                    <h2>Last Name</h2>
                    <p>Chua</p>
                </div>
                <div class="column">
                    <h2 >Username</h2>
                    <p>Jentz_Chua</p>
                </div>
                <div class="column">
                    <h2>Email</h2>
                    <p>123@gmail.com</p>
                </div>
            </div>
            <button class="edit-button">Edit Profile</button>
        </div>
    </div>
  )
}

export default ProfilePage;