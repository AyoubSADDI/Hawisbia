import React, { Component } from "react";


export default class Geocalisation extends Component {
    constructor(props) {
        super();
        this.state = {
          location:{
            loaded: false,
            coordinates: { lat: "", lng: "" },
          }
    
        };
       
        
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
    componentDidMount(){
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
    render() {
        return this.location;
    }
}


