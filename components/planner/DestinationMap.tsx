"use client";

import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "@/lib/constants";
import { geocodeDestinationClient } from "@/lib/geocode-client";
import { useTripStore } from "@/store/trip-store";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapViewport({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  const lastCenter = useRef(center);

  useEffect(() => {
    if (
      lastCenter.current[0] !== center[0] ||
      lastCenter.current[1] !== center[1]
    ) {
      map.setView(center, zoom, { animate: true });
      lastCenter.current = center;
    }
  }, [center, zoom, map]);

  useEffect(() => {
    const handleResize = () => map.invalidateSize();
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [map]);

  return null;
}

export function DestinationMap() {
  const geocode = useTripStore((state) => state.geocode);
  const trip = useTripStore((state) => state.trip);
  const mapStatus = useTripStore((state) => state.mapStatus);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastQuery = useRef("");

  useEffect(() => {
    const destination = trip.destination.trim();
    if (!destination) {
      return;
    }

    if (destination === lastQuery.current && geocode) {
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      useTripStore.getState().setMapStatus(`Locating ${destination}...`);
      try {
        const result = await geocodeDestinationClient(destination);
        if (!result) {
          useTripStore.getState().setGeocode(null);
          useTripStore.getState().setMapStatus(
            `No map match found for "${destination}". Try a city and country.`,
          );
          lastQuery.current = destination;
          return;
        }
        useTripStore.getState().setGeocode(result);
        useTripStore.getState().setMapStatus(`Showing ${destination} on the map.`);
        lastQuery.current = destination;
      } catch {
        useTripStore.getState().setMapStatus("Map lookup failed. Check your connection.");
      }
    }, 700);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [trip.destination, geocode]);

  const center: [number, number] = geocode
    ? [geocode.lat, geocode.lon]
    : DEFAULT_CENTER;
  const zoom = geocode ? 12 : DEFAULT_ZOOM;

  return (
    <div>
      <p className="mb-3 text-xs text-mist sm:text-sm">{mapStatus}</p>
      <div
        className="h-56 w-full overflow-hidden rounded-xl border border-line bg-panel2 sm:h-72 lg:h-80"
        role="region"
        aria-label="Destination map"
      >
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapViewport center={center} zoom={zoom} />
          {geocode ? (
            <Marker position={[geocode.lat, geocode.lon]} icon={markerIcon}>
              <Popup>
                <strong>{trip.destination}</strong>
                <br />
                {geocode.displayName}
              </Popup>
            </Marker>
          ) : null}
        </MapContainer>
      </div>
    </div>
  );
}
