import { Alert, Button, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import './sign-in.css'
import { Error, HttpsRounded } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { authActions } from "../stores/auth";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(error != null ? true : false);

  const setAlertError = (error) => {
    setError(error);
    setShowAlert(true);
  };
  
  const emailRef = useRef();
  const passRef = useRef();

  async function handleLogin (event) {
    const email = emailRef.current.value;
    const password = passRef.current.value;
    
    if (email === "" || password === "") {
      return setAlertError("Vui lòng điền đầy đủ!");
    }

    const admin = { 
      email: email,
      pw: password,
    };
    await axios.post('http://localhost:9090/api/accounts/signin/admin', admin)
      .then((res) => {
        console.log(res.data);
        if (res.data.email === undefined) {
          return setAlertError("Tài khoản này không phải là admin!");
        } else {
          setError(null);
          setShowAlert(false);
          const account = res.data;
          dispatch(authActions.setAuth(account));
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  return (
    <div className="login-bg">
      <div className='sign-in'>
        <h3>
          <HttpsRounded className='signin-icon' fontSize='large' />
          UIT BIKES ADMIN DASHBOARD
        </h3>
        <TextField inputRef={emailRef} fullWidth id="outlined-basic" className='login-email' label="Email" type='email' variant="outlined" />
        <TextField inputRef={passRef} fullWidth id="outlined-basic" className='login-password' label="Mật khẩu" type='password' variant="outlined" />

        <Button variant="contained" fullWidth className='login-submit' color="error" onClick={handleLogin}>                             
            Đăng nhập
        </Button>

        {showAlert && 
          <Alert icon={<Error className='login-notity' fontSize="inherit" />}
              severity="warning" sx={{ margin: "20px 0" }}
          >
            {error}
          </Alert>
        }
      </div>
    </div>
  )
}

export default SignIn
