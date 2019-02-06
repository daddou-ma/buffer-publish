import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Card, Button, Text, WarningIcon } from '@bufferapp/components';

const Modal = ({ onClickUpgradeToPro, onCloseLockedModal }) =>
  <Popover
    onOverlayClick={onCloseLockedModal}
  >
    <div style={{ width: '30rem', margin: '0 25px' }}>
      <Card>
        <div style={{ textAlign: 'left' }}>
          <span style={{ display: 'block', textAlign: 'center' }}>
            <Text size="large" color="outerSpace">
              <WarningIcon
                size={{
                  width: '0.9rem',
                  height: '0.9rem',
                }}
              />
              &nbsp; Whoops, this social account is locked
            </Text>
          </span>
          <span style={{ display: 'block', margin: '.75rem 0 1rem 0' }}>
            <Text>
              This social account is locked because you’re over your plan limit on the Free Plan.
              On this plan, you can have up to 3 social accounts that you use in total.
            </Text>
          </span>
          <span style={{ display: 'block', margin: '.75rem 0 1rem 0' }}>
            <Text>
              To unlock your social accounts and manage up to 8 accounts,
              please consider upgrading to our Pro Plan.
            </Text>
          </span>
        </div>
        <form style={{ padding: '0 2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '1.5rem 0' }}>
            <Button
              large
              onClick={(e) => {
                e.preventDefault();
                onCloseLockedModal();
                onClickUpgradeToPro();
              }}
            >
              Upgrade to Pro
            </Button>
          </div>
        </form>
      </Card>
    </div>
  </Popover>;

Modal.propTypes = {
  onClickUpgradeToPro: PropTypes.func.isRequired,
  onCloseLockedModal: PropTypes.func.isRequired,
};

export default Modal;
