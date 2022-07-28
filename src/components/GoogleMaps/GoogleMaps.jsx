import { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: '60vw',
  height: '80vh'
}; // without width and height map won't be shown in the browser

const zoom = 15;

const options = {
  styles: [
    {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
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
    }
  ],
  disableDefaultUI: true,
  zoomControl: true
}; // customize the map

const markers = [
  {
    lat: 43.271240,
    lng: 26.936129
  },
  {
    lat: 43.273240,
    lng: 26.946129
  }]; // TODO: add implementation for getting the nearest facilities based on current user location

const API_KEY = "AIzaSyDVcr3hOO9abyCx6Mpw7cBuPWe9m_2iuV0"; // my api key


export default function GoogleMaps() {
  const [lat, setLat] = useState(42.698334); // sofia default
  const [lng, setLng] = useState(23.319941); // sofia default
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showMyselfInfo, setShowMyselfInfo] = useState(null);
  const geolocationAPI = navigator.geolocation;

  useEffect(() => {
    geolocationAPI.getCurrentPosition((position) => {
      const { coords } = position;
      setLat(coords.latitude);
      setLng(coords.longitude);
  })},[geolocationAPI]);

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: API_KEY
  });

  if (loadError) return "Error loading maps"; // here we can render an error component
  if (!isLoaded) return "Loading maps"; // here we can render a spinner

  return  <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            center={{lat, lng}}
            options={options}
          >

            <Marker position={{lat, lng}}
              onClick={() => setShowMyselfInfo({lat, lng})}
              title = {"You are here"}
            />

            {showMyselfInfo ?
            (<InfoWindow
              position={{lat, lng}}
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
