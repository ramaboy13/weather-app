"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix leaflet icon (only on client)
const getIcon = () => {
  if (typeof window === "undefined") return undefined;
  return L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

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
  const [radarPath, setRadarPath] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRadar() {
      try {
        const res = await fetch("https://api.rainviewer.com/public/weather-maps.json");
        const data = await res.json();
        const latest = data.radar.past[data.radar.past.length - 1];
        if (latest) {
          setRadarPath(`${data.host}${latest.path}/256/{z}/{x}/{y}/2/1_1.png`);
        }
      } catch (err) {
        console.error("Failed to fetch RainViewer radar", err);
      }
    }
    fetchRadar();
  }, []);

  return (
    <MapContainer center={[lat, lon]} zoom={10} style={{ height: "100%", width: "100%" }}>
      <ChangeView center={[lat, lon]} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {radarPath && (
        <TileLayer
           attribution="RainViewer"
           url={radarPath}
           opacity={0.6}
           zIndex={10}
           maxNativeZoom={7}
        />
      )}
      {typeof window !== "undefined" && getIcon() && (
        <Marker position={[lat, lon]} icon={getIcon()!}>
          <Popup>
            Current Location
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
