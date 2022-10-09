import React, {useState } from "react";
import './index.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/logo.png';
import { getRegistrationUser } from "../../store/actions/registerAction";

function RegisterModule(props){

    const [RegisterValue, setRegisterValue] = useState({
        UserName:"",
        FirstName: "",
        LastName: "",
        Email: "",
        Password:"",
        ConfirmPassword: ""
    });

    const [RegisterSubmitted, setRegisterSubmietted] = useState(true);

    const [Valid, setValid] = useState(false);

    const handleUserNameChange = (e) => {
        setRegisterValue({...RegisterValue, UserName: e.target.value})
    }

    const handleFirstNameChange = (e) => {
        setRegisterValue({...RegisterValue, FirstName: e.target.value})
    }

    const handleLastNameChange = (e) => {
        setRegisterValue({...RegisterValue, LastName: e.target.value})
    }

    const handleEmailChange = (e) => {
        setRegisterValue({...RegisterValue, Email: e.target.value})
    }

    const handlePasswordChange = (e) => {
        setRegisterValue({...RegisterValue, Password: e.target.value})
    }

    const handleConfirmPasswordChange = (e) => {
        setRegisterValue({...RegisterValue, ConfirmPassword: e.target.value})
    }

    let navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(RegisterValue.UserName &&RegisterValue.FirstName && RegisterValue.LastName && RegisterValue.Email && RegisterValue.Password && RegisterValue.ConfirmPassword){
            setValid(true);
            props.getRegistrationUser();
            navigate("/");
        }
        setRegisterSubmietted(true);
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
                <input type="text" name="uname" size="55" value={RegisterValue.UserName} onChange={handleUserNameChange} required/>
                </div>
                <div className="input-container">
                <label>First Name </label>
                <input type="text" name="fname" size="55" value={RegisterValue.FirstName} onChange={handleFirstNameChange} required/>
                </div>
                <div className="input-container">
                <label>Last Name </label>
                <input type="text" name="lname" size="55" value={RegisterValue.LastName} onChange={handleLastNameChange} required/>
                </div>
                <div className="input-container">
                <label>Email </label>
                <input type="email" name="email" size="55" value={RegisterValue.Email} onChange={handleEmailChange} required/>
                </div>
                <div className="input-container">
                <label>Password </label>
                <input type="password" name="password" size="55" value={RegisterValue.Password} onChange={handlePasswordChange} required/>
                </div>
                <div className="input-container">
                <label>Confirm Password </label>
                <input type="password" name="confirm_password" size="55" value={RegisterValue.ConfirmPassword} onChange={handleConfirmPasswordChange} required/>
                </div>
                {RegisterSubmitted && Valid?
                <div className="Register-message">Account Registered Success</div>
                :
                null
            }
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