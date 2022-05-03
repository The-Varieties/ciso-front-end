import React from "react";
import './index.css';
import { Link } from 'react-router-dom';

function LoginModule(){


    return(
        <div className="justify-content-center">
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
                <input type="text" name="uname" required size="50"/>
                </div>
                <div className="input-container">
                <label>First Name </label>
                <input type="text" name="uname" required size="50"/>
                </div>
                <div className="input-container">
                <label>Last Name </label>
                <input type="text" name="uname" required size="50"/>
                </div>
                <div className="input-container">
                <label>Email </label>
                <input type="text" name="uname" required size="50"/>
                </div>
                <div className="input-container">
                <label>Password </label>
                <input type="password" name="pass" required size="50"/>
                </div>
                <div className="input-container">
                <label>Confirm Password </label>
                <input type="password" name="pass" required size="50"/>
                </div>
                <div className="button-container">
                    <input type="submit" value="Register"/>
                </div>
            </form>
            </div>
            <p class="registerlink">Already have an account?<a><Link to={"/login-page"}> Sign In</Link></a></p>
        </div>
    )
}

export default LoginModule;