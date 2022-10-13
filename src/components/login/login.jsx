import React, {useState } from "react";
import './index.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/Images/logo.png';
import { getLoginUserInstance, resetLogin } from "../../store/actions/LoginAction";
import { connect } from "react-redux";
import { useEffect } from "react";

function LoginModule(props){
  const [loginRes, setLoginRes] = useState(true);

  useEffect(() => {
    if(props.userData == null){
      setLoginRes(true);
    } else if(props.userData !== null && props.userData.length !== 0) {
      setLoginRes(true);
      props.setToken(props.userData)
      props.resetLogin()
    } else{
      setLoginRes(false);
    }
  }, [props.userData])

  const handleSubmit = (event) => {
    event.preventDefault();
    
    var { uname, pass } = document.forms[0];
    
    props.getLoginUserInstance(uname.value, pass.value);
  };

  return (
    <div className="justify-content-center">
      <div className="icon">
          <img src={logo}></img>
      </div>
      <h1 className="title">
          Sign in to your account
      </h1>
      <p className="sentenses">
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
            {loginRes ?
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
      <p className="registerlink">Don’t have an account?<Link to={"/register-page"}> Register</Link></p>
    </div>
  );
}

const mapStateToProps = (state) => ({userData:state.getloginuser.getloginuser})

const mapDispatchToProps = {getLoginUserInstance, resetLogin}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModule);
