import React, { Component, useRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MapInfo from "./MapInfo";
import Routing from "./RoutingMachine";
import FullscreenControl from "react-leaflet-fullscreen";
import AudioPlayer from "../AudioComponent/AudioPlayer";
import ReactPlayer from "react-player";
import L from "leaflet";
import api from '../ContactComponents/axios';
import { toast } from "react-toastify";
import axios from "components/DetailsComp/axios";
import ChildCareIcon from '@material-ui/icons/ChildCare';
import PhoneIcon from '@material-ui/icons/Phone';
import { withStyles } from '@material-ui/core/styles';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import { green,yellow } from '@material-ui/core/colors';
import { Player } from 'video-react';
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";
import { geolocated } from "react-geolocated";
import Geocalisation from "./Geocalisation";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class MapsSante extends React.Component {
  constructor(props) {
    super();
    this.state = {
      lat: 36.397502,
      lng: 10.145531,
      zoom: 7,
      isMapInit: false,
      map:null,
      markersData: [props.latitude,props.longitude],
      loading:true,
      places:[],
      markers:[[36.41,10.12],
      [36.54, 10.07],
    ],
    pos:[36.397502,10.145531],
    loc: Geocalisation,
    location:{
      loaded: false,
      coordinates: { lat: "", lng: "" },
    }



    };
    

  this.map = this.mapInstance;
   // this.onClickNewYork = this.onClickNewYork.bind(this)
    this.mapFlyTo = this.mapFlyTo.bind(this)
  }



  addMarker = (e) => {
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers})
  }
  onSuccess = (location) => {
    this.setState({
        loaded: true,
        coordinates: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        },
    });
};

onError = (error) => {
    this.setState({
        loaded: true,
        error: {
            code: error.code,
            message: error.message,
        },
    });
};
  


  saveMap = (map) => {
    this.map = this.mapInstance = map;
    this.setState({
      isMapInit: true
    });
  };

  componentDidMount() {
    this.map = this.mapInstance.leafletElement
    axios.get(`${process.env.REACT_APP_URL}placee/circuit/sante` , {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      const places = res.data;
      console.log(res.data);
        this.setState({ places,loading:false });
        
console.log(this.state.places);
      //  console.log(images);
    })
    .catch((err) => {
      toast.error(`Error To Your Information `);
    });
    if (!("geolocation" in navigator)) {
      this.onError({
          code: 0,
          message: "Geolocation not supported",
      });
  }
  navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
  }
      componentDidUpdate(){
        if (!("geolocation" in navigator)) {
            this.onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    }

  mapFlyTo(markersData) {
    console.log(markersData)
    this.map.flyTo(markersData, 14)
  }

  onClickLondon() {
    console.log(this.map)
    this.map.flyTo([51.505, -0.09], 15)
  }
  addMarker = (e) => {
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers})
  }
  handlePosition(){
    this.setState({
      pos:[this.props.coords.latitude,this.props.coords.longitude]
    })
  }

  render() {


    const { lat, lng, zoom } = this.state;
    const position =this.props.coords ? [this.props.coords.latitude,this.props.coords.longitude] : [this.state.lat, this.state.lng];
    const marker =this.state.markersData;
    console.log(this.props.coords);
    console.log("aaaa");


    const way= [[36.41,10.12],
    [36.54, 10.07],
  ]
    console.log(this.state.places);

    const url = `https://cdn.simplecast.com/audio/17ba21/17ba21db-66b5-4612-855e-556b20f60155/6cd39874-c070-417b-8cd0-481cb8c6e866/Undefined_E9_Nader_tc.mp3`;
    const audiourl = `https://cdn.simplecast.com/audio/17ba21/17ba21db-66b5-4612-855e-556b20f60155/6cd39874-c070-417b-8cd0-481cb8c6e866/Undefined_E9_Nader_tc.mp3`;
  const all=this.state.places.map((p) =>{
    const m=[p.lanPlace,p.longPlace]
    console.log(this.state.loc.latitude);
    return(
      <div className="card"  id="grid1" onMouseOver={() => this.mapFlyTo(m)}>
               <img src={p.imgCollection[0]}  alt={`hawas bia place ${p.namePlace}`}
                   />
                 <div className="info">
                     <h6><span style={{marginRight:"1rem"}}>{p.namePlace}</span><PhoneIcon style={{ color: yellow[500] }} /> <ThreeDRotationIcon style={{ color: yellow[500] }} /> <ThreeSixtyIcon style={{ color: yellow[500] }} /></h6>
                     <div className="text" id="style-8">
                       <div className="force-overflow">
                       <ReadMoreReact text= {p.descriptionPlace}
                      min={50}
                      ideal={100}
                      max={200}
                      readMoreText={(<div style={{color:"yellow"}}>Read more</div>)}/>
                      <div style={{marginTop:"1rem",marginBottom:"1rem"}}>
                      <ReactPlayer
                  url={p.audios[0]}
                  width="260px"
                  height="50px"
                  playing={false}
                  controls={true}
                /> 
                      </div>
                        
                          <Player>
      <source src={p.videos[0]} />
    </Player>
                        
                       </div>
                     </div>  
                 
             
                
                          
                 </div>
             </div>
    )

  })
  const all1=this.state.places.map((p) =>{
    console.log("geo");
    console.log(this.state.loc);
    const m=[p.lanPlace,p.longPlace]
    return(
      <Marker key={`marker-${p._id}`} position={m}>
      <Popup>
      <div className="card"  id="grid1" >
               <img src={p.imgCollection[0]}  alt={`hawas bia place ${p.namePlace}`}
                   />
                 <div className="info">
                     <h6><span style={{marginRight:"1rem"}}>{p.namePlace}</span><PhoneIcon style={{ color: yellow[500] }} /> <ThreeDRotationIcon style={{ color: yellow[500] }} /> <ThreeSixtyIcon style={{ color: yellow[500] }} /></h6>
                     <div className="text" id="style-8">
                       <div className="force-overflow">
                       <ReadMoreReact text= {p.descriptionPlace}
                      min={50}
                      ideal={100}
                      max={200}
                      readMoreText={(<div style={{color:"yellow"}}>Read more</div>)}/>
                      <div style={{marginTop:"1rem",marginBottom:"1rem"}}>
                      <ReactPlayer
                  url={p.audios[0]}
                  width="260px"
                  height="50px"
                  playing={false}
                  controls={true}
                /> 
                      </div>
                        
                          <Player>
      <source src={p.videos[0]} />
    </Player>
                        
                       </div>
                     </div>  
                 
             
                
                          
                 </div>
             </div>
             </Popup>
             </Marker>
    )

  })


    return (

      <div className="main-content">
<div className="container-fluid">

    <div className="row">
    <div className="col-md-12 spacedown">
    <h1 className="animbounceInLeft" data-time="600">Virtual Tour</h1>
    <h2 className="animbounceInLeft" data-time="900">Welcome To Zaghouan</h2>
   <div id="pcr"></div>
  <div>
    {
   setTimeout(()=>{
    setInterval(alert(JSON.stringify(this.props.coords)), 3000)

   },3000)
      
    }
  </div>
    <div className="devider-page animfadeInLeft" data-time="1100"></div>
    </div>
    </div>

    <div id="content" className="animfadeInUp" data-time="1300">

      <div className="row color-gray">
          <div className="dd">
           <div className="wrapper" id="style-8">
           
              {all}

           </div>
      <Map
        ref={
         this.saveMap
        }
        center={this.state.pos}
        zoom={this.state.zoom}
       >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.state.isMapInit && <Routing waypoint={way} map={this.mapInstance} />}
        {all1}

        <FullscreenControl position="topleft" />

      </Map>

      </div>
     </div>
</div>


 </div>
</div>
  );
  }
}

export default withStyles(useStyles)(
  geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(MapsSante)
  );