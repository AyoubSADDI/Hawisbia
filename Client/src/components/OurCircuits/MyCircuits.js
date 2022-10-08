import { Loading } from 'layouts/Loading';
import React, { Component, useEffect, useState } from 'react'
import api from '../ContactComponents/axios';
import { toast } from "react-toastify";

import "../index.css"

const MyCircuits=()=> {



  



        return (
            <>
         

    <div id="wraperexpedition">
      <div class="main-content">
        <div class="row">

          <div class="col-md-12 spacedown">
            <h1  >
              All Circuits
            </h1>
            
            <div class="devider-page " style={{color:"#FFA500"}} ></div>
          </div>

          <div
            class="col-md-12 color-gray spacedown "
          >
            <h3>Customize your tour</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/img1.jpg" style={{height:"500px"}}
            />
            <div class="btn-content">
              <a class="dlink-class" href={process.env.PUBLIC_URL+ `/m/perso` }>Choose A Tour</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown "
          >
            <h3>Circuit Soufi</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/img2.jpg" style={{height:"500px"}}
            />
            <div class="btn-content">
              <a class="dlink-class" href={process.env.PUBLIC_URL+ `/m/soufi` }>Circuit Soufi</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown "
          >
            <h3>Circuit Sante</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/img3.jpg" style={{height:"500px"}}
            />
            
            <div class="btn-content">
              <a class="dlink-class" href={process.env.PUBLIC_URL+ `/m/sante` }> Circuit Sante</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown "
          >
            <h3>Circuit Sportif</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/game.jpg" style={{height:"500px"}}
            />
     
            <div class="btn-content">
              <a class="dlink-class" href={process.env.PUBLIC_URL+ `/m/sportif` }>Circuit Sportif</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown "
          >
            <h3>Culturel</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/img5.jpg" style={{height:"500px"}}
            />
          
            <div class="btn-content">
              <a class="dlink-class" href={process.env.PUBLIC_URL+ `/m/cult` }>Circuit Culturel</a>
            </div>
          </div>
        </div>
      </div>
      </div>
            </>
        )
    
}
export default MyCircuits;
