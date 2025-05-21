// src/app/master/components/Transport/ParentMapComponent.tsx
"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
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

const ParentMapComponent = ({ busPosition, busInfo }) => {
  // Mock route path
  const routePath = [
    [13.0827, 80.2707],
    [13.0840, 80.2730],
    [13.0860, 80.2760],
    [13.0880, 80.2790],
    [13.0900, 80.2820],
  ];
  
  return (
    <MapContainer 
      center={busPosition} 
      zoom={14} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={busPosition} icon={icon}>
        <Popup>
          <div>
            <h3 className="font-bold">Bus 1</h3>
            <p>Current Speed: {busInfo.speed}</p>
            <p>ETA: {busInfo.eta}</p>
            <p>Distance: {busInfo.distanceToHome}</p>
          </div>
        </Popup>
      </Marker>
      <Polyline 
        positions={routePath}
        color="blue"
        opacity={0.7}
      />
    </MapContainer>
  );
};

export default ParentMapComponent;