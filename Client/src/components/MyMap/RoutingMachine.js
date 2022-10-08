import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";
import 'leaflet-realtime';
import { withLeaflet } from "react-leaflet";



class Routing extends MapLayer {
  createLeafletElement() {
    const { map,waypoint } = this.props;
   
    let leafletElement = L.Routing.control({
      waypoints:waypoint,
      // router: new L.Routing.Google(),
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4
          }
        ]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false,
      createMarker: () => { return null; }
      

    }).addTo(map.leafletElement);  
 

    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
