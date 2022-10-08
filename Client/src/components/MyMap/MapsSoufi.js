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

class MapsSoufi extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 36.397502,
      lng: 10.145531,
      zoom: 7,
      isMapInit: false,
      map:null,
      markersData: [36.3979902,10.1459361],
      loading:true,
      places:[],
      markers:[[36.397502,10.145531],
      [36.4, 10.15],
      [36.38,10.11]
    ]
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
  


  saveMap = (map) => {
    this.map = this.mapInstance = map;
    this.setState({
      isMapInit: true
    });
  };

  componentDidMount() {
    this.map = this.mapInstance.leafletElement
    axios.get(`${process.env.REACT_APP_URL}placee/circuit/soufi` , {
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

  render() {
    const { lat, lng, zoom } = this.state;
    const position = [this.state.lat, this.state.lng];
    const marker =this.state.markersData;


    const way= [[36.397502,10.145531],
    [36.4, 10.15],
    [36.38,10.11]
  ]
    console.log(this.state.places);

    const url = `https://cdn.simplecast.com/audio/17ba21/17ba21db-66b5-4612-855e-556b20f60155/6cd39874-c070-417b-8cd0-481cb8c6e866/Undefined_E9_Nader_tc.mp3`;
    const audiourl = `https://cdn.simplecast.com/audio/17ba21/17ba21db-66b5-4612-855e-556b20f60155/6cd39874-c070-417b-8cd0-481cb8c6e866/Undefined_E9_Nader_tc.mp3`;
  const all=this.state.places.map((p) =>{
    const m=[p.lanPlace,p.longPlace]
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
        center={position}
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
export default withStyles(useStyles)(MapsSoufi);