"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Map, { NavigationControl, Marker, GeolocateControl } from 'react-map-gl';

import CHURCHES from '../lib/churches.json';

import 'mapbox-gl/dist/mapbox-gl.css';
import '../style/overrides.css'
import Pin from './pin';
import MarkerPopup from './marker-popup';
import GeocoderControl from './geocoder-control';


const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN; 
const CENTRAL_USA_LATITUDE = 40
const CENTRAL_USA_LONGITUDE = -98

export interface Church {
  name: string,
  website: string,
  address_line1: string,
  address_line2: string | null,
  city: string,
  state: string,
  zip: string,
  phone: string,
  longitude: number,
  latitude: number
}

const Mapbox: React.FC = () => {
  const [viewState, setViewState] = useState({
    longitude: CENTRAL_USA_LONGITUDE,
    latitude: CENTRAL_USA_LATITUDE,
    zoom: 10
  });
  const [popupInfo, setPopupInfo] = useState<Church | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setViewState(old => ({...old, longitude: position.coords.longitude, lat: position.coords.latitude}))
    });
  }, []);

  const pins = useMemo(
    () =>
      CHURCHES.map((church, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={church.longitude}
          latitude={church.latitude}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo(church);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <GeolocateControl />
        <NavigationControl />

        {pins}

        {popupInfo && <MarkerPopup onClose={() => setPopupInfo(null)} {...popupInfo} />}
        {MAPBOX_TOKEN && <GeocoderControl mapboxAccessToken={MAPBOX_TOKEN} position="top-left" />}
      </Map>
    </>
  );
};

export default Mapbox;