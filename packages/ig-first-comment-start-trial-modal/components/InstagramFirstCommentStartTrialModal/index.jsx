import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
} from '@bufferapp/components';

import { Button, Text } from '@bufferapp/ui';
import { Cross, Checkmark } from '@bufferapp/ui/Icon';

const cardStyle = {
  maxWidth: '718px',
  border: '1px solid #B8B8B8',
  boxShadow: '0px 1px 4px #00000029',
  borderRadius: '4px',
  display: 'flex',
};

const leftContentStyle = {
  background: 'white',
  padding: '24px 24px 0px',
  maxWidth: '432px',
};

const rightContentStyle = {
  background: '#F5F5F5',
  padding: '24px',
  maxWidth: '286px',
};

// Not able to use the Text component because of white-space: nowrap; style
const rightContentTitleStyle = {
  color: '#3D3D3D',
  fontFamily: 'Roboto,sans-serif',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '16px',
  marginBottom: '28px',
};

const proTagStyle = {
  width: '40px',
  height: '16px',
  background: '#87C221',
  borderRadius: '23px',
  textAlign: 'center',
  lineHeight: '13px',
};

const proTagSpanStyle = {
  fontWeight: 'bold',
  fontSize: '11px',
  color: 'white',
};

const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
};

const lineStyle = {
  border: '1px solid #E0E0E0',
  marginTop: '16px',
};

const buttonStyle = {
  padding: '16px 0px 8px',
  display: 'flex',
  justifyContent: 'center',
};

const buttonSubCopyStyle = {
  fontWeight: 'bold',
  fontSize: '10px',
  color: '#636363',
  marginBottom: '8px',
  textAlign: 'center',
};

const crossBtnStyle = {
  marginLeft: 'auto',
  marginBottom: '20px',
  cursor: 'pointer',
};

const checkmarkWrapperStyle = {
  width: '24px',
  height: '24px',
  background: '#E0E0E0',
  border: '2px solid #E0E0E0',
  boxSizing: 'border-box',
  borderRadius: '50%',
  marginRight: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: '0',
};

const proFeaturesStyle = {
  fontSize: '14px',
  lineHeight: '20px',
};

const proFeatureWrapperStyle = {
  display: 'flex',
  marginTop: '10px',
};

const proTrialFeatureItem = text => (
  <div style={proFeatureWrapperStyle}>
    <span style={checkmarkWrapperStyle}>
      <Checkmark />
    </span>
    <span style={proFeaturesStyle}>
      {text}
    </span>
  </div>
);

const InstagramFirstCommentStartTrialModal = ({ translations, hideModal }) => (
  <div>
    <Popover>
      <div style={cardStyle}>
        <div style={leftContentStyle}>
          <div style={proTagStyle}>
            <span style={proTagSpanStyle}>
              PRO
            </span>
          </div>
          <Text type="h2">{translations.heading}</Text>
          <div style={{ marginBottom: '24px' }}>
            <Text type="p">{translations.body}</Text>
          </div>
          <div>
            <img
              style={imageStyle}
              src="https://buffer.com/images/modals/instagram/ig_first_comment.gif"
              alt={translations.imageAlt}
            />
          </div>
          <div style={lineStyle} />
          <div style={buttonStyle}>
            <Button
              label={translations.buttonCopy}
              type="primary"
              fullWidth
            />
          </div>
          <div style={buttonSubCopyStyle}>
            {translations.buttonSubCopy}
          </div>
        </div>
        <div style={rightContentStyle}>
          <div style={{ display: 'flex' }}>
            <div
              onClick={hideModal}
              role="button"
              style={crossBtnStyle}
            >
              <Cross size="medium" />
            </div>
          </div>
          <div style={rightContentTitleStyle}>
            {translations.heading2}
          </div>
          {proTrialFeatureItem(
            <div>
              <Text>{translations.proTrialFeatures.connectAccounts}</Text>
              <Text>
                <strong>{translations.proTrialFeatures.connectAccountsBold}</strong>
              </Text>
            </div>,
          )}
          {proTrialFeatureItem(
            <div>
              <Text>{translations.proTrialFeatures.schedulePosts}</Text>
              <Text>
                <strong>{translations.proTrialFeatures.schedulePostsBold}</strong>
              </Text>
              <Text>{translations.proTrialFeatures.schedulePosts2}</Text>
            </div>,
          )}
          {proTrialFeatureItem(
            <div>
              <Text>{translations.proTrialFeatures.support}</Text>
              <Text>
                <strong>{translations.proTrialFeatures.supportBold}</strong>
              </Text>
            </div>,
          )}
          {proTrialFeatureItem(
            <div>
              <Text>{translations.proTrialFeatures.firstComment}</Text>
            </div>,
          )}
          {proTrialFeatureItem(
            <div>
              <Text>{translations.proTrialFeatures.report}</Text>
              <Text>
                <strong>{translations.proTrialFeatures.reportBold}</strong>
              </Text>
            </div>,
          )}
          {proTrialFeatureItem(
            <div>
              <Text>{translations.proTrialFeatures.integrations}</Text>
              <Text>
                <strong>{translations.proTrialFeatures.integrationsBold}</strong>
              </Text>
              <Text>{translations.proTrialFeatures.integrations2}</Text>
            </div>,
          )}
        </div>
      </div>
    </Popover>
  </div>
);

InstagramFirstCommentStartTrialModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  hideModal: PropTypes.func.isRequired,
};

export default InstagramFirstCommentStartTrialModal;
