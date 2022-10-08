import React, { useState ,useRef } from 'react';
import authSvg from '../assets/auth.svg';
import { ToastContainer, toast } from 'react-toastify';
import log from "./img/whitelogo1.png";

import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, NavLink, Redirect } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import "./login.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
    textChange: 'Sign Up'
  });
  const [token, setToken] = useState("");
  const reCaptcha = useRef();

  const { name, email, password1, password2, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        if(token){
          setFormData({ ...formData, textChange: 'Submitting' });
          axios
            .post(`${process.env.REACT_APP_API_URL}/register`, {
              token,
              name,
              email,
              password: password1
            })
            .then(res => {
              reCaptcha.current.reset();
              setToken("");
              setFormData({
                ...formData,
                name: '',
                email: '',
                password1: '',
                password2: '',
                textChange: 'Submitted'
              });
  
              toast.success(res.data.message);
            })
            .catch(err => {
              setFormData({
                ...formData,
                name: '',
                email: '',
                password1: '',
                password2: '',
                textChange: 'Sign Up'
              });
              console.log(err.response);
              toast.error(err.response.data.errors);
            });
        }else {
          
          toast.error("You must verify the captcha");
        }
        
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error('Please fill all fields');
    }
  };

  return (
    <>
     <div class="container1">
      <div class="forms-container">
      {isAuth() ? <Redirect to='/' /> : null}
      <ToastContainer />
        <div class="signin-signup">
          <form  onSubmit={handleSubmit} >
          <h3  class="title" >
         <Link to="/" ><i class="fas fa-home"></i></Link>

          </h3>

            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input       type='text'
                  placeholder='Name'
                  onChange={handleChange('name')}
                  value={name} />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email} />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input  type='password'
                  placeholder='Password'
                  onChange={handleChange('password1')}
                  value={password1} />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input                   type='password'
                  placeholder='Confirm Password'
                  onChange={handleChange('password2')}
                  value={password2} />
            </div>
            <div >
            <ReCAPTCHA
                  ref={reCaptcha}
                  sitekey="6LdP67MaAAAAAGctvZFFsEo92C90QTMvMDrhkxq4"
                  onChange={token =>setToken(token)}
                  onExpired={e => setToken("")}
                  />

            </div>
            <input type="submit" class="btn1" value="Sign up" />
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
            <Link to="/login" style={{padding:"1rem"}} class="btn1 transparent" id="sign-up-btn">
              Login
            </Link>


          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
