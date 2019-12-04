import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Card, Link } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';
import WarningIcon from '@bufferapp/ui/Icon/Icons/Warning';

const titleStyle = {
  display: 'flex',
};

const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingRight: '0.5rem',
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
              <WarningIcon />
            </span>
            <Text type="h3">
              {translations.headline1} {stealProfileUsername}{' '}
              {translations.headline2}
            </Text>
          </div>
          <Text type="p">{translations.body1}</Text>
          <Text type="p">
            <strong>
              {`${translations.body2} ${stealProfileUsername} ${translations.body3}
               ${email} ${translations.body4}
              `}
            </strong>
          </Text>
          <Text type="p">
            <strong>{translations.notSureWhere}&nbsp;</strong>
            <Link newTab href="https://buffer.com/support">
              {translations.getInTouch}
            </Link>
          </Text>
          <form
            style={{
              paddingTop: '1.5rem',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              type="primary"
              onClick={hideModal}
              label={translations.takeMeBack}
            />
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
