import React, { Component } from 'react';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '62%'
};
function generateUrl(point)
{
    //console.log(JSON.parse(localStorage.getItem('oUser')))
    var latDes = point[0];
    var longDes = point[1];
    var tLat=JSON.parse(localStorage.getItem('oUser')).location.coordinates[0];
    var tLong=JSON.parse(localStorage.getItem('oUser')).location.coordinates[1];
    var url = "https://www.google.com/maps/dir/?api=1";
    var origin = "&origin=" + tLat + "," + tLong;
    var destination = "&destination=" + latDes + "," + longDes;
    var newUrl =(url + origin + destination);
    //console.log(newUrl)
    return newUrl
}
export class MapContainer extends Component {
  constructor(props)
  {
      super(props);
      this.state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
      };
      this.onMarkerClick=this.onMarkerClick.bind(this);
      this.onClose=this.onClose.bind(this);
      this.mapClicked=this.mapClicked.bind(this);
  }
  mapClicked(mapProps, map, clickEvent) {
    //console.log(generateUrl(this.props.point))
    window.location.href=(generateUrl(this.props.point));
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    //console.log(this.props.point)
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        onClick={this.mapClicked} 
        initialCenter={
          {
            lat: this.props.point[0],
            lng: this.props.point[1]
          }
        }
        
      >
        <Marker
            onClick={this.onMarkerClick}
            name={'Donation Destination'}
        />
        <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
        >
            <div>
            <h5>{this.state.selectedPlace.name}</h5>
            </div>
        </InfoWindow>
     </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyDZpf1EF-4mDZofDG5IQJ_jd-Mt6IKgzj8"
})(MapContainer)