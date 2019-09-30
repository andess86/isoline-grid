import React from 'react';
import { Map, TileLayer, Marker, Polygon } from 'react-leaflet';
import { hereTileUrl } from './here';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.marker = React.createRef();
  }

  handleDrag = () => {
    const coordinates = this.marker.current.leafletElement.getLatLng();
    this.props.handleDrag(this.props.index, [coordinates.lat, coordinates.lng]);
  };

  render() {
    const {
      center,
      index,
      polygon,
      style,
      options: { zoom },
      polygon: { length },
    } = this.props;
    return (
      <Map
        center={center}
        zoom={parseInt(zoom)}
        zoomControl={false}
        attributionControl={index === 8}
      >
        <TileLayer url={hereTileUrl(style)} />
        <Marker
          position={center}
          draggable={true}
          onDragEnd={this.handleDrag}
          ref={this.marker}
        />
        {length > 0 && <Polygon positions={polygon} color='#2DD5C9' />}
      </Map>
    );
  }
}
