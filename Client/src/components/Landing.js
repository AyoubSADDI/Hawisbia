import React, { Component } from "react";

import { getCookie } from "../helpers/auth";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Header from "./Header";
import { withTranslation } from "react-i18next";





const user = getCookie("user");
const username = getCookie("username");
const getCoordintes =()=> {
  var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
  };

  function success(pos) {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lng = crd.longitude.toString();
      var coordinates = [lat, lng];
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      getCity(coordinates);
      return;

  }

  function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}


// Step 2: Get city name
function getCity(coordinates) {
  var xhr = new XMLHttpRequest();
  var lat = coordinates[0];
  var lng = coordinates[1];


  // Paste your LocationIQ token below.
  xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.5a42ca6e0ae63aff846a241b6cffbe90&lat=" +
  lat + "&lon=" + lng + "&format=json", true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
  xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          var state=response.address.state
          var postcode=response.address.postcode;
          var country=response.address.country;
          var id=document.getElementById("curentLoc").innerText=state+" "+" "+postcode+" "+country;
          return;
      }
  }
}



 class Landing extends Component {
  constructor(props) {
    super(props);

  }
  
 componentDidMount(){
   getCoordintes();
 }

  render() {
    const { t } = this.props;

    const style1 = {
      backgroundImage: "url('img/zagh/0.jpg')",
    };
    const style2 = {
      backgroundImage: "url('img/zriba.jpg')",
    };
    const style3 = {
      backgroundImage: "url('img/temple.jpg')",
    };
    return (
      <>
   
<div style={{backgroundColor:"black",zIndex:"100"}}>
        <div id="wraperexpedition"  style={{backgroundColor:"black"}}>
          <div className="bgexpedition">
            <div id="owl-slider-home" className="owl-carousel">
              <div className="item imgbg" style={style1}></div>
              <div className="item imgbg" style={style2}></div>
              <div className="item imgbg" style={style3}></div>
            </div>
          </div>
        </div>

        
        <Header />


        <div className="contentexpedition">
          <div className="row">
            <div className="col-md-12">
              <h1  style={{color:"orange"}}>
              {t('Zaghouane')}
                
              </h1>
              <div
                className="devider-center "
              ></div>
              <div id="slidertext" >
                <div className="main-text">{t('intro')}</div>
            
              </div>

              <div  >
                <div>
                <span><img src="/marker1.png" style={{width: "3rem",color:"orange"}} /></span>
                <span id="curentLoc" style={{color:"orange"}} ></span>

                </div>
                    

                   
          
              </div>

              <div className="btn-home ">
                <a className="link-className" style={{color:"orange"}} href="/m/virtual">
                {t('Take tour')}
                </a>
              </div>
              <div className="btn-home " >
                <a className="link-className" style={{color:"orange",fontSize:"1rem",fontWeight:"1rem"}} href="https://myserverhawasbia.herokuapp.com/intro">
                {t('Discover')}
                </a>
              </div>
            </div>
            

            <div
              id="subwrap"
              className="white-popup-block mfp-hide "
              data-time="0"
            >
              <h5>Please fill your email below</h5>
              <form
                id="subscribe"
                action="http://on3-step.com/tf/expedition/expedition-v1/expedition-v2/subscribe.php"
                method="post"
                name="subscribe"
              >
                <input
                  className="subscribfield subscribeemail"
                  id="subscribeemail"
                  name="subscribeemail"
                  type="text"
                />
                <button id="submit-2" className="btn-form" type="submit">
                  Subscribe
                </button>
              </form>
              <div className="subscribesuccess">
                Thank you for fill your email
              </div>
            </div>
          </div>
        </div>

     
        </div>
    
      </>
    );
  }
}
export default withTranslation()(Landing);