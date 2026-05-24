import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default marker icon issue (VERY IMPORTANT in React)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = () => {
  const position = [23.2599, 77.4126]; // Example: Bhopal (change later)

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "500px", width: "100%", borderRadius: "12px" }}
    >
      {/* OpenStreetMap Tiles */}
      <TileLayer
        attribution='© OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marker */}
      <Marker position={position}>
        <Popup>
          Your selected location 📍
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;