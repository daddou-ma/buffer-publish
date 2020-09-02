/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/first */

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Autocomplete from 'react-autocomplete';

import ServiceLocation from '../entities/ServiceLocation';
import LocationComposerBar from '../components/LocationComposerBar';

jest.mock('../action-creators/ComposerActionCreators');
jest.mock('../utils/LocationFinder');
jest.mock('lodash.debounce', () => jest.fn(fn => fn));

import debounce from 'lodash.debounce';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import LocationFinder from '../utils/LocationFinder';

const showLocationBar = {
  selectedProfiles: [{ instagramDirectEnabled: true }],
  isInstagram: true,
  hasVideo: true,
  withMediaAttachment: false,
};

describe('Whole component', () => {
  it('renders correctly', () => {
    const sl = new ServiceLocation(
      '3123',
      'Los Angeles',
      'https://example.com/image.jpeg',
      123,
      'LA, USA'
    );

    const tree = renderer
      .create(
        <LocationComposerBar
          {...showLocationBar}
          draftId={'123'}
          locationName={'New York'}
          locationId={'123123'}
          instagramProfileId={'333'}
          places={[sl]}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with location name when set', () => {
    const tree = renderer
      .create(
        <LocationComposerBar
          {...showLocationBar}
          draftId={'123'}
          locationName={'New York'}
          instagramProfileId={'333'}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with cross to remove location when set', () => {
    const tree = renderer
      .create(
        <LocationComposerBar
          {...showLocationBar}
          draftId={'123'}
          locationName={'New York'}
          locationId={'123123'}
          instagramProfileId={'333'}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const setup = propOverrides => {
  const props = Object.assign(
    {
      draftId: '1231',
      locationName: '',
      locationId: null,
      instagramProfileId: null,
      places: [],
    },
    propOverrides
  );

  const wrapper = shallow(
    <LocationComposerBar {...props} {...showLocationBar} />
  );

  return {
    props,
    wrapper,
  };
};

describe('Cross remove button', () => {
  it('is shown when locationId is set', () => {
    const { wrapper } = setup({ locationId: '123123' });
    expect(wrapper.find('.locationFieldRemoveInput').length).toBe(1);
  });

  it('is hidden when locationId is not set', () => {
    const { wrapper } = setup({ locationId: null });
    expect(wrapper.find('.locationFieldRemoveInput').length).toBe(0);
  });

  it('resets input content when clicked on', () => {
    ComposerActionCreators.updateDraftLocation.mockReturnValue(true);
    const { wrapper } = setup({ locationId: '123', draftId: '1234' });

    wrapper
      .find('span.locationFieldRemoveInput')
      .simulate('click', { preventDefault() {} });

    expect(ComposerActionCreators.updateDraftLocation).toHaveBeenCalledWith(
      '1234',
      null,
      ''
    );
  });
});

describe('Autocomplete element', () => {
  it('is present in component', () => {
    const { wrapper } = setup();
    expect(wrapper.find(Autocomplete).length).toBe(1);
  });

  it('has correct properties', () => {
    const sl = new ServiceLocation(
      '3123',
      'Los Angeles',
      'https://example.com/image.jpeg',
      123,
      'LA, USA'
    );
    const { wrapper } = setup({
      locationName: 'Los Angeles Test',
      places: [sl],
    });
    const autocompleteProps = wrapper.find(Autocomplete).props();

    expect(autocompleteProps.items).toEqual([sl]);
    expect(autocompleteProps.value).toEqual('Los Angeles Test');
    expect(autocompleteProps.getItemValue(sl)).toEqual('Los Angeles');
  });
});

describe('Autocomplete actions', () => {
  beforeEach(() => {
    ComposerActionCreators.updateDraftLocation.mockReturnValue(true);
  });
  afterEach(() => jest.resetAllMocks());

  it('updates location list when changed', async () => {
    LocationFinder.findLocations.mockReturnValue(Promise.resolve(['t']));
    const { wrapper } = setup({ draftId: '1234', instagramProfileId: '676' });
    const autocompleteProps = wrapper.find(Autocomplete).props();
    await autocompleteProps.onChange(null, 'LA Test');

    expect(ComposerActionCreators.updateDraftLocation).toHaveBeenCalledWith(
      '1234',
      null,
      'LA Test'
    );

    expect(debounce).toHaveBeenCalled();
    expect(LocationFinder.findLocations).toHaveBeenCalledWith('676', 'LA Test');
    expect(ComposerActionCreators.updateDraftListPlaces).toHaveBeenCalledWith(
      '1234',
      ['t']
    );
  });

  it('updates draft location when changed', () => {
    const { wrapper } = setup({ draftId: '1234', instagramProfileId: '676' });
    const autocompleteProps = wrapper.find(Autocomplete).props();
    const place = new ServiceLocation(
      '3123',
      'Los Angeles',
      'https://example.com/image.jpeg',
      123,
      'LA, USA'
    );

    autocompleteProps.onSelect(null, place);

    expect(ComposerActionCreators.updateDraftLocation).toHaveBeenCalledWith(
      '1234',
      place.id,
      place.name
    );
  });

  it('resets input content when no location is selected', () => {
    const { wrapper } = setup({
      locationId: null,
      locationName: 'NYC',
      draftId: '1234',
    });
    const autocompleteProps = wrapper.find(Autocomplete).props();

    autocompleteProps.onMenuVisibilityChange(false);

    expect(ComposerActionCreators.updateDraftLocation).toHaveBeenCalledWith(
      '1234',
      null,
      ''
    );
  });
});
