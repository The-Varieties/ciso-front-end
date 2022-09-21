import React from "react";
import './index.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/Images/logo.png';

function LoginModule(){


    return(
        <div className="justify-content-center">
            <div class="icon">
                <img src={logo} alt="logo"></img>
            </div>
            <h1 class="title">
                Register
            </h1>
            <p class="sentenses">
                Start using our product
            </p>

            <div className="registertable">
            <form>
                <div className="input-container">
                <label>User Name </label>
                <input type="text" name="uname" required size="55"/>
                </div>
                <div className="input-container">
                <label>First Name </label>
                <input type="text" name="fname" required size="55"/>
                </div>
                <div className="input-container">
                <label>Last Name </label>
                <input type="text" name="lname" required size="55"/>
                </div>
                <div className="input-container">
                <label>Email </label>
                <input type="email" name="email" required size="55"/>
                </div>
                <div className="input-container">
                <label>Password </label>
                <input type="password" name="password" required size="55"/>
                </div>
                <div className="input-container">
                <label>Confirm Password </label>
                <input type="password" name="confirm_password" required size="55"/>
                </div>
                <div className="button-container">
                    <input type="submit" value="Register"/>
                </div>
            </form>
            </div>
            <p class="registerlink">Already have an account?<Link to={"/login-page"}> Sign In</Link></p>
        </div>
    )
}

export default LoginModule;