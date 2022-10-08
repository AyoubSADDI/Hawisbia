import React, { useState, useEffect } from 'react';
import authSvg from "../assets/auth.svg";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import log from "./img/whitelogo1.png";
import "./login.css";
const ResetPassword = ({match}) => {
  const [formData, setFormData] = useState({
      password1: '',
      password2: '',
      token: '',
    textChange: 'Submit'
  });
    const { password1, password2, textChange, token } = formData;
    
    useEffect(() => {
        let token = match.params.token
        if(token) {
            setFormData({...formData, token,})
        }
        
    }, [])
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
    const handleSubmit = e => {
      console.log(password1, password2)
    e.preventDefault();
    if ((password1 === password2) && password1 && password2) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/resetpassword`, {
            newPassword: password1,
            resetPasswordLink: token
        })
        .then(res => {
          console.log(res.data.message)
            setFormData({
              ...formData,
               password1: '',
              password2: ''
            });
            toast.success(res.data.message);
          
        })
        .catch(err => {
          toast.error('Something is wrong try again');
        });
    } else {
      toast.error('Passwords don\'t matches');
    }
  };
  return (
    <>
     <div class="container1">
      <div class="forms-container">
        <div class="signin-signup">
        <ToastContainer />

          <form  onSubmit={handleSubmit} class="sign-in-form">
            <h2 class="title">Reset password</h2>
            <div class="input-field">
            <i class="fas fa-lock"></i>
              <input   
                  type='password'
                  placeholder='password'
                  onChange={handleChange('password1')}
                  value={password1} />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input                 
                  type='password'
                  placeholder='Confirm password'
                  onChange={handleChange('password2')}
                  value={password2} />
            </div>
            <input type="submit" value="Reset password" class="btn1 solid" />
          </form>
        </div>
      </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
          <div>
            <img src={log}  height="112" width="73" class="image" alt="Login hawasbia" />

            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <Link to="/" style={{padding:"1rem"}} class="btn1 transparent" id="sign-up-btn">
              Home
            </Link>


          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ResetPassword;
