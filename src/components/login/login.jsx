import React from "react";
import './index.css';
import { Link } from 'react-router-dom';

function LoginModule(){


    return(
        <div className="justify-content-center">
            <h1 class="title">
                Sign in to your account
            </h1>
            <p class="sentenses">
                Start using our product
            </p>
            
            <div className="logintable">
            <form>
                <div className="input-container">
                <label>User Name </label>
                <input type="text" name="uname" required size="50"/>
                </div>
                <div className="input-container">
                <label>Password </label>
                <input type="password" name="pass" required size="50"/>
                </div>
                <div className="button-container">
                    <input type="submit" value="Sign In"/>
                </div>
            </form>
            </div>
            <p class="registerlink">Don’t have an account? <a><Link to={"/register-page"}>Register</Link></a></p>
        </div>
    )
}

export default LoginModule;