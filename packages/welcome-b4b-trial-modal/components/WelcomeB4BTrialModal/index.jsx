import React from 'react';
import PropTypes from 'prop-types';

import { Popover, Divider } from '@bufferapp/components';
import { Button, Text } from '@bufferapp/ui';
import { trackAction } from '@bufferapp/publish-data-tracking';

const modalStyle = {
  // border: '1px solid #B8B8B8',
  borderRadius: '4px',
  width: '562px',
  background:
    '#fff url(https://s3.amazonaws.com/buffer-publish/images/b4b-welcome-modal-background.svg) no-repeat top center',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
  display: 'flex',
  flexDirection: 'column',
};

const modalContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '115px 24px 32px 24px',
};

const modalActionsStyle = {
  padding: '16px 24px',
  display: 'flex',
  alignSelf: 'flex-end',
};

const trialLabelStyle = {
  color: '#121E66',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'bold',
  lineHeight: 'normal',
  fontSize: '12px',
  textTransform: 'uppercase',
};

const showGettingStarted = () => {
  const openGuide = () =>
    window.location.assign(
      'https://faq.buffer.com/article/770-getting-started-with-buffer-publish?utm_source=faq&utm_medium=welcome-modal&utm_campaign=welcome'
    );
  trackAction(
    {
      location: 'modals',
      action: 'welcome_b4b_trial_modal_getting_started_click',
    },
    {
      success: openGuide,
      error: openGuide,
    }
  );
};

const maybeLater = ({ hideModal }) => {
  trackAction(
    {
      location: 'modals',
      action: 'welcome_b4b_trial_modal_maybe_later_click',
    },
    {
      success: hideModal,
      error: hideModal,
    }
  );
};

const WelcomeB4BTrialModal = ({ translations, hideModal }) => (
  <div style={{ position: 'fixed', zIndex: '3000' }}>
    <Popover>
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <div style={trialLabelStyle}>{translations.trialLabel}</div>
          <Text type="h2">{translations.header}</Text>
          <Text>{translations.subHeader}</Text>
        </div>
        <Divider />
        <div style={modalActionsStyle}>
          <Button
            type="text"
            label={translations.cancelCta}
            onClick={() => maybeLater({ hideModal })}
          />
          <Button
            type="primary"
            label={translations.cta}
            onClick={() => showGettingStarted()}
          />
        </div>
      </div>
    </Popover>
  </div>
);

WelcomeB4BTrialModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  hideModal: PropTypes.func.isRequired,
};

export default WelcomeB4BTrialModal;
