import React from 'react';
import GoogleMapReact from 'google-map-react';
import './map.scss';

interface MapProps {
  location?: number[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Marker = (props: any) => <div className="marker">{props.text}</div>;

const Map: React.FC<MapProps> = props => {
  const { location } = props;
  const defaultProps = {
    center: {
      lat: location ? location[0] : 10.99835602,
      lng: location ? location[1] : 77.01502627,
    },
    zoom: 11,
  };

  return (
    <>
      <input className="map-search" type="search" placeholder="Search location" />
      <GoogleMapReact bootstrapURLKeys={{ key: '' }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
        <Marker lat={defaultProps.center.lat} lng={defaultProps.center.lng} text="" />
      </GoogleMapReact>
    </>
  );
};

export default Map;
