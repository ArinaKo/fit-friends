import { render, screen } from '@testing-library/react';
import { makeFakeUser, withHistory } from '../../utils';
import UserCardInner from './user-card-inner.component';
import { UserCardType } from './user-card';

vi.mock('../index', () => ({
  default: vi.fn(),
  CertificateCard: () => (
    <div data-testid="certificateCard">CertificateCard component</div>
  ),
}));

describe('Component: UserCardInner', () => {
  it('should render correct', () => {
    const expectedAltText = 'Аватар пользователя';
    const mockUser = makeFakeUser();
    const { name, location } = mockUser;
    const workoutType = `#${mockUser.workoutTypes[0]}`;
    const preparedComponent = withHistory(
      <UserCardInner user={mockUser} type={UserCardType.Default} />,
    );

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(location)).toBeInTheDocument();
    expect(screen.getByText(workoutType)).toBeInTheDocument();
  });
});
