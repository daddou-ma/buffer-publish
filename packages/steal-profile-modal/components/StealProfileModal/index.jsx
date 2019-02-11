import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  Card,
  Text,
  Button,
  Link,
  NotificationIcon,
} from '@bufferapp/components';

const titleStyle = {
  display: 'flex',
};

const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingRight: '0.5rem',
};

const contentStyle = {
  marginTop: '0.8rem',
};

const StealProfileModal = ({
  translations,
  hideModal,
  stealProfileUsername,
  email,
}) => (
  <div style={{ position: 'fixed', zIndex: '3000' }}>
    <Popover onOverlayClick={hideModal}>
      <Card reducedPadding>
        <div style={{ maxWidth: '580px', margin: '10px 20px' }}>
          <div style={titleStyle}>
            <span style={iconStyle}>
              <NotificationIcon size={12} />
            </span>
            <Text
              color={'outerSpace'}
              weight={'medium'}
            >
              {translations.headline1} {stealProfileUsername} {translations.headline2}
            </Text>
          </div>
          <div style={contentStyle}>
            <Text size={'mini'}>
              {translations.body1}
            </Text>
          </div>
          <div style={contentStyle}>
            <Text size={'mini'} weight={'medium'}>
              {
                `${translations.body2} ${stealProfileUsername} ${translations.body3}
                 ${email} ${translations.body4}
                `
              }
            </Text>
          </div>
          <div style={contentStyle}>
            <Text size={'mini'} weight={'medium'}>
              {translations.notSureWhere}&nbsp;
              <Link newTab href="https://buffer.com/support">
                {translations.getInTouch}
              </Link>
            </Text>
          </div>
          <form style={{ paddingTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={hideModal}
              large
            >
              <Text size={'mini'} weight={'medium'} color={'white'}>
                {translations.takeMeBack}
              </Text>
            </Button>
          </form>
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
