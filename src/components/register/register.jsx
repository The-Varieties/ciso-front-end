import React, {useState } from "react";
import './index.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/logo.png';
import { getRegistrationUser } from "../../store/actions/registerAction";

function RegisterModule(props){
    const [confirmPassword, setConfirmPassword] = useState('')

    const [RegisterValue, setRegisterValue] = useState({
        user_username:"",
        user_firstname: "",
        user_lastname: "",
        user_email: "",
        user_password:""
    });

    const [RegisterSubmitted, setRegisterSubmietted] = useState(false);

    const handleUserNameChange = (e) => {
        setRegisterValue({...RegisterValue, user_username: e.target.value})
    }

    const handleFirstNameChange = (e) => {
        setRegisterValue({...RegisterValue, user_firstname: e.target.value})
    }

    const handleLastNameChange = (e) => {
        setRegisterValue({...RegisterValue, user_lastname: e.target.value})
    }

    const handleEmailChange = (e) => {
        setRegisterValue({...RegisterValue, user_email: e.target.value})
    }

    const handlePasswordChange = (e) => {
        setRegisterValue({...RegisterValue, user_password: e.target.value})
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    let navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(RegisterValue.user_password == confirmPassword){
            if(RegisterValue.user_username &&RegisterValue.user_firstname && RegisterValue.user_lastname && RegisterValue.user_email && RegisterValue.user_password && confirmPassword){
                props.getRegistrationUser(RegisterValue);
                alert("Successful Registered!");
                navigate("/");
            }
            setRegisterSubmietted(true);
        }else{
            alert("Password not match!");
        }setRegisterSubmietted(false);
    }


    return(
        <div className="justify-content-center">
            <div className="icon">
                <img src={logo} alt="logo"></img>
            </div>
            <h1 className="title">
                Register
            </h1>
            <p className="sentenses">
                Start using our product
            </p>

            <div className="registertable">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                <label>User Name </label>
                <input type="text" name="uname" size="55" value={RegisterValue.user_username} onChange={handleUserNameChange} required/>
                </div>
                <div className="input-container">
                <label>First Name </label>
                <input type="text" name="fname" size="55" value={RegisterValue.user_firstname} onChange={handleFirstNameChange} required/>
                </div>
                <div className="input-container">
                <label>Last Name </label>
                <input type="text" name="lname" size="55" value={RegisterValue.user_lastname} onChange={handleLastNameChange} required/>
                </div>
                <div className="input-container">
                <label>Email </label>
                <input type="email" name="email" size="55" value={RegisterValue.user_email} onChange={handleEmailChange} required/>
                </div>
                <div className="input-container">
                <label>Password </label>
                <input type="password" name="password" size="55" value={RegisterValue.user_password} onChange={handlePasswordChange} required/>
                </div>
                <div className="input-container">
                <label>Confirm Password </label>
                <input type="password" name="confirm_password" size="55" value={confirmPassword} onChange={handleConfirmPasswordChange} required/>
                </div>
                <div className="button-container">
                    <input type="submit" value="Register"/>
                </div>
            </form>
            </div>
            <p className="registerlink">Already have an account?<Link to={"/login-page"}> Sign In</Link></p>
        </div>
    )
}

export default connect(null, {getRegistrationUser})(RegisterModule);