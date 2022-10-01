import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password:undefined,
  });
  const navigate=useNavigate()
  const { loading, error, dispatch } = useContext(AuthContext);
  const handleChange=(e)=>{
setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  }
  const handleClick=async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try {
        const res=await axios.post('http://localhost:5000/api/auth/login',credentials)
       
        if(res.data.isAdmin){
          dispatch({type:"LOGIN_SUCCESS",payload:res.data.details})
          navigate('/')
        }else{
          dispatch({type:"LOGIN_FAILURE",payload:{message:"You are not allowed!"}})  
        }
       
    } catch (error) {
        dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
    }
  }
 
  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="userName"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} className="lButton" onClick={handleClick} >Login </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;
