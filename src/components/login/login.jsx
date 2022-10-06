import React, {useState } from "react";
import './index.css';
import { Link, useNavigate,ReactDOM} from 'react-router-dom';
import logo from '../../assets/Images/logo.png';
import { getLoginUserInstance } from "../../store/actions/LoginAction";
import { connect } from "react-redux";
import { useEffect } from "react";

function LoginModule(props){
    /// Success log in
    const [loginRes, setLoginRes] = useState(true);

    let navigate = useNavigate();

    // console.log(props)

    useEffect(() => {
      console.log(props.userData)

      // Check whether the props.userData got value or not
      // If got value, then navigate
      // If got no value, then setSubmitted to false



      // Reference
      // if(loginRes == uname.userId) {
      //   //  store data (token and userId) to session storage --> check alesandro's code or ask alesandro to work on this
      //     setToken(userId);
      //     setIsSubmitted(true);
      //     navigate('/')
      //   } else { // login failed
      //     setIsSubmitted(false);
      //   }

      if(props.userData !== null){
        setLoginRes(true);
      }else{
        setLoginRes(false);
      }

    }, [props.userData])

    const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault();
      
      var { uname, pass } = document.forms[0];
      
      props.getLoginUserInstance(uname.value, pass.value);

      if(loginRes == true){
        navigate('/dashboard')
      }else{
        loginRes(false);
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
        <p class="registerlink">Don’t have an account? <a><Link to={"/register-page"}>Register</Link></a></p>
      </div>
    );
}

const mapStateToProps = (state) => ({userData:state.getloginuser.getloginuser})

const mapDispatchToProps = {getLoginUserInstance}

// export default LoginModule;
export default connect(mapStateToProps, mapDispatchToProps)(LoginModule);