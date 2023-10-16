import { Button, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import './sign-in.css'
import { HttpsRounded } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from "../stores/auth";

const SignIn = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(error !== null ? true : false);

  const setAlertError = (error) => {
    setError(error);
    setShowAlert(true);
  };
  
  const emailRef = useRef();
  const passRef = useRef();

  async function handleLogin (event) {
    const email = emailRef.current.value;
    const password = passRef.current.value;
    console.log(email, password);
    
    if (email === "" || password === "") {
      return setAlertError("Vui lòng điền đầy đủ!");
    }

    //sign in successfully
    event.preventDefault();
    setError(null);
    setShowAlert(false);
    const account = [email, password];
    dispatch(authActions.setAuth(account));
    // try {
    //   const user = { 
    //     email: email,
    //     password: password,
    //   };
    //   await axios.post('http://localhost:9098/api/login', user).then((res) => {
    //     console.log(res.data);
    //     if (res.data == null) {
    //       alert("Email or password is incorrect!");
    //     } else if (res.data != null) {
    //       setError(null);
    //       setShowAlert(false);
    //       const account = res.data;
    //       dispatch(authActions.setAuth(account));
    //       navigate("/home");
    //       closeLoginPopup();
    //       alert("Successfully");
    //     }
    //   }, fail => {
    //     console.error(fail);
    //   });
    // } catch (error) {
    //   alert(error);
    // }
  };

  return (
    <div className="login-bg">
      <div className='sign-in'>
        <h3>
          <HttpsRounded className='signin-icon' fontSize='large' />
          UIT BIKES ADMIN DASHBOARD
        </h3>
        <TextField ref={emailRef} fullWidth id="outlined-basic" className='login-email' label="Email" type='email' variant="outlined" />
        <TextField ref={passRef} fullWidth id="outlined-basic" className='login-password' label="Mật khẩu" type='password' variant="outlined" />

        <Button variant="contained" fullWidth className='login-submit' color="error" onClick={handleLogin}>                             
            Đăng nhập
        </Button>

        {showAlert && (<div className='login-notity'>{error}</div>)}
      </div>
    </div>
  )
}

export default SignIn
