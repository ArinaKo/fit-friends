import { useRef } from 'react';
import { useMap, useMapMarker, useMapView } from '../../hooks';
import { MarkerIcon, MarkerType } from './marker-icon';
import { Location } from '../../types';
import 'leaflet/dist/leaflet.css';

type LocationMapProps = {
  location: Location;
  markerType: MarkerType;
};

function LocationMap({ location, markerType }: LocationMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);
  useMapView(map, location);
  useMapMarker(map, location, MarkerIcon[markerType]);
  return (
    <div className="popup__content-map">
      <div ref={mapRef} className="popup__map" data-testid="locationMap" />
    </div>
  );
}

export default LocationMap;
