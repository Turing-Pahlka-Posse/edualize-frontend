import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Map,
  TileLayer,
  GeoJSON,
  Popup,
  ZoomControl } from 'react-leaflet';

const position = [37.8, -96];
const mapBoxURL = 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoibm5jaGFtYmVycyIsImEiOiJjaXhucTJ0Y3YwMjdxMnFtc3Qwbjk1aGV1In0.h1y9Ng5WOQ9jnvfglaozww'

class MapComponent extends Component {
  constructor(props) {
    super(props)
  }

  getColor() {
    let d = this.props.EdualizeNumbers
    console.log(d)
    return d > 1000 ? '#800026' :
            d > 500  ? '#BD0026' :
            d > 200  ? '#E31A1C' :
            d > 100  ? '#FC4E2A' :
            d > 50   ? '#FD8D3C' :
            d > 20   ? '#FEB24C' :
            d > 10   ? '#FED976' :
                        '#FFEDA0';
    }

  render() {
    let a
    console.log(this.props);
    // if (this.props.statesData.features.properties.density) {
    //   a = this.props.statesData.features.properties.density
    // }
    return (
      <div className="Map">
        {this.props.edualizeNumbers ? <Map className='map-component' zoomControl={true}
         center={position}
         zoom={4.7} >
              <TileLayer
                url={mapBoxURL}
              />
              <GeoJSON
                data={this.props.statesData}
                opacity= {.8}
                fillColor={this.getColor(a)}
                fillOpacity={.4}
              >
              </GeoJSON>
        </Map> : <div>Loading...</div>  }
      </div>
    );
  }
}

export default MapComponent;
