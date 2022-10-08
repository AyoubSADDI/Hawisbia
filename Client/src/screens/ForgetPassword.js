import React, { useState } from 'react';
import authSvg from '../assets/forget.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import log from "./img/whitelogo1.png";
import "./login.css";

const ForgetPassword = ({history}) => {
  const [formData, setFormData] = useState({
    email: '',
    textChange: 'Submit'
  });
  const { email, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/forgotpassword`, {
          email
        })
        .then(res => {
          
            setFormData({
              ...formData,
              email: '',
            });
            toast.success(`Please check your email`);
          
        })
        .catch(err => {
        console.log(err.response)
          toast.error(err.response.data.error);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };
  return (
    <>
       <div class="container1">
      <div class="forms-container">
        <div class="signin-signup">
        <ToastContainer />

          <form   onSubmit={handleSubmit} class="sign-in-form">
            <h2 class="title">Forgot password</h2>
            <div class="input-field">
            <i class="fas fa-user"></i>
              <input   
                                  type='email'
                                  placeholder='Email'
                                  onChange={handleChange('email')}
                                  value={email} />
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

export default ForgetPassword;
