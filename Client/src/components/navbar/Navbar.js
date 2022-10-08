import React from 'react'
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";

import Brand from "./Brand";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";
import { Link } from 'react-router-dom';
import { getCookie } from "../../helpers/auth";
import { useState, useEffect,Component } from 'react';


const Navbar = (props) => {
  const barAnimation = useSpring({
    from: { transform: 'translate3d(0, -10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  });

  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.wobbly,
  });

  const user =getCookie("user");
const username=getCookie("username");
const role=getCookie("role");
const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  var d = new Date();
  const h=d.getHours();
  const [position, setPosition] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true) 
  useEffect(()=> {
      const handleScroll = () => {
         let moving = window.pageYOffset
         
         setVisible(position > moving);
         setPosition(moving)
      };
      window.addEventListener("scroll", handleScroll);
      return(() => {
         window.removeEventListener("scroll", handleScroll);
      })
  })

const cls = visible ? "visible" : "hidden";
  return (
    <>
<header className={cls}>
  <div id="main-menu" className="menu-init " > 
<nav>
        <ul>
       
       <li>
       <div
          id="logo"
          className="brand-expedition noselect"
          
        >
          <a href="/myhomee" >
          <img src="/logo.png" alt="hawasBia" style={{width:"60px",	marginTop:"-125%"}}  />
          </a>
        </div>
       </li>
            <li className=" ">{
    h>6 && h<19?(<a  style={{fontWeight:"bold",fontSize:"1rem", color: "orange"}} href="/">
               
  
  
              
             Home
              </a> ):
            (<a  href="/">
               
  
  
              
              Home
               </a>)
           }
            </li>
            <li className=" ">{
    h>6 && h<19?(<a  href="/m/circuits">
               
  
  
              
             Circuit
              </a> ):
            (<a  href="/m/circuits">
               
  
  
              
              Circuit
               </a>)
           }
            </li>
            <li >{
    h>6 && h<19?(<Link  to="/m/about">
               
  
  
              
             About us
              </Link> ):
            (<Link    href="/m/about">
                          
              About us
               </Link>)
           }</li>
            <li  >{
    h>6 && h<19?(<a  href="/m/services">
                            
             Services
              </a> ):
            (<a   href="/m/services">
                            
              Services
               </a>)
           }
            
            </li>
            <li  >{
    h>6 && h<19?(<a  href="/m/places">
                           
             Places
              </a> ):
            (<a    href="/m/places">              
              
              Places
               </a>)
           }
           
            </li>
            <li >{
    h>6 && h<19?(<a  href="/m/contact">
               
             Contact
              </a> ):
            (<a    href="/m/contact">
                             
              Contact
               </a>)
           }</li>
            <li >

{
         username? (h>6 && h<19?(<a  style={{textDecoration:"none",fontWeight:"bold",color:"orange"}} href={`/${role}`}>{username}</a>):(<a   style={{textDecoration:"none",fontWeight:"bold",color:"orange"}} href={`/${role}`}>{username}</a>)): (h>6 && h<19?(<a style={{textDecoration:"none" ,fontWeight:"bold" ,color:"orange" }} href="/login">   Login
         </a>):(<a style={{textDecoration:"none",fontWeight:"bold"  ,color:"orange" }} href="/login">   Login
         </a>))
       }
</li>
            <li >

{
         role!=="subscriber"&&role!==null? (<a  style={{textDecoration:"none",fontWeight:"bold"}} href={`/${role}`}>{role}</a>): null
       }
</li>           
        </ul>
</nav>   
</div>
    <div className="" id="nav-icon">
         <span className="menu-line" onClick={toggleMenu}></span>
         <span className="menu-line1" onClick={toggleMenu}></span>
         <span className="menu-line2" onClick={toggleMenu}></span>
         {openMenu ? (
        <div className="burgers">
          <nav>
        <ul>
            <li className=" ">{
    h>6 && h<19?(<a  style={{fontWeight:"bold",fontSize:"1rem", color: "orange"}} href="/">
             
             Home
              </a> ):
            (<a  href="/">
              Home
               </a>)
           }
            </li>
            <li className=" ">{
    h>6 && h<19?(<a  href="/m/circuits">        
             Circuit
              </a> ):
            (<a  href="/m/circuits">Circuit</a>)
           }
            </li>
            <li >{
    h>6 && h<19?(<Link  to="/m/about"> About us</Link> ):
(<Link    href="/m/about">
              About us
               </Link>)
           }</li>
            <li  >{
    h>6 && h<19?(<a  href="/m/services">   
             Services
              </a> ):
            (<a   href="/m/services">              
              Services
               </a>)
           }          
            </li>
            <li  >{
    h>6 && h<19?(<a  href="/m/places">          
             Places
              </a> ):
            (<a    href="/m/places">       
              Places
               </a>)
           }
           
            </li>
            <li >{
    h>6 && h<19?(<a  href="/m/contact">          
             Contact
              </a> ):
            (<a    href="/m/contact">     
              Contact
               </a>)
           }</li>
            <li >
{
         username? (h>6 && h<19?(<a  style={{textDecoration:"none",fontWeight:"bold",color:"orange"}} href={`/${role}`}>{username}</a>):(<a   style={{textDecoration:"none",fontWeight:"bold",color:"orange"}} href={`/${role}`}>{username}</a>)): (h>6 && h<19?(<a style={{textDecoration:"none" ,fontWeight:"bold" ,color:"orange" }} href="/login">   Login
         </a>):(<a style={{textDecoration:"none",fontWeight:"bold" ,color:"orange"  }} href="/login">   Login
         </a>))
       }
</li>
            <li >
{
         role!=="subscriber"&&role!==null? (<a  style={{textDecoration:"none",fontWeight:"bold"}} href={`/${role}`}>{role}</a>): null
       }
</li>    
        </ul>
</nav>   
        </div>
      ) : null}
     </div>

      <CollapseMenu 
        navbarState={props.navbarState} 
        handleNavbar={props.handleNavbar}
      />
      </header>
 
   </>
  )
}

export default Navbar

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #2d3436;
  z-index: 100000;
  font-size: 0.8rem;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;;
  justify-content: space-between;
  height: 5rem;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;
  
  & a {
    color: #dfe6e9;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;
 
const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 769px) {
    display: none;
  }
`;