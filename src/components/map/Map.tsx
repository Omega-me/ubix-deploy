import React from 'react';
import GoogleMapReact from 'google-map-react';
import './map.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MapProps {
  location?: number[];
}

const Map: React.FC<MapProps> = (props) => {
  const { location } = props;
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <>
      <input className="map-search" type="search" placeholder="Search location" />
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        center={location && { lat: location[0], lng: location[1] }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      ></GoogleMapReact>
    </>
  );
};

export default Map;
