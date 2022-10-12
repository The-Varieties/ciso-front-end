import { useContext, useState } from "react";
import {Form, Button} from "react-boostrap"
import {ProfilePage} from './index';
import data from "./profile.json";

const EditForm = ({userProfile}) => {

    const [userProfile] = useState(data);

    const {updateUserProfile} = useContext(ProfilePage);

    onSubmit = (e) =>{
        const newUpdate = {
          uname: this.value,
          fname: this.value,
          lname: this.value,
          email:this.value,
          password:this.value
        }
        this.editProfile(newUpdate);
        e.preventDefault();
    }

    return(
        <Form>
        <div className="container">
            <div className="backarrow">
                <BackArrow backPath = {`/${from}`} />
            </div>
            <div className="editprofile">
                <img src={profile} alt="Profile"/>
                <h1 className="membername">NeXphos Member</h1>
                <hr/>
                <div className="edituserinfo-container">
                    <label>First Name</label>
                    {profiledata.map((profiledata)=> (
                    <input type='text' name='fname' size='55'>{profiledata.FirstName}</input>
                    ))}
                </div>
                <div className="edituserinfo-container">
                    <label>Last Name</label>
                    {profiledata.map((profiledata)=> (
                    <input type='text' name='fname' size='55'>{profiledata.LastName}</input>
                    ))}
                </div>
                <div className="edituserinfo-container">
                    <label >Username</label>
                    {profiledata.map((profiledata)=> (
                    <input type='text' name='fname' size='55'>{profiledata.UserName}</input>
                    ))}
                </div>
                <div className="edituserinfo-container">
                    <label>Email</label>
                    {profiledata.map((profiledata)=> (
                    <input type='text' name='fname' size='55'>{profiledata.Email}</input>
                    ))}
                </div>
                <div className="edituserinfo-container">
                    <label>Password</label>
                    {profiledata.map((profiledata)=> (
                    <input type='text' name='fname' size='55'>{profiledata.Password}</input>
                    ))}
                </div>
                <div className="edituserinfo-container">
                    <label>Confirm Password</label>
                    {profiledata.map((profiledata)=> (
                    <input type='text' name='fname' size='55'>{profiledata.ConfirmPassword}</input>
                    ))}
                </div>
            </div>
                <button className="edit-button">Edit Profile</button>
            </div>
        </Form>
    )

}

export default EditForm;