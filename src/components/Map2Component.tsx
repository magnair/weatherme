import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: 'calc(100vh - 64px)',
};

const center = {
  lat: 59.9139,
  lng: 10.7522
};

const Map2Component: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey='AIzaSyA4RdNHzKv_NXhtclsTx54rj-G63fIubSM'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
      />
    </LoadScript>
  );
};

export default Map2Component;
