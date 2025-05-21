// src/app/master/components/Transport/MapComponent.tsx
"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapComponent = ({ buses, onBusSelect }) => {
  return (
    <MapContainer 
      center={[13.0827, 80.2707]} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {buses.map(bus => (
        <Marker 
          key={bus.id} 
          position={bus.position}
          icon={icon}
          eventHandlers={{
            click: () => onBusSelect(bus),
          }}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{bus.name}</h3>
              <p>Driver: {bus.driver}</p>
              <p>Students: {bus.studentsOnboard}</p>
              <p>ETA: {bus.eta}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;