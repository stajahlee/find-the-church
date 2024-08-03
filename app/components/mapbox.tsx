"use client";
import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { NavigationControl } from 'react-map-gl';

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN; 
const CENTRAL_USA_LATITUDE = 40
const CENTRAL_USA_LONGITUDE = -98

const Mapbox: React.FC = () => {  
  const [viewState, setViewState] = useState({
    longitude: CENTRAL_USA_LONGITUDE,
    latitude: CENTRAL_USA_LATITUDE,
    zoom: 10
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setViewState(old => ({...old, longitude: position.coords.longitude, lat: position.coords.latitude}))
    });
  }, []);

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <NavigationControl />
    </Map>
  );
};

export default Mapbox;