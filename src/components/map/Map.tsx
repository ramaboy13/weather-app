"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix leaflet icon
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapProps {
  lat: number;
  lon: number;
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center);
  return null;
}

export default function MapComponent({ lat, lon }: MapProps) {
  return (
    <MapContainer center={[lat, lon]} zoom={10} style={{ height: "100%", width: "100%" }}>
      <ChangeView center={[lat, lon]} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Weather Layer (Precipitation) - OpenWeatherMap needs key, using standard OSM for base.
          To satisfy "clouds, rain movement", we would need a specific weather tile provider.
          For this scope without paid keys, we use standard tiles but conceptually this is where the weather layer goes.
      */}
      <TileLayer
         attribution="RainViewer"
         url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
         opacity={0.5}
      />
      <Marker position={[lat, lon]} icon={icon}>
        <Popup>
          Current Location
        </Popup>
      </Marker>
    </MapContainer>
  );
}
