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
        if(RegisterValue.user_password === confirmPassword){
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
        <div className="justify-center">
            <div className="icon">
                <img src={logo} alt="logo"></img>
            </div>
            <h1 className="text-white text-4xl font-bold text-center">
                Register
            </h1>
            <p className="text-center text-slate-500 text-xl font-bold">
                Start using our product
            </p>

            <div className="mt-5 flex justify-center items-center flex-col">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 m-2.5">
                    <label className="text-white text-lg mt-2">User Name </label>
                    <input className="h-12 text-left p-2 rounded-lg" type="text" name="uname" size="55" value={RegisterValue.user_username} onChange={handleUserNameChange} required/>
                </div>
                <div className="flex flex-col gap-2 m-2.5">
                    <label className="text-white text-lg mt-2">First Name </label>
                    <input className="h-12 text-left p-2 rounded-lg" type="text" name="fname" size="55" value={RegisterValue.user_firstname} onChange={handleFirstNameChange} required/>
                </div>
                <div className="flex flex-col gap-2 m-2.5">
                    <label className="text-white text-lg mt-2">Last Name </label>
                    <input className="h-12 text-left p-2 rounded-lg" type="text" name="lname" size="55" value={RegisterValue.user_lastname} onChange={handleLastNameChange} required/>
                </div>
                <div className="flex flex-col gap-2 m-2.5">
                    <label className="text-white text-lg mt-2">Email </label>
                    <input className="h-12 text-left p-2 rounded-lg" type="email" name="email" size="55" value={RegisterValue.user_email} onChange={handleEmailChange} required/>
                </div>
                <div className="flex flex-col gap-2 m-2.5">
                    <label className="text-white text-lg mt-2">Password </label>
                    <input className="h-12 text-left p-2 rounded-lg" type="password" name="password" size="55" value={RegisterValue.user_password} onChange={handlePasswordChange} required/>
                </div>
                <div className="flex flex-col gap-2 m-2.5">
                    <label className="text-white text-lg mt-2">Confirm Password </label>
                    <input className="h-12 text-left p-2 rounded-lg" type="password" name="confirm_password" size="55" value={confirmPassword} onChange={handleConfirmPasswordChange} required/>
                </div>
                {RegisterSubmitted ?
                <div className="Register-message">Account Registered Success</div>
                :
                null
                }
                <div className="flex justify-center mt-5">
                    <input className="mt-3 cursor-pointer text-lg bg-yellow-300 rounded-lg text-black py-2 px-[215px] " type="submit" value="Register"/>
                </div>
            </form>
            </div>
            <p className="registerlink">Already have an account?<Link to={"/login-page"}> Sign In</Link></p>
        </div>
    )
}

export default connect(null, {getRegistrationUser})(RegisterModule);
