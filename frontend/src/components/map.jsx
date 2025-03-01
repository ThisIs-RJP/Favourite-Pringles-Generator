// Main Imports
import React, { useState, useEffect } from 'react';

// Leaflet Imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

// CSS Styling
import "../styles/map.css"

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = () => {
    const [startPoint, setStartPoint] = useState([51.505, -0.09]);
    const [endPoint, setEndPoint] = useState([51.51, -0.1]);
    const [startPlace, setStartPlace] = useState('');
    const [endPlace, setEndPlace] = useState('');

    const [routeInstructions, setRouteInstructions] = useState([]);

    const [directions, setDirections] = useState([]);

    const geocodeAddress = async (address) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        if (data.length > 0) {
            return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        }
        return null;
    };

    const handleRouteSubmit = async (e) => {
        e.preventDefault();
        const startCoords = await geocodeAddress(startPlace);
        const endCoords = await geocodeAddress(endPlace);
        
        if (startCoords && endCoords) {
            setStartPoint(startCoords);
            setEndPoint(endCoords);
        }
    };

    const createRoutingControl = (map) => {
        if (map) {
            const routing = L.Routing.control({
                waypoints: [
                    L.latLng(startPoint[0], startPoint[1]),
                    L.latLng(endPoint[0], endPoint[1])
                ],
                routeWhileDragging: true,
                lineOptions: {
                    styles: [{ color: '#6FA1EC', weight: 4 }]
                },
                show: false,
                addWaypoints: false,
                fitSelectedRoutes: false,
                showAlternatives: false,
                createMarker: function() { return null; }, // Prevents creating markers
                router: new L.Routing.OSRMv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1'
                })
            });
    
            routing.on('routesfound', (e) => {
                const routes = e.routes;
                const instructions = routes[0].instructions.map(instruction => 
                    instruction.text
                );
                setRouteInstructions(instructions);
            });
    
            routing.addTo(map);
        }
    };
    

    return (
        <div className="map-container">
            <div className="map-side-box">
                <form onSubmit={handleRouteSubmit}>
                    <input
                        type="text"
                        placeholder="Enter start location"
                        value={startPlace}
                        onChange={(e) => setStartPlace(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter destination"
                        value={endPlace}
                        onChange={(e) => setEndPlace(e.target.value)}
                    />
                    <button type="submit">Find Route</button>
                </form>
                <div className="directions-container">
                    <h3>Directions:</h3>
                    <ul>
                        {routeInstructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <MapContainer 
                center={startPoint} 
                zoom={13} 
                style={{ height: "100vh", width: "70vw", fontSize: "0.1px" }}
                ref={createRoutingControl}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={startPoint}>
                    <Popup>Start Point: {startPlace}</Popup>
                </Marker>
                <Marker position={endPoint}>
                    <Popup>End Point: {endPlace}</Popup>
                </Marker>
            </MapContainer>

        </div>
    );
};

export default Map;
