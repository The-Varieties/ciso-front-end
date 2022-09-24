import React, { useState } from "react";
import './index.css';
import { Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/Images/logo.png';

function LoginModule(){

    /// Error Message
    const [errorMessages, setErrorMessages] = useState("Username or Password invalid");

    /// Success log in
    const [isSubmitted, setIsSubmitted] = useState(
      {
        username:"bryan",
        password:"123"
      }
    );

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
        navigate("/");
    
        var { uname, pass } = document.forms[0];
    
        // Find user login info
        const userData = isSubmitted.find((user) => user.username === uname.value);
    
        // Compare user info
        if (userData) {
          if (userData.password !== pass.value) {
            // Invalid password
            setErrorMessages({errorMessages});
          } else {
            setIsSubmitted(true);
          }
        } else {
          // Username not found
          setErrorMessages({ errorMessages});
        }
    };

    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


    const renderForm =(
        <div className="justify-content-center">
            <div class="icon">
                <img src={logo}></img>
            </div>
            <h1 class="title">
                Sign in to your account
            </h1>
            <p class="sentenses">
                Start using our product
            </p>
            
            <div className="logintable">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                <label>User Name </label>
                <input type="text" name="uname" required size="50"/>
                </div>
                <div className="input-container">
                <label>Password </label>
                <input type="password" name="pass" required size="50"/>
                {renderErrorMessage("pass")}
                {setIsSubmitted ?
                <div></div>
                :
                <div className="error">{errorMessages}</div>
                }
                </div>
                <div className="button-container">
                    <input type="submit" value="Sign In"/>
                </div>
            </form>
            </div>
            <p class="registerlink">Don’t have an account? <a><Link to={"/register-page"}>Register</Link></a></p>
        </div>
    );

    return (
    <div>
        {renderForm}
    </div>
    );
}

export default LoginModule;