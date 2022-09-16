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
            <form>
                <div class="textsss">
                <div class="x">
                    <label for="Fname"><b>First Name</b></label>
                    <p>Jentz</p>
                    <label for="Lname"><b>Last Name</b></label>
                    <p>Chua</p>
                </div>
                <div class="y">
                    <label for="Uname"><b>Username</b></label>
                    <p>Jentz_Chua</p>
                    <label for="Email"><b>Email</b></label>
                    <p>123@gmail.com</p>
                </div>
                </div>
            </form>
            </div>
            <button class="edit-button">Edit Profile</button>
        </div>
    </div>
  )
}

export default ProfilePage;