import { Map, divIcon } from 'leaflet';
import React, { useRef } from 'react';
import { renderHook } from '@testing-library/react';
import useMap from './use-map';
import { Location } from '../types';

describe('Hook useMap', () => {
  const location: Location = { latitude: 0, longitude: 0 };

  test('should return leaflet Map class', () => {
    const mapRef = renderHook(() =>
      useRef<HTMLDivElement | null>(document.createElement('div')),
    ).result.current;

    const { result } = renderHook(() => useMap(mapRef, location, divIcon({})));

    expect(result.current).toBeInstanceOf(Map);
  });

  test('should return null if ref null', () => {
    const mapRef = React.createRef<null>();

    const { result } = renderHook(() => useMap(mapRef, location, divIcon({})));

    expect(result.current).toBeNull();
  });
});
