import React, { Component } from 'react'
import "./index.css"

export default class Services extends Component {
    render() {
        return (
            <>
         

    <div id="wraperexpedition">
      

     

      <div class="main-content">
        <div class="row">

          <div class="col-md-12 spacedown">
            <h1 >
              All services
            </h1>
            
            <div class="devider-page " ></div>
          </div>

          <div
            class="col-md-12 color-gray spacedown "
          >
            <h3>Activity</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/game.jpg"
              style={{height:'600px'}}
            />
            
            <div class="btn-content">
              <a class="dlink-class" href={process.env.PUBLIC_URL+ `/m/games` }>Activities</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown"
            data-time="1300"
          >
            <h3>Events</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/festival.jpg"
              style={{height:'600px'}}/>
         
            <div class="btn-content">
              <a class="link-class" href="/m/events">Events</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown "
          >
            <h3>Guest House</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/dar.jpg" 
              style={{height:'600px'}}
            />
          
            <div class="btn-content">
              <a class="link-class" href="/m/maison">Maison d'hotes</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown"
            data-time="1300"
          >
            <h3>Restaurant</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/resto.jpg"
              style={{height:'600px'}}
            />
            
            <div class="btn-content">
              <a class="link-class" href="/m/restaurants">Restaurants</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown"
            data-time="1300"
          >
            <h3>Camping Center</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/Camping.jpg"
              style={{height:'600px'}}
            />
           
            <div class="btn-content">
              <a class="link-class" href="/m/camping">Camping center</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown "
          >
            <h3>Products</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/nesri.jpg"
              style={{height:'600px'}}
            />
        
            <div class="btn-content">
              <a class="link-class" href="/m/products">Products</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown"
          >
            <h3>Gastronomy</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/gast.jpg"
              style={{height:'600px'}}
            />
    

            <div class="btn-content">
              <a class="link-class" href="/m/castronomy">Gastronomy</a>
            </div>
          </div>
        </div>
      </div>
      </div>
            </>
        )
    }
}
