import React from "react";
import './index.css';
import profile from '../../assets/Images/profile.jpg'
import BackArrow from "../../components/backArrow";

function ProfilePage() {
  return (
    <div class="container">
        <div class="backarrow">
            <BackArrow backPath = "/data-vis-page" />
        </div>
        <div class="profile_detail">
            <img src={profile} alt="Profile"/>
            <h1 class="membername">NeXphos Member</h1>
            <hr/>
            <div class="first-container">
                <h3>First Name</h3>
                <p>Jentz</p>
                <h3 class="username">Username</h3>
                <p>Jentz_Chua</p>
            </div>
            <div class="second-container">
                <h3>Last Name</h3>
                <p>Chua</p>
                <h3 class="email">Email</h3>
                <p>123@gmail.com</p>
            </div>
            <button class="edit-button">Edit Profile</button>
        </div>
    </div>
  )
}

export default ProfilePage;