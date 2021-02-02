import React from 'react';
import Autocomplete from 'react-autocomplete';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import CrossIcon from '@bufferapp/ui/Icon/Icons/Cross';
import LocationFinder from './utils/LocationFinder';
import styles from './LocationComposerBar.css';
import {
  Container,
  Wrapper,
  Label,
  AutocompleteContainer,
  Menu,
  Row,
  Name,
  Button,
} from './styles';

import ComposerActionCreators from '../../action-creators/ComposerActionCreators';

const LocationComposerBar = ({
  locationName = '',
  locationId,
  instagramProfileId,
  places = [],
  draftId,
  selectedProfiles,
  isInstagram,
}) => {
  const resetInput = () => {
    ComposerActionCreators.updateDraftLocation(draftId, null, '');
  };

  const onMenuVisibilityChange = isOpen => {
    if (!isOpen && locationId === null && locationName !== '') {
      resetInput();
    }
  };

  const getLocations = debounce(query => {
    LocationFinder.findLocations(instagramProfileId, query)
      .then(results => {
        ComposerActionCreators.updateDraftListPlaces(draftId, results);
      })
      .catch(() => {
        ComposerActionCreators.updateDraftListPlaces(draftId, []);
      });
  }, 450);

  const onChange = (event, value) => {
    ComposerActionCreators.updateDraftLocation(draftId, null, value);
    if (value !== '') {
      getLocations(value);
    }
  };

  const shouldShowLocationBar = () => {
    return (
      isInstagram &&
      selectedProfiles.some(profile => profile.instagramDirectEnabled)
    );
  };

  const saveLocation = newPlace => {
    ComposerActionCreators.updateDraftLocation(
      draftId,
      newPlace.id,
      newPlace.name
    );
  };

  const onRemoveLocation = e => {
    e.preventDefault();
    resetInput();
    ComposerActionCreators.updateDraftListPlaces(draftId, []);
  };

  const isLocationSet = () => locationId !== null;
  return (
    shouldShowLocationBar() && (
      <Container>
        <Wrapper>
          <Label>Location</Label>
          <AutocompleteContainer>
            <Autocomplete
              wrapperStyle={{ width: '100%' }}
              value={locationName}
              items={places}
              inputProps={{
                className: styles.locationFieldInput,
                placeholder: 'Start typing a location...',
              }}
              getItemValue={item => item.name}
              onSelect={(value, place) => {
                saveLocation(place);
              }}
              onChange={onChange}
              onMenuVisibilityChange={onMenuVisibilityChange}
              renderMenu={children => <Menu>{children}</Menu>}
              renderItem={(item, highlighted) => (
                <Row highlighted={highlighted} key={item.id}>
                  <Name>{item.name}</Name>
                  <p>{item.formattedAddress}</p>
                </Row>
              )}
            />
            {isLocationSet() && (
              <Button onClick={onRemoveLocation} aria-label="Remove location">
                <CrossIcon />
              </Button>
            )}
          </AutocompleteContainer>
        </Wrapper>
      </Container>
    )
  );
};

LocationComposerBar.propTypes = {
  draftId: PropTypes.string.isRequired,
  locationName: PropTypes.string,
  locationId: PropTypes.string,
  places: PropTypes.arrayOf(PropTypes.shape({})),
  instagramProfileId: PropTypes.string,
  selectedProfiles: PropTypes.arrayOf(
    PropTypes.shape({
      instagramDirectEnabled: PropTypes.bool,
    })
  ).isRequired,
  isInstagram: PropTypes.bool.isRequired,
};

export default LocationComposerBar;
