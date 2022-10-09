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
            <div className="profile_detail">
                <img src={profile} alt="Profile"/>
                <h1 className="membername">NeXphos Member</h1>
                <hr/>
                <div className="info-container">
                <div className="column">
                    <h2>First Name</h2>
                    {profiledata.map((profiledata)=> (
                    <p>{profiledata.FirstName}</p>
                    ))}
                </div>
                <div className="column">
                    <h2>Last Name</h2>
                    {profiledata.map((profiledata)=> (
                    <p>{profiledata.LastName}</p>
                    ))}
                </div>
                <div className="column">
                    <h2 >Username</h2>
                    {profiledata.map((profiledata)=> (
                    <p>{profiledata.UserName}</p>
                    ))}
                </div>
                <div className="column">
                    <h2>Email</h2>
                    {profiledata.map((profiledata)=> (
                    <p>{profiledata.Email}</p>
                    ))}
                </div>
                <div className="column">
                    <h2>Password</h2>
                    {profiledata.map((profiledata)=> (
                    <p>{profiledata.Password}</p>
                    ))}
                </div>
                <div className="column">
                    <h2>Confirm Password</h2>
                    {profiledata.map((profiledata)=> (
                    <p>{profiledata.ConfirmPassword}</p>
                    ))}
                </div>
            </div>
                <button className="edit-button">Edit Profile</button>
            </div>
        </div>
        </Form>
    )

}

export default EditForm;