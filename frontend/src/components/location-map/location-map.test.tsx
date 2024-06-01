import { render, screen } from '@testing-library/react';
import LocationMap from './location-map.component';
import { MarkerType } from './marker-icon';

vi.mock('../index', () => ({
  default: vi.fn(),
  useMap: vi.fn(),
  useMapView: vi.fn(),
  useMapMarker: vi.fn(),
}));

describe('Component: LocationMap', () => {
  it('should render correct', () => {
    const elementTestId = 'locationMap';

    render(
      <LocationMap
        location={{ longitude: 0, latitude: 0 }}
        markerType={MarkerType.User}
      />,
    );

    expect(screen.getByTestId(elementTestId)).toBeInTheDocument();
  });
});
