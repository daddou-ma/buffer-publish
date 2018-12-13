import React from 'react';
import PropTypes from 'prop-types';

import {
  Popover,
  Card,
  Text,
  Button,
} from '@bufferapp/components';

const WelcomeModal = ({
  translations,
  hideModal,
}) => (<div style={{ position: 'fixed', zIndex: '3000' }}>
  <Popover>
    <Card>
      <div style={{ maxWidth: '380px', textAlign: 'center', margin: '10px 40px' }}>
        <Text size="large" weight="bold" color="black">✨ {translations.headline} ✨</Text>
        <div style={{ margin: '16px 0' }}><Text>{translations.body1}</Text></div>
        <div style={{ margin: '16px 0 24px' }}><Text weight="medium">{translations.body2}</Text></div>
        <Button onClick={hideModal} large>{translations.cta}</Button>
      </div>
    </Card>
  </Popover>
</div>);

WelcomeModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  hideModal: PropTypes.func.isRequired,
};

export default WelcomeModal;
