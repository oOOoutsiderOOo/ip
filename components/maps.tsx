import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = (props: { lat: number; lng: number }) => {
    return (
        <MapContainer
            className="map-container"
            center={[props.lat, props.lng]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "70vh", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[props.lat, props.lng]}>
                <Popup>Your IP comes from around here</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
