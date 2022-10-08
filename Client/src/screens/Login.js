import React, { useState } from "react";
import log from "./img/whitelogo1.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { authenticate, isAuth, setCookie } from "../helpers/auth";
import { Link, NavLink, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "./login.css";

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    textChange: "Sign In",
  });
  const { email, password1, textChange } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const sendGoogleToken = (tokenId) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
        idToken: tokenId,
      })
      .then((res) => {
        console.log(res.data);
        setCookie("user",res.data.user);
        setCookie("username",res.data.user.name);
        setCookie("role",res.data.user.role);
        setCookie("id",res.data.user._id);
        informParent(res);
      })
      .catch((error) => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };
  const informParent = (response) => {
    authenticate(response, () => {
      
      if (isAuth() && isAuth().role === "admin") {   history.push("/admin")
    }
      else if (isAuth() && isAuth().role === "owner")         history.push("/owner")

      else if (isAuth() && isAuth().role === "subscriber")
      history.push("/subscriber")

      else  history.push("/login")
    });
  };

  const sendFacebookToken = (userID, accessToken) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
        userID,
        accessToken,
      })
      .then((res) => {
        console.log(res.data);
        setCookie("user",res.data.user);
        setCookie("username",res.data.user.name);
        setCookie("role",res.data.user.role);
        setCookie("id",res.data.user._id);
        informParent(res);
      })
      .catch((error) => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
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

  const handleSubmit = (e) => {
    console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: password1,
        })
        .then((res) => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: "",
              password1: "",
              textChange: "Submitted",
            });
            setCookie("user",res.data.user);
            setCookie("username",res.data.user.name);
            setCookie("role",res.data.user.role);
            setCookie("id",res.data.user._id);
            if (isAuth() && isAuth().role === "admin")   history.push("/admin/dashboard")

            else if (isAuth() && isAuth().role === "owner")
            history.push("/owner")
            else if (isAuth() && isAuth().role === "subscriber")
            history.push("/subscriber")
            else  history.push("/login")
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
          });
        })
        .catch((err) => {
          setFormData({
            ...formData,
            email: "",
            password1: "",
            textChange: "Sign In",
          });
          console.log(err.response);
          toast.error(err.response.data.errors);
        });
    } else {
      toast.error("Please fill all fields");
    }
  };
  const handleClick= (e)=>{
    history.push("/")
  }
  return (
    <>
    <div class="container1">
      <div class="forms-container">
      

      {isAuth() && isAuth().role==="admin" ? <Redirect to="/admin" /> : null}
      {isAuth() && isAuth().role==="subscriber" ? <Redirect to="/subscriber" /> : null}
      {isAuth() && isAuth().role==="owner" ? <Redirect to="/owner" /> : null}
        <div class="signin-signup">
        <ToastContainer />
          <form  onSubmit={handleSubmit} style={{display: "flex",alignItems: "center",justifyContent: "center",flexDirection: "column",padding: "0rem 5rem",
  transition: "all 0.2s 0.7s",
  overflow: "hidden",
  gridColumn: "1 / 2",
  gridRow: "1 / 2",
}}>
          <h3  class="title" >
         <Link to="/" ><i class="fas fa-home"></i></Link>

          </h3>
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input                   
                  type="email"
                  placeholder="Email"
                  onChange={handleChange("email")}
                  value={email} />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input                   
                  type="password"
                  placeholder="Password"
                  onChange={handleChange("password1")}
                  value={password1} />
            </div>
            <p>
              <Link to="/users/password/forget">Forgot password</Link>
            </p>
            <input type="submit" value="Login" class="btn1 solid" />
            <p class="social-text">Or Sign in with social platforms</p>
            <div class="social-media">
            <FacebookLogin
                  appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                  autoLoad={false}
                  callback={responseFacebook}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      className="social-icon"
                    >
                    <i class="fab fa-facebook-f"></i>

                    </button>
                  )}
                />
              <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="social-icon"
                    >
                      <i class="fab fa-google"></i>
                    </button>
                  )}
                ></GoogleLogin>
            </div>
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
            <Link to="/register" style={{padding:"1rem"}} class="btn1 transparent" id="sign-up-btn">
              Sign up
            </Link>


          </div>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Login;