import React, { useState } from "react";
import './index.css';
import { Link, useNavigate,ReactDOM} from 'react-router-dom';
import logo from '../../assets/Images/logo.png';

function LoginModule(){

    /// Error Message
    const [errorMessages, setErrorMessages] = useState({});

    /// Success log in
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User info
    const database = [
        {
          username: "bryan",
          password: "123"
        }
    ];

    // Error message
    const errors = {
        uname: "Username or Password invalid",
        pass: "Username or Password invalid"
    };

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
        navigate("/");
    
        var { uname, pass } = document.forms[0];
    
        // Find user login info
        const userData = database.find((user) => user.username === uname.value);
    
        // Compare user info
        if (userData) {
          if (userData.password !== pass.value) {
            // Invalid password
            setErrorMessages({ name: "pass", message: errors.pass });
          } else {
            setIsSubmitted(true);
          }
        } else {
          // Username not found
          setErrorMessages({ name: "pass", message: errors.uname });
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
                {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                <label>Password </label>
                <input type="password" name="pass" required size="50"/>
                {renderErrorMessage("pass")}
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
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
    </div>
    );
}

export default LoginModule;