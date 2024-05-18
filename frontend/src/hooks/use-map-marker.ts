import { DivIcon, Map, Marker, layerGroup } from 'leaflet';
import { useEffect } from 'react';
import { Location } from '../types';

function useMapMarker(map: Map | null, point: Location, icon: DivIcon): void {
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup();

      const marker = new Marker([
        point.latitude,
        point.longitude], {icon});

      marker.addTo(markerLayer);

      markerLayer.addTo(map);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, point, icon]);
}

export default useMapMarker;
