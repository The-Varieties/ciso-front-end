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
            <form>
                <div class="info-container">
                    <div class="textsss">
                <div class="x">
                    <label for="Fname"><b>First Name</b></label>
                    <p>Jentz</p>
                    <label for="Lname">Last Name</label>
                    <p>Chua</p>
                </div>
                <div class="y">
                    <label for="Uname">Username</label>
                    <p>Jentz_Chua</p>
                    <label for="Email">Email</label>
                    <p>123@gmail.com</p>
                </div>
                </div>
            </div>
            </form>
            <button class="edit-button">Edit Profile</button>
        </div>
    </div>
  )
}

export default ProfilePage;