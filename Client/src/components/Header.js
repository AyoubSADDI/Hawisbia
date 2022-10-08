import React, { useState, useEffect,Component } from 'react';
import { NavLink, Redirect,Link  } from "react-router-dom";
import { getCookie } from '../helpers/auth';
import ReactPlayer from "react-player";

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Button from '@material-ui/core/Button';
import { indigo} from '@material-ui/core/colors';
const user =getCookie("user");
const username=getCookie("username");
const role=getCookie("role");
const Header=({history})=>{
  const [openMenu, setOpenMenu] = useState(false);
  const [isToggled, setIsToggled] = React.useState(true);
  const toggle = React.useCallback(() => setIsToggled(!isToggled));

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  var d = new Date();
  const h=d.getHours();
 
    return(
        <header >
<div id="main-menu" className="menu-init " > 
<nav>
        <ul>
        <li>
       <div
          id="logo"
          className="brand-expedition noselect">
          <a href="/myhomee" >
          <img src="/logo.png" alt="hawasBia"  style={{width:"60px",	marginTop:"-125%"}}  />
          </a>
        </div>
       </li><li>
 <Button        style={{ color: 'white' }} onClick={()=>toggle()} >{isToggled? (<VolumeUpIcon />) : (<VolumeOffIcon />)} </Button> 
 <ReactPlayer
                  url="https://res.cloudinary.com/hawesbeya/video/upload/v1621993222/audio/templedeaux_cczpca.mp3"
                  width="260px"
                  height="50px"
                  playing={isToggled}
                  controls={false}
                /> 
</li>
      
            <li className=" ">{
    h>6 && h<19?(<a  style={{fontWeight:"bold",fontSize:"1rem",color:"orange"}} href="/">
              
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
     <div className="" id="nav-icon">
     <span className="menu-line" onClick={toggleMenu}></span>
         <span className="menu-line1" onClick={toggleMenu}></span>
         <span className="menu-line2" onClick={toggleMenu}></span>
        
         {openMenu ? (
        <div className="burgers">
          <nav>
        <ul>
        <li>
 <Button        style={{ color: 'white' }} onClick={()=>toggle()} >{isToggled? (<VolumeUpIcon />) : (<VolumeOffIcon />)} </Button> 
 <ReactPlayer
                  url="https://res.cloudinary.com/hawesbeya/video/upload/v1621993222/audio/templedeaux_cczpca.mp3"
                  width="260px"
                  height="50px"
                  playing={isToggled}
                  controls={false}
                /> 
</li>
            <li className=" ">{
    h>6 && h<19?(<a  style={{fontWeight:"bold",fontSize:"1rem",color:"orange"}} href="/">
             
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
         </a>):(<a style={{textDecoration:"none",fontWeight:"bold",color:"orange"   }} href="/login">   Login
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
</header>
    )
}
export default Header;