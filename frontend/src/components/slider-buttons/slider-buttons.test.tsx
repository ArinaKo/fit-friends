import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SliderButtons from './slider-buttons.component';
import React from 'react';
import Slider from 'react-slick';

describe('Component: SliderButtons', () => {
  const previousButtonTestId = 'previousButton';
  const nextButtonTestId = 'nextButton';

  it('should render correct', () => {
    const mockRef = React.createRef<Slider>();

    render(
      <SliderButtons
        sliderRef={mockRef}
        slidesAmount={2}
        slidesToShow={1}
        styleClass=""
      />,
    );

    expect(screen.getByTestId(previousButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(previousButtonTestId)).toBeDisabled();
    expect(screen.getByTestId(nextButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(nextButtonTestId)).not.toBeDisabled();
  });

  it('should change buttons disability when user click next button', async () => {
    const mockRef = React.createRef<Slider>();

    render(
      <SliderButtons
        sliderRef={mockRef}
        slidesAmount={2}
        slidesToShow={1}
        styleClass=""
      />,
    );
    await userEvent.click(screen.getByTestId(nextButtonTestId));

    expect(screen.getByTestId(previousButtonTestId)).not.toBeDisabled();
    expect(screen.getByTestId(nextButtonTestId)).toBeDisabled();
  });
});
