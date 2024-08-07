import {React, useState} from 'react'
import '../css/signupPage.css'
import { Link, useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import logo from '../icons/logo.png';

    

function Signup() {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false); 
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = () => {
      if (password.length < 8) {
        window.alert("Please enter a password of at least 8 characters");
        return;
      }
      if (!(password === confirmPassword)) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        return;
      }
      axios.post('http://localhost:443/api/register', {email, username, password})
      .then((response)=>{
        console.log(response.data);
        const userData = {
          email: email,
          username: username,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        navigate("/login");
      })
      .catch((error)=>{
        window.alert("Sever Error Please try again later");
      })
    }
    return (
        <>
          <div className='form-box-holder'>
            <div className="form-box">
              <img className='logo' src={logo} alt="" />
              <h1 className='header-text'>Create Account</h1>
              <div className="input-box">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  type="text"
                  placeholder="Email"
                  style={{ fontFamily: 'sans-serif'}}
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="input-box">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  type="text"
                  placeholder="Username"
                  style={{ fontFamily: 'sans-serif'}}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-box">
                <ion-icon name="key-outline"></ion-icon>
                <input
                  type="password"
                  style={{ fontFamily: 'sans-serif'}}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />
              </div>
              <div className="input-box">
                <ion-icon name="key-outline"></ion-icon>
                <input
                  type="password"
                  style={{ fontFamily: 'sans-serif'}}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="password"
                />
              </div>
              <button onClick={handleRegister} style={{ fontFamily: 'sans-serif', fontSize: '1.2em'}} className="btnlogin" id="register" >
                Register
              </button>
              <div className="login-register">
                <p className='dont-have-acc-text'>
                  Already have an account?{" "}
                  <Link to="/login" className="register-link">
                    Sign In Here
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

export default Signup