import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  Card,
  Text,
  Button,
  NotificationIcon,
} from '@bufferapp/components';

const StealProfileModal = ({
  translations,
  hideModal,
  stealProfileUsername,
  email,
}) => (
  <div style={{ position: 'fixed', zIndex: '3000' }}>
    <Popover>
      <Card>
        <div style={{ maxWidth: '380px', textAlign: 'center', margin: '10px 40px' }}>
          <Text size="large" weight="medium" color="black">
            <NotificationIcon />
            {translations.headline1} {stealProfileUsername} {translations.headline2}
          </Text>
          <div style={{ margin: '16px 0 24px' }}>
            <Text>{translations.body1}</Text>
          </div>
          <div style={{ margin: '16px 0 24px' }}>
            <Text>
              {translations.body2}
              {stealProfileUsername}
              {translations.body3}
              {email}
              {translations.body4}
            </Text>
          </div>
          <div style={{ margin: '16px 0 24px' }}>
            <Text>
              {translations.notSureWhere} {translations.getInTouch}
            </Text>
          </div>
          <Button onClick={hideModal} large>{translations.takeMeBack}</Button>
        </div>
      </Card>
    </Popover>
  </div>
);

StealProfileModal.defaultProps = {
  stealProfileUsername: '',
  email: '',
};

StealProfileModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  stealProfileUsername: PropTypes.string,
  email: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
};

export default StealProfileModal;
