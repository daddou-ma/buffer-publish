import React from 'react';
import { shallow } from 'enzyme';
import DiscountinuousProgressBar, {
  ProgressBarFilled,
  ProgressBar,
} from './index';

describe('Discontinuous Progress Bar', () => {
  it('should render 5 bars, 2 of which filled', () => {
    const wrapper = shallow(
      <DiscountinuousProgressBar numberOfBarsFilled={2} totalNumberOfBars={5} />
    );
    expect(wrapper.find(ProgressBarFilled).length).toBe(2);
    expect(wrapper.find(ProgressBar).length).toBe(3);
  });
});
