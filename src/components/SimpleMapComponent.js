import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const RenderMarkers = (props) => {
    if(props.locations.length === 0){
        return (
            <></>
        );
    }
    else{
        var markers = props.locations.map(location => {
            return (
                <Marker key={location.username} title={location.username} position={{lat: location.lat, lng: location.lng}} />
            );
        });
        return markers;
    }
}

class SimpleMap extends Component{

    constructor(props){
        super(props);
    }

    render(){
        //console.log(this.props);
        var cent = {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            };
        return (
            <Map google={this.props.google}
                containerStyle={{height: '80vh', width: '100%', position: 'relative'}}
                style={{width: '100%', height: '100%', position: 'relative'}}
                center={cent}
                className={'map'}
                zoom={5}>
                <RenderMarkers locations={this.props.markerLocations || []} />
                <RenderMarkers locations={[this.props.center]} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(SimpleMap);