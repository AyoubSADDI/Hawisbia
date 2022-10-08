import React from 'react';

import LanguageSelect from './LanguageSelect';
import { getCookie } from '../helpers/auth';
import {  REACT_APP_Client_URL } from '../constants';



const deplace=()=>{
  window.location.replace(REACT_APP_Client_URL);
}
const deplace1=()=>{
window.location.replace(REACT_APP_Client_URL)
}
const username=getCookie("username");
const HeaderA=({history})=>{
    return(
        <header>
<div id="main-menu" className="menu-init"> 
<nav>
        <ul>
        <li >
            <LanguageSelect />

</li>
            <li ><a href="/">Home</a> 
           
            </li>
            <li ><a href="/m/about">About Us</a></li>
            <li ><a href="/m/services">Services</a>
            
            </li>
            <li ><a href="/m/places">Places</a>
           
            </li>
            <li ><a href="/m/contact">Contact</a></li>

             <li >

             {
                      username? (<a style={{textDecoration:"none"}} onClick={deplace1}>{username}</a>): (<a style={{textDecoration:"none"}} onClick={deplace}>Login</a>)
                    }
             </li>
           
        </ul>
</nav>   
</div>
     <div  id="nav-icon">
         <div className="menu-line"></div>
         <div className="menu-line1"></div>
         <div className="menu-line2"></div>
     </div>
</header>
    )
}
export default HeaderA;