import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SliderDots from './slider-dots.component';
import React from 'react';
import Slider from 'react-slick';

vi.mock('react-slick', () => ({
  default: ({ children }: { children: JSX.Element }) => (
    <div data-testid="slider">{children}</div>
  ),
}));

describe('Component: SliderDots', () => {
  const activeClass = 'dots__slider-dot--active';

  it('should render correct', () => {
    const mockRef = React.createRef<Slider>();

    render(
      <SliderDots sliderRef={mockRef} slidesAmount={2} styleClass="dots" />,
    );

    const buttonsElements = screen.getAllByRole('button');

    expect(buttonsElements).toHaveLength(2);
    expect(buttonsElements.at(0)).toHaveClass(activeClass);
    expect(buttonsElements.at(1)).not.toHaveClass(activeClass);
  });

  it('should change buttons class when user click next button', async () => {
    const mockRef = React.createRef<Slider>();

    render(
      <SliderDots sliderRef={mockRef} slidesAmount={2} styleClass="dots" />,
    );

    const buttonsElements = screen.getAllByRole('button');
    await userEvent.click(buttonsElements[1]);

    expect(buttonsElements.at(1)).toHaveClass(activeClass);
    expect(buttonsElements.at(0)).not.toHaveClass(activeClass);
  });
});
