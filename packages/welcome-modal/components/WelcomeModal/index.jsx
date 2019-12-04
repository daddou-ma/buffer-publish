import React from 'react';
import PropTypes from 'prop-types';

import { Popover, Card } from '@bufferapp/components';

import { Text, Button } from '@bufferapp/ui';

const WelcomeModal = ({ translations, hideModal }) => (
  <div style={{ position: 'fixed', zIndex: '3000' }}>
    <Popover>
      <Card>
        <div
          style={{
            maxWidth: '380px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Text type="h3">✨ {translations.headline} ✨</Text>
          <Text type="p">{translations.body2}</Text>
          <div style={{ alignSelf: 'flex-end' }}>
            <Button
              type="primary"
              label={translations.cta}
              onClick={hideModal}
            />
          </div>
        </div>
      </Card>
    </Popover>
  </div>
);

WelcomeModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  hideModal: PropTypes.func.isRequired,
};

export default WelcomeModal;
