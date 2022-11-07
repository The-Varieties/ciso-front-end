import React, {useState } from "react";
import './index.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/Images/logo.png';
import { getLoginUserInstance, resetLogin } from "../../store/actions/LoginAction";
import { connect } from "react-redux";
import { useEffect } from "react";

function LoginModule(props){
  const [loginRes, setLoginRes] = useState(true);
  //const [accountRes, setAccountRes] = useState(true);

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
      <div className="mx-auto w-[420px] mt-20 md:w-[500px]">
          <img src={logo} alt="Logo"></img>
      </div>
      <h1 className="mt-3 text-white text-[30px] font-bold text-center md:text-4xl">
          Sign in to your account
      </h1>
      <p className="mt-2 text-center text-zinc-600 text-xl font-bold md:text-2xl">
          Start using our product
      </p>
        <form onSubmit={handleSubmit} className="flex mt-5 justify-center items-center flex-col">
          <div className="mx-2.5 md:mx-6">
            <label className="block text-white text-lg mt-4">Username </label>
            <input className="mt-2 h-12 text-left p-4 rounded-lg" type="text" name="uname" required size={45}/>
          </div>
          <div className="mx-2.5 md:mx-6">
            <label className="block text-white text-lg mt-5">Password </label>
            <input className="mt-2 h-12 text-left p-4 rounded-lg" type="password" name="pass" required size={45}/>
            {loginRes ?
              <div className="h-1"></div>
            :
              <div className="error h-1">Username or Password invalid</div>
            }
            {/* {accountRes ?
              <div className="h-1"></div>
            :
              <div className="error h-1">No account available</div>
            } */}
          </div>
          <div className="block text-center m-2.5 md:mx-6">
              <input className="mt-3 cursor-pointer text-lg bg-yellow-300 rounded-lg text-black py-2 px-[185px]" type="submit" value="Sign In"/>
          </div>
        </form>
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
