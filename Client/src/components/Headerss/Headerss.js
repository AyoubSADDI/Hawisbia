/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import "./Headerss.css";
import { CSSTransition } from "react-transition-group";
import MenuIcon from '@material-ui/icons/Menu';
import { getCookie } from "helpers/auth";
import { NavLink, Redirect,Link  } from "react-router-dom";

export default function Headerss() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);
  var d = new Date();
  const h=d.getHours();
  const user =getCookie("user");
  const username=getCookie("username");
  const role=getCookie("role");
  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
      
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
  {
h>6 && h<19?(<a  style={{fontWeight:"bold",fontSize:"1rem"}} href="/">
          


         
        Home
         </a> ):
       (<a  style={{fontWeight:"bold"}} href="/">
          


         
         Home
          </a>)
      }
      {
h>6 && h<19?(<a  style={{fontWeight:"bold"}} href="/m/circuits">
          


         
        Circuit
         </a> ):
       (<a  style={{fontWeight:"bold"}} href="/m/circuits">
          


         
         Circuit
          </a>)
      }
       {
h>6 && h<19?(<Link  style={{fontWeight:"bold"}} to="/m/about">
          


         
        About us
         </Link> ):
       (<Link  style={{fontWeight:"bold"}}   href="/m/about">
          


         
         About us
          </Link>)
      }{
h>6 && h<19?(<a  style={{fontWeight:"bold"}} href="/m/services">
          


         
        Services
         </a> ):
       (<a  style={{fontWeight:"bold"}}  href="/m/services">
          


         
         Services
          </a>)
      }
       
      {
h>6 && h<19?(<a  style={{fontWeight:"bold"}} href="/m/places">
          


         
        Places
         </a> ):
       (<a style={{fontWeight:"bold"}}    href="/m/places">
          


         
         Places
          </a>)
      }
      
      {
h>6 && h<19?(<a  style={{fontWeight:"bold"}} href="/m/contact">
          


         
        Contact
         </a> ):
       (<a  style={{fontWeight:"bold"}}   href="/m/contact">
          


         
         Contact
          </a>)
      }

{
    username? (h>6 && h<19?(<a style={{fontWeight:"bold"}}  style={{textDecoration:"none",fontWeight:"bold"}} href={`/${role}`}>{username}</a>):(<a   style={{textDecoration:"none",fontWeight:"bold"}} href={`/${role}`}>{username}</a>)): (h>6 && h<19?(<a style={{textDecoration:"none" ,fontWeight:"bold"  }} href="/login">   Login
    </a>):(<a style={{textDecoration:"none",fontWeight:"bold"   }} href="/login">   Login
    </a>))
  }


{
    role!=="subscriber"&&role!==null? (<a  style={{textDecoration:"none",fontWeight:"bold"}} href={`/${role}`}>{role}</a>): null
  }

        </nav>
      </CSSTransition>
      <button onClick={toggleNav} >
        🍔<MenuIcon />
      </button>
    </header>
  );
}
