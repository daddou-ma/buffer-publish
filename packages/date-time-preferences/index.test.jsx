import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import DateTimePreferencesContainer from './index';
import DateTimePreferences from './components/DateTimePreferences';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('DateTimePreferencesContainer', () => {
  it('should render', () => {
    const store = storeFake({});
    const wrapper = mount(
      <Provider store={store}>
        <DateTimePreferences />
      </Provider>
    );
    expect(wrapper.find(DateTimePreferences).length).toBe(1);
  });
});
