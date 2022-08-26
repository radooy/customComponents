import { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import jsonData from "../../utils/data/facilities.json";

const mapContainerStyle = {
  width: '60vw',
  height: '80vh'
}; // without width and height map won't be shown in the browser

const options = {
  styles: [
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ],
  disableDefaultUI: true,
  zoomControl: true,
  libraries: ["places"]
}; // customize the map

const API_KEY = "AIzaSyDVcr3hOO9abyCx6Mpw7cBuPWe9m_2iuV0"; // my api key

export default function GoogleMaps() {
  const [zoom, setZoom] = useState(7.25);
  const [userMarker, setUserMarker] = useState({
    lat: 42.7249925,
    lng: 25.4833039
  }); // Bulgaria center by default
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showMyselfInfo, setShowMyselfInfo] = useState(null);
  const [markers, setMarkers] = useState([]);

  const geolocationAPI = navigator.geolocation;

  useEffect(() => {
    geolocationAPI.getCurrentPosition((position) => {
      const { coords } = position;
      setUserMarker({lat: coords.latitude, lng: coords.longitude})
      setZoom(15);
      setMarkers([...jsonData.emergencyPayback, ...jsonData.emergencySubscribed, ...jsonData.hospitalCare, ...jsonData.outpatientCare]);
  })},[]);

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: ['geometry', 'places']
  });

  const onMapClick = (e) => {
    const marker = {lat: e.latLng.lat(), lng: e.latLng.lng()};
    setUserMarker(marker);
  };

  if (loadError) return "Error loading maps"; // here we can render an error component
  if (!isLoaded) return "Loading maps"; // here we can render a spinner

  return  <div>
            <div>Filters</div>
            <ul style={{listStyleType: "none"}}>
              <li onClick={() => setMarkers([...jsonData.hospitalCare, ...jsonData.outpatientCare])} style={{cursor: "pointer"}}>Здравни заведения</li>
              <li onClick={() => setMarkers([...jsonData.emergencyPayback, ...jsonData.emergencySubscribed])} style={{cursor: "pointer"}}>Неотложна помощ</li>
              <li onClick={() => setMarkers(jsonData.emergencyPayback)} style={{cursor: "pointer"}}>Възстановяване на разходи</li>
              <li onClick={() => setMarkers(jsonData.emergencySubscribed)} style={{cursor: "pointer"}}>Абонаментно обслужване</li>
            </ul>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={zoom}
              center={userMarker}
              options={options}
              onClick={onMapClick}
            >
            
            {userMarker && <Marker position={userMarker}
              onClick={() => setShowMyselfInfo(userMarker)}
              title = {"You are here"}
            />}

            {showMyselfInfo ?
            (<InfoWindow
              position={userMarker}
              onCloseClick={() => setShowMyselfInfo(null)}
            >
              <div>You are here</div>
            </InfoWindow>) : null}

            {markers.map((m, i) => {
              return <Marker
                        key={i}
                        position={{lat: m.lat, lng: m.lng}}
                        onClick={() => setSelectedMarker(m)}
                        title = {m.address}
                      />
            })}

            {selectedMarker ?
            (<InfoWindow
              position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
              onCloseClick={() => setSelectedMarker(null)}
              maxWidth="100px"
              >
                <>
                  <h5>{selectedMarker.name}</h5>
                  <div>{selectedMarker.address}</div>
                </>
            </InfoWindow>) : null}

          </GoogleMap>
</div>
};
