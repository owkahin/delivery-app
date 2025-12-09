'use client';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

const LocationMarker = ({ position, setPosition, interactive }: { position: L.LatLngExpression, setPosition: (pos: L.LatLngExpression) => void, interactive?: boolean }) => {
    const map = useMapEvents({
        click(e) {
            if (interactive) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                map.flyTo(e.latlng, map.getZoom());
            }
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>Selected Location</Popup>
        </Marker>
    );
};

interface MapProps {
    interactive?: boolean;
    onLocationSelect?: (lat: number, lng: number) => void;
}

const Map = ({ interactive = false, onLocationSelect }: MapProps) => {
    // Jigjiga coordinates
    const [position, setPosition] = useState<L.LatLngExpression>([9.35, 42.8]);

    // Fix for Leaflet icons
    useEffect(() => {
        // @ts-ignore
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);

    const handleSetPosition = (pos: L.LatLngExpression) => {
        setPosition(pos);
        if (onLocationSelect && Array.isArray(pos)) {
            onLocationSelect(pos[0], pos[1]);
        }
    };

    return (
        <MapContainer center={position} zoom={14} scrollWheelZoom={true} style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={handleSetPosition} interactive={interactive} />
        </MapContainer>
    );
};

export default Map;
