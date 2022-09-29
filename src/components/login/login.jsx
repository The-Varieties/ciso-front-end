import React, { useReducer, useState } from "react";
import './index.css';
import { Link, useNavigate,ReactDOM} from 'react-router-dom';
import logo from '../../assets/Images/logo.png';

function LoginModule(){
    /// Success log in
    const [isSubmitted, setIsSubmitted] = useState(true);

    // User info
    const database = [
      {
        username: "bryan",
        password: "123"
      }
    ];

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
    
        var { uname, pass } = document.forms[0];
    
        // Find user login info
        const userData = database.find((user) => user.username === uname.value);
    
        // Compare user info
        if (userData) {
          if (userData.password !== pass.value) {
            setIsSubmitted(false);
          } else {
            setIsSubmitted(true);
            navigate("/");
          }
        } else {
          setIsSubmitted(false);
        }
    };

    return (
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
            {isSubmitted ?
              <div className="h-1"></div>
            :
              <div className="error h-1">Username or Password invalid</div>
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
}

const mapStateToProps = (state) => ({userData:state.LoginModule.LoginModule})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModule);