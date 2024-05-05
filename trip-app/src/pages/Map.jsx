// Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ location }) => {
  const position = [location.lat, location.lng]; // Location should be an object with lat and lng properties

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{location.name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
