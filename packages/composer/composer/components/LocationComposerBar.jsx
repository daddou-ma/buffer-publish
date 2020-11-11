import React, { useState } from 'react';
import styled from 'styled-components';
import { blue } from '@bufferapp/ui/style/colors';
import Link from '@bufferapp/ui/Link';
import PropTypes from 'prop-types';

import ComposerActionCreators from '../action-creators/ComposerActionCreators';

function Check() {
  return (
    <svg
      style={{ width: '10px', height: '10px' }}
      xmlns="http://www.w3.org/2000/svg"
      ariaHidden="true"
      className="svg-icon"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
      />
    </svg>
  );
}

const Container = styled.div`
  display: inline-flex;
  margin: 5px 0 10px;
  width: 100%;
`;

const LabelWrapper = styled.div`
  font-weight: 600;
  font-size: 12px;
  color: #343e47;
  width: 147px;
  padding: 6px 15px 0 10px;
  box-sizing: border-box;
`;
const InputWrapper = styled.div`
  resize: none;
  padding: 6px 15px 0 10px;
  width: 100%;
  font-size: 12px;
  font-weight: 500;
  box-sizing: border-box;
  input {
    vertical-align: top;
  }
`;

const Checkbox = styled.button`
  width: 15px;
  height: 15px;
  border: ${props =>
    props.checked ? `1px solid ${blue}` : '1px solid #b8b8b8'};
  background: ${props => (props.checked ? blue : '#fff')};
  border-radius: 4px;
  margin-right: 5px;
  padding: 0 1px;
  box-sizing: border-box;
  color: #fff;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #2c4bff44;
  }
`;

const CheckboxLabel = styled.button`
  font-family: inherit;
  font-size: inherit;
  border: 0;
  margin: 0;
  padding: 0;
  outline: none;
  background: none;
`;

const LearnMoreLink = styled(Link)`
  font-size: 12px;
  margin-left: 10px;
`;
function LocationComposerBar({
  draftId,
  isTaggingPageLocation,
  selectedProfiles,
  isInstagram,
}) {
  const shouldShow =
    isInstagram &&
    selectedProfiles.some(profile => profile.instagramDirectEnabled);
  const [checked, setChecked] = useState(!!isTaggingPageLocation);

  const handleClick = () => {
    setChecked(!checked);
    ComposerActionCreators.updateDraftIsTaggingPageLocation(draftId, !checked);
  };

  const shouldDisableLocationCheck = !selectedProfiles.some(
    profile => profile.canAssociateLocation
  );

  return shouldShow ? (
    <Container>
      <LabelWrapper>Location</LabelWrapper>
      <InputWrapper>
        <Checkbox
          type="button"
          checked={shouldDisableLocationCheck ? false : checked}
          aria-label="Tag with connected Facebook Page location"
          onClick={handleClick}
          disabled={shouldDisableLocationCheck}
        >
          <Check />
        </Checkbox>
        <CheckboxLabel
          type="button"
          onClick={handleClick}
          disabled={shouldDisableLocationCheck}
        >
          Connected Facebook Page location{' '}
        </CheckboxLabel>
        <LearnMoreLink
          newTab
          href="https://support.buffer.com/hc/en-us/articles/360037886294-Scheduling-Instagram-posts#h_fe3e6b64-53db-43fe-98af-0d3947d6e9fb"
        >
          Learn more
        </LearnMoreLink>
      </InputWrapper>
    </Container>
  ) : null;
}

LocationComposerBar.propTypes = {
  draftId: PropTypes.string.isRequired,
  isTaggingPageLocation: PropTypes.bool.isRequired,
  selectedProfiles: PropTypes.arrayOf(
    PropTypes.shape({ instagramDirectEnabled: PropTypes.bool })
  ).isRequired,
  isInstagram: PropTypes.bool.isRequired,
};

export default LocationComposerBar;
