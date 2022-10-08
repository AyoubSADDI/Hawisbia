import React, { Component, useEffect } from "react";
import { Map, TileLayer, withLeaflet,Marker,Popup } from "react-leaflet";
import MapInfo from "./MapInfo";
import Routing from "./RoutingMachine";
import L from "leaflet";



class MapComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 36.397502,
      lng: 10.145531,
      zoom: 14,
      isMapInit: false,
      allpoints:[
        [36.3979902,10.1459361],
        [36.387511, 10.130815],
        [36.397502,10.145531]
              ]
              ,
        

    };

    this.handleClick = this.handleClick.bind(this);
  }
  static propTypes = {
    match: this.propTypes.object.isRequired,
    location: this.propTypes.object.isRequired,
    history: this.propTypes.object.isRequired
  }
  handleClick(e){
    this.setState({ currentPos: e.latlng });
    console.log("curent pos ",this.state.currentPos);
  }

  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true,
      allpoints:[
        [36.3979902,10.1459361],
        [36.387511, 10.130815],
        [36.397502,10.145531]
              ]
    });
  };

  render() {
    const { lat, lng, zoom } = this.state;
    const position = [lat, lng];
    const { match, location, history } = this.props;
  
    console.log("all points");
    console.log(location.pathname);
    console.log(this.state.allpoints);

    return (
      <Map center={position} zoom={zoom} ref={this.saveMap} onClick={this.handleClick} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.state.isMapInit && <Routing waypoints={this.state.allpoints} map={this.map} />  
        &&
        <Marker position={this.state.currentPos} draggable={true}>
            <Popup position={this.state.currentPos}>
              Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
            </Popup>
          </Marker>
        
        }
 
      </Map>
    );
  }
}

export default MapComponent;
