import React, { useReducer, useState } from "react";
import './index.css';
import { Link, useNavigate,ReactDOM} from 'react-router-dom';
import logo from '../../assets/Images/logo.png';

function LoginModule(){
    /// Success log in
    const [loginRes, setLoginRes] = useState();

    let navigate = useNavigate();

    const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault();
      
      var { uname, pass } = document.forms[0];
      
      props.login(uname, pass);
      setLoginRes(props.yourStateName)
      
      // if(loginRes is showing login is success) {
      //   store data (token and userId) to session storage --> check alesandro's code or ask alesandro to work on this
      //   setIsSubmitted(true);
      //   navigate('/')
      // } else { // login failed
      //   setIsSubmitted(false);
      // }
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