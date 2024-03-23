import {React, useState} from 'react'
import '../css/loginPage.css'
import { Link, useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import axios from 'axios';

    

function Login() {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false); 

    const handleLogin = async () => {
        setError('');
    
        try {
          const response = await axios.post('http://localhost:443/api/login', { email, password });
          console.log("Response: ", response.data);
    
          const userData = {
            email: response.data.email,
          };
          localStorage.setItem('userData', JSON.stringify(userData));
          console.log(JSON.stringify(userData));
          console.log(response);
          const accessToken = response.data.jwtToken;
          navigate('/home')
        } catch (err) {
          setError(err.response?.data.message);
          console.log('Error: ', err);
        }
      };
    return (
        <>
          <div className='form-box-holder'>
            <div className="form-box">
              <h1 className='header-text'>Log in to FiziQ</h1>
              <div className="input-box">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  type="text"
                  placeholder="Email"
                  style={{ fontFamily: 'sans-serif', fontSize: '1.2em' }}
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="input-box">
                <ion-icon name="key-outline"></ion-icon>
                <input
                  type="password"
                  style={{ fontFamily: 'sans-serif', fontSize: '1.2em' }}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />
              </div>
              
              <button onClick={handleLogin} style={{ fontFamily: 'sans-serif', fontSize: '1.5em' }} className="btnlogin" id="register" >
                Log In
              </button>
              <div className="login-register">
                <p className='dont-have-acc-text'>
                  Dont have an account?{" "}
                  <Link to="/signup" className="register-link">
                    Sign up here
                  </Link>
                </p>
                {showAlert && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">Password do not match!</Alert>
            </Stack>
          )}
              </div>
            </div>
          </div>
        </>
      );
}

export default Login