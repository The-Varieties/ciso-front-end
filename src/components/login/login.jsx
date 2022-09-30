import React from "react";
import './index.css';
import { Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/Images/logo.png';

function LoginModule({setToken}){
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setToken('123');
        navigate('/');
    }

    return(
        <div className="justify-content-center">
            <div className="icon">
                <img src={logo} alt="logo"></img>
            </div>
            <h1 className="title">
                Sign in to your account
            </h1>
            <p className="sentenses">
                Start using our product
            </p>
            
            <div className="logintable">
            <form onSubmit={onSubmitHandler}>
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
            <p className="registerlink">Don’t have an account? <Link to={"/register-page"}>Register</Link></p>
        </div>
    )
}

export default LoginModule;