import * as React from 'react';
import {ReactNode, useState} from 'react';
import {useControl, Marker, MarkerProps, ControlPosition} from 'react-map-gl';
import MapboxGeocoder, {GeocoderOptions} from '@mapbox/mapbox-gl-geocoder';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

type GeocoderControlProps = Omit<GeocoderOptions, 'accessToken' | 'mapboxgl' | 'marker'> & {
  mapboxAccessToken: string;
  marker?: boolean | Omit<MarkerProps, 'longitude' | 'latitude'>;
  position: ControlPosition;
  onLoading?: (e: object) => void;
  onResults?: (e: object) => void;
  onResult?: (e: object) => void;
  onError?: (e: object) => void;
};

export default function GeocoderControl(props: GeocoderControlProps) {
  const {onLoading, onResult, onError, onResults} = props;
  const [marker, setMarker] = useState<ReactNode | null>(null);

  useControl<MapboxGeocoder>(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: props.mapboxAccessToken
      });

      onLoading && ctrl.on('loading', onLoading);
      onResults && ctrl.on('results', onResults);
      ctrl.on('result', evt => {
        onResult && onResult(evt);

        const {result} = evt;
        const location =
          result &&
          (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));
        if (location && props.marker && typeof props.marker === 'object') {
          setMarker(<Marker {...props.marker} longitude={location[0]} latitude={location[1]} />);
        } else {
          setMarker(null);
        }
      });
      onError && ctrl.on('error', onError);
      return ctrl;
    },
    {
      position: props.position
    }
  );
  return marker;
}

const noop = () => {};

GeocoderControl.defaultProps = {
  marker: true,
  onLoading: noop,
  onResults: noop,
  onResult: noop,
  onError: noop
};