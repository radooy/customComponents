import { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";

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
      "featureType": "poi.medical",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi.medical",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "on"
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
  });
  const [markers, setMarkers] = useState([
    {
      lat: 43.271240,
      lng: 26.936129
    },
    {
      lat: 43.273240,
      lng: 26.946129
    }]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showMyselfInfo, setShowMyselfInfo] = useState(null);

  const geolocationAPI = navigator.geolocation;

  useEffect(() => {
    geolocationAPI.getCurrentPosition((position) => {
      const { coords } = position;
      setUserMarker({lat: coords.latitude, lng: coords.longitude})
      setZoom(15);
  })},[geolocationAPI]);

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: ['geometry', 'places']
  });

  const onMapClick = (e) => {
    let marker = {lat: e.latLng.lat(), lng: e.latLng.lng()};
    setUserMarker(marker);
    
    let res = markers.reduce(function (prev, curr) {
      console.log(window.google.maps)
      const cpos = window.google.maps.geometry.spherical.computeDistanceBetween(userMarker, curr.position);
      const ppos = window.google.maps.geometry.spherical.computeDistanceBetween(userMarker, prev.position);
  
      return cpos < ppos ? curr : prev;
  
    });

    console.log(res)
  };

  if (loadError) return "Error loading maps"; // here we can render an error component
  if (!isLoaded) return "Loading maps"; // here we can render a spinner 

  return  <GoogleMap
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
                        title = {"Click here for additional info"}
                      />
            })}

            {selectedMarker ?
            (<InfoWindow
              position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
              onCloseClick={() => setSelectedMarker(null)}
              >
              <div>{selectedMarker.lng}</div>
            </InfoWindow>) : null}

          </GoogleMap>
};


// IBAN validator

// t2, etap 3 hardcoded