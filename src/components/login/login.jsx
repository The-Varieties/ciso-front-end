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
  }, //eslint-disable-next-line
    [props.userData])


  const handleSubmit = (event) => {
    event.preventDefault();
    
    var { uname, pass } = document.forms[0];
    
    props.getLoginUserInstance(uname.value, pass.value);
  };

  return (
    <div className="justify-center">
      <div className="mx-auto w-[500px] mt-20">
          <img src={logo} alt="Logo"></img>
      </div>
      <h1 className="mt-3 text-white text-4xl font-bold text-center">
          Sign in to your account
      </h1>
      <p className="mt-2 text-center text-zinc-600 text-xl font-bold">
          Start using our product
      </p>
      
      <div className="mt-5 flex justify-center items-center flex-col">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 m-2.5">
            <label className="text-white text-lg mt-2">User Name </label>
            <input className="h-12 text-left p-4 rounded-lg" type="text" name="uname" required size="50"/>
          </div>
          <div className="flex flex-col gap-2 m-2.5">
            <label className="text-white text-lg mt-2">Password </label>
            <input className="h-12 text-left p-2 rounded-lg" type="password" name="pass" required size="50"/>
            {loginRes ?
              <div className="h-1"></div>
            :
              <div className="error h-1">Username or Password invalid</div>
            }
          </div>
          <div className="flex justify-center mt-5">
              <input className="mt-3 cursor-pointer text-lg bg-yellow-300 rounded-lg text-black py-2 px-52 " type="submit" value="Sign In"/>
          </div>
        </form>
      </div>
      <p className="registerlink">Don’t have an account?<Link to={"/register-page"}> Register</Link></p>
    </div>
  );

  // return (
  //   <div className="justify-center">
  //     <div className="icon">
  //         <img src={logo}></img>
  //     </div>
  //     <h1 className="text-white text-[35px] font-bold text-center mt-2">
  //         Sign in to your account
  //     </h1>
  //     <p className="text-center text-gray-500 font-bold text-[20px]">
  //         Start using our product
  //     </p>
      
  //     <div className="mt-5 flex item-center justify-center">
  //       <form onSubmit={handleSubmit}>
  //         <div className="flex flex-col gap-2">
  //           <label className="text-white font-bold text-[20px] text-left">User Name </label>
  //           <input type="text" name="uname" className="h-[45px] text-left p-3 text-[20px] rounded-md" required size="50"/>
  //         </div>
  //         <div className="input-container">
  //           <label>Password </label>
  //           <input type="password" name="pass" required size="50"/>
  //           {loginRes ?
  //             <div className="h-1"></div>
  //           :
  //             <div className="error h-1">Username or Password invalid</div>
  //           }
  //         </div>
  //         <div className="button-container">
  //             <input type="submit" value="Sign In"/>
  //         </div>
  //       </form>
  //     </div>
  //     <p className="registerlink">Don’t have an account?<Link to={"/register-page"}> Register</Link></p>
  //   </div>
  // );
}

const mapStateToProps = (state) => ({userData:state.getloginuser.getloginuser})

const mapDispatchToProps = {getLoginUserInstance, resetLogin}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModule);
