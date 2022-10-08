
import PropTypes from 'prop-types';
import '../../assets/css/app.css';
import {MdArrowForward} from 'react-icons/md';
import {FaGooglePlus, FaFacebook, FaLinkedin} from 'react-icons/fa';
import {Motion, spring} from 'react-motion';
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { authenticate, isAuth, setCookie } from "../../helpers/auth";
import { Link, NavLink, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { faLinkedinIn } from '@fortawesome/fontawesome-free-brands';


const SubmitButton = (props) => {

	let socialNets = null;

	

	const [formData, setFormData] = useState({
		email: "",
		password1: "",
		textChange: "Sign In",
	  });

	
	  const sendGoogleToken = (tokenId) => {
		axios
		  .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
			idToken: tokenId,
		  })
		  .then((res) => {
			console.log(res.data);
			setCookie("user",res.data.user);
			setCookie("username",res.data.user.name);
			informParent(res);
		  })
		  .catch((error) => {
			console.log("GOOGLE SIGNIN ERROR", error.response);
		  });
	  };
	  const informParent = (response) => {
		authenticate(response, () => {
		  
		  if (isAuth() && isAuth().role === "admin") {   props.push("/admin")
		}
		  else if (isAuth() && isAuth().role === "owner")         props.push("/owner")
	
		  else if (isAuth() && isAuth().role === "subscriber")
		  props.push("/subscriber")
	
		  else  props.push("/login")
		});
	  };

	  const responseGoogle = (response) => {
		console.log(response);
		sendGoogleToken(response.tokenId);
	  };
	
	  const responseFacebook = (response) => {
		console.log(response);
		sendFacebookToken(response.userID, response.accessToken);
	  };

	  const sendFacebookToken = (userID, accessToken) => {
		axios
		  .post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
			userID,
			accessToken,
		  })
		  .then((res) => {
			console.log(res.data);
			informParent(res);
		  })
		  .catch((error) => {
			console.log("GOOGLE SIGNIN ERROR", error.response);
		  });
	  };

	if (props.type == 'signIn') {
		socialNets = (
			<div className='socialNets'>
			  <FacebookLogin
                  appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                  autoLoad={false}
                  callback={responseFacebook}
                  render={(renderProps) => (
                    <a
                      onClick={renderProps.onClick}
                    >
                       <div className="socialNets">
						  <FaFacebook className='socialNetsIcon'/>
                      </div>
                    </a>
                  )}
                />

				<GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  render={(renderProps) => (
                    <a
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      
>
	                      <div className="socialNets">
						  <FaGooglePlus className='socialNetsIcon'/>
                      </div>
                   
                    </a>
                  )}
                ></GoogleLogin>

				<div className="socialNets">
				<FaLinkedin className='socialNetsIcon'/>
				</div>
			</div>

			

			
		)
	} else {
		socialNets = (
			<div className='socialNets'>
			</div>
		)
	}
	return (
		<div className={'submitButton'}>
			{socialNets}
			<button className={props.type=='signIn' ? 'submitSignIn' : 'submitSignUp'}><MdArrowForward/></button>
		</div>
	);
} 


export default SubmitButton;