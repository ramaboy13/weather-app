"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
  timezone: string;
  population?: number;
  timestamp: number;
}

interface LocationContextType {
  location: LocationData | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => void;
  permissionState: PermissionState | null;
}

const CACHE_KEY = "weather-app-location";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

const DEFAULT_LOCATION: LocationData = {
  latitude: -6.2088,
  longitude: 106.8456,
  city: "Jakarta",
  region: "DKI Jakarta",
  country: "Indonesia",
  timezone: "Asia/Jakarta",
  population: 10562000,
  timestamp: Date.now(),
};

const LocationContext = createContext<LocationContextType>({
  location: null,
  loading: true,
  error: null,
  requestLocation: () => {},
  permissionState: null,
});

function getCachedLocation(): LocationData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const data = JSON.parse(cached) as LocationData;
    if (Date.now() - data.timestamp > CACHE_DURATION) return null;
    return data;
  } catch {
    return null;
  }
}

function cacheLocation(loc: LocationData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(loc));
  } catch {
    // Storage full or unavailable
  }
}

async function reverseGeocode(lat: number, lon: number): Promise<Partial<LocationData>> {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=&latitude=${lat}&longitude=${lon}&count=1`
    );
    // Open-Meteo geocoding doesn't support reverse geocoding directly
    // Use Nominatim instead
    const nomRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`
    );
    if (nomRes.ok) {
      const data = await nomRes.json();
      return {
        city: data.address?.city || data.address?.town || data.address?.village || data.address?.county || "Unknown",
        region: data.address?.state || data.address?.province || "",
        country: data.address?.country || "Unknown",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
    }
  } catch {
    // Fallback
  }
  return {
    city: "Unknown",
    region: "",
    country: "Unknown",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionState, setPermissionState] = useState<PermissionState | null>(null);

  const fetchLocation = useCallback(async () => {
    // Check cache first
    const cached = getCachedLocation();
    if (cached) {
      setLocation(cached);
      setLoading(false);
      return;
    }

    // Check if geolocation is available
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLocation(DEFAULT_LOCATION);
      cacheLocation(DEFAULT_LOCATION);
      setLoading(false);
      return;
    }

    try {
      // Check permission status
      if (navigator.permissions) {
        const status = await navigator.permissions.query({ name: "geolocation" });
        setPermissionState(status.state);

        if (status.state === "denied") {
          setError("Location permission denied. Using default location.");
          setLocation(DEFAULT_LOCATION);
          cacheLocation(DEFAULT_LOCATION);
          setLoading(false);
          return;
        }
      }

      // Request position
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        });
      });

      const { latitude, longitude } = position.coords;
      const geoData = await reverseGeocode(latitude, longitude);

      const locData: LocationData = {
        latitude,
        longitude,
        city: geoData.city || "Unknown",
        region: geoData.region || "",
        country: geoData.country || "Unknown",
        timezone: geoData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        timestamp: Date.now(),
      };

      setLocation(locData);
      cacheLocation(locData);
      setError(null);
    } catch (err: unknown) {
      let message = "Failed to get location";
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            message = "Location permission denied";
            break;
          case err.POSITION_UNAVAILABLE:
            message = "Location unavailable";
            break;
          case err.TIMEOUT:
            message = "Location request timed out";
            break;
        }
      }
      setError(message);
      setLocation(DEFAULT_LOCATION);
      cacheLocation(DEFAULT_LOCATION);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const requestLocation = useCallback(() => {
    localStorage.removeItem(CACHE_KEY);
    setLoading(true);
    setError(null);
    fetchLocation();
  }, [fetchLocation]);

  return (
    <LocationContext.Provider value={{ location, loading, error, requestLocation, permissionState }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
