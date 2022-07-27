import { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: '80vw',
  height: '80vh'
}; // without width and height map won't be shown in the browser

const zoom = 12;

const options = {
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

  return <div>
          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={zoom} center={{lat, lng}} options={options}>
            {markers.map(m => {
              return <Marker
                        key={m.lng}
                        position={{lat: m.lat, lng: m.lng}}
                        onClick={() => setSelectedMarker(m)}
                      />
            })}
            {selectedMarker ?
            (<InfoWindow position={{lat: selectedMarker.lat, lng: selectedMarker.lng}} onCloseClick={() => setSelectedMarker(null)}>
              <div>Facility address and additional info</div>
            </InfoWindow>) : null}
          </GoogleMap>
         </div>
};
