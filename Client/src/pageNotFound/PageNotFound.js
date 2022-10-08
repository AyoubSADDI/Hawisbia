import React from 'react'
import "./style.css"
import log from "./logo.png";
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { blue, green } from '@material-ui/core/colors';

export default function PageNotFound() {

    return (
        <div class="wrap">
            
     
    
        <div class="main">
     
          <div className="main1">
  
          </div>
          <div class="wrapper">
          <a href="/">
   <HomeIcon style={{ color: blue[700], height:"2rem",width:"2rem" }} />
</a>
            <div class="main-top" >
              
              <h2 style={{fontSize:"8rem"}}>404</h2>

            </div>
        
    
            <div class="main-bottom">
              <div>
                <div class="icon-content icon-facebook" style={{marginRight:"0.5rem"}}>
                  <span class="icon fab fa-facebook"></span>
                </div>
                <div class="icon-content icon-twitter"  style={{marginRight:"0.5rem"}}>
                  <span class="icon fab fa-twitter"></span>
                </div>
                <div class="icon-content icon-youtube"  style={{marginRight:"0.5rem"}}>
                  <span class="icon fab fa-youtube"></span>
                </div>
                <div class="icon-content icon-google"  style={{marginRight:"0.5rem"}}>
                  <span class="icon fab fa-google"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
    
      
      </div>
    )
}
