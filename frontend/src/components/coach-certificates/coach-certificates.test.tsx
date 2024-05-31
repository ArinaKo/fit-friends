import { render, screen } from '@testing-library/react';
import {
  makeFakeFileData,
  makeFakeUserInfoSlice,
  withStore,
} from '../../utils';
import CoachCertificates from './coach-certificates.component';
import { UserInfo } from '../../types';

vi.mock('../index', () => ({
  default: vi.fn(),
  SliderButtons: () => (
    <div data-testid="sliderButtons">SliderButtons component</div>
  ),
  Certificate: () => <div data-testid="certificate">Certificate component</div>,
}));

vi.mock('react-slick', () => ({
  default: ({ children }: { children: JSX.Element }) => (
    <div data-testid="slider">{children}</div>
  ),
}));

describe('Component: CoachCertificates', () => {
  it('should render correct', () => {
    const containerTestId = 'coachCertificates';
    const innerComponentTestId1 = 'sliderButtons';
    const innerComponentTestId2 = 'certificate';
    const mockSlice: UserInfo = {
      ...makeFakeUserInfoSlice(),
      certificates: [makeFakeFileData()],
    };
    const { withStoreComponent } = withStore(<CoachCertificates />, {
      USER_INFO: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByTestId(containerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(innerComponentTestId1)).toBeInTheDocument();
    expect(screen.getAllByTestId(innerComponentTestId2)).toHaveLength(1);
  });
});
