import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from '@bufferapp/components';
import { EmptyState } from '@bufferapp/publish-shared-components';

const pageStyle = {
  display: 'flex',
  flexGrow: 1,
  height: '100%',
};

const defaultPageStyle = {
  padding: '1rem',
  textAlign: 'center',
  flex: '1',
  marginTop: '10vh',
};

const DefaultPage = ({
  onConnectSocialAccountClick,
  translations,
}) => (
  <div style={pageStyle}>
    <div style={defaultPageStyle}>
      <EmptyState
        heroImg="https://s3.amazonaws.com/buffer-publish/images/no-profiles-hero-img.svg"
        title={translations.defaultTitle}
        heroImgSize={{ width: '560', height: '284' }}
        height="auto"
      />
      <Button
        onClick={() => { onConnectSocialAccountClick(); }}
      >
        {translations.connectButton}
      </Button>
    </div>
  </div>
);

DefaultPage.propTypes = {
  onConnectSocialAccountClick: PropTypes.func.isRequired,
  translations: PropTypes.shape({
    connectButton: PropTypes.string,
    defaultTitle: PropTypes.string,
  }).isRequired,
};

export default DefaultPage;
