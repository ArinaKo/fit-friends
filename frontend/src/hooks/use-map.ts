import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Location } from '../types';
import { MAP_ZOOM } from '../const';

function useMap(
  containerRef: MutableRefObject<HTMLElement | null>,
  location: Location,
): null | Map {
  const [map, setMap] = useState<null | Map>(null);
  const isRendered = useRef<boolean>(false);

  useEffect(() => {
    if (containerRef.current !== null && !isRendered.current) {
      const instance = new Map(containerRef.current).setView(
        [location.latitude, location.longitude],
        MAP_ZOOM
      );

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );
      instance.addLayer(layer);

      setMap(instance);
      isRendered.current = true;
    }
  }, [containerRef, location]);

  return map;
}

export default useMap;
