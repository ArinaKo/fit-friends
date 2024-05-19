import { Map } from 'leaflet';
import { useEffect } from 'react';
import { Location } from '../types';
import { MAP_ZOOM } from '../const';

function useMapView(map: Map | null, location: Location): void {
  useEffect(() => {
    if (
      map !== null &&
      !map.getCenter().equals([location.latitude, location.longitude])
    ) {
      map.setView([location.latitude, location.longitude], MAP_ZOOM);
    }
  }, [location, map]);
}

export default useMapView;
