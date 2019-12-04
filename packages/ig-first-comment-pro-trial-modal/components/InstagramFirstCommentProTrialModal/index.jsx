import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@bufferapp/components';

import { Button, Text } from '@bufferapp/ui';
import { Cross, Checkmark } from '@bufferapp/ui/Icon';
import { ProTag } from '@bufferapp/publish-shared-components';

const cardStyle = {
  border: '1px solid #B8B8B8',
  boxShadow: '0px 1px 4px #00000029',
  borderRadius: '4px',
  display: 'flex',
};

const leftContentStyle = {
  background: 'white',
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
  fontSize: '14px',
  fontWeight: '500',
  marginBottom: '28px',
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
  padding: '16px 24px 8px',
  display: 'flex',
  justifyContent: 'center',
};

// Not using Text component because smallest font size is 14px
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
    <span style={proFeaturesStyle}>{text}</span>
  </div>
);

const InstagramFirstCommentProTrialModal = ({
  translations,
  hideModal,
  startTrial,
  loading,
}) => (
  <div>
    <Popover onOverlayClick={hideModal}>
      <div style={cardStyle}>
        <div style={leftContentStyle}>
          <div style={{ padding: '24px 24px 0px' }}>
            <ProTag />
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
          </div>

          <div style={lineStyle} />
          <div style={buttonStyle}>
            <Button
              label={
                loading
                  ? translations.buttonLoadingCopy
                  : translations.buttonCopy
              }
              type="primary"
              fullWidth
              onClick={startTrial}
              disabled={loading}
            />
          </div>
          <div style={buttonSubCopyStyle}>{translations.buttonSubCopy}</div>
        </div>
        <div style={rightContentStyle}>
          <div style={{ display: 'flex' }}>
            <div onClick={hideModal} role="button" style={crossBtnStyle}>
              <Cross size="medium" />
            </div>
          </div>
          <div style={rightContentTitleStyle}>{translations.heading2}</div>
          {proTrialFeatureItem(
            <div>
              <Text>{translations.proTrialFeatures.connectAccounts}</Text>
              <Text>
                <strong>
                  {translations.proTrialFeatures.connectAccountsBold}
                </strong>
              </Text>
            </div>
          )}
          {proTrialFeatureItem(
            <div>
              <Text>{translations.proTrialFeatures.schedulePosts}</Text>
              <Text>
                <strong>
                  {translations.proTrialFeatures.schedulePostsBold}
                </strong>
              </Text>
              <Text>{translations.proTrialFeatures.schedulePosts2}</Text>
            </div>
          )}
          {proTrialFeatureItem(
            <div>
              <Text>{translations.proTrialFeatures.support}</Text>
              <Text>
                <strong>{translations.proTrialFeatures.supportBold}</strong>
              </Text>
            </div>
          )}
          {proTrialFeatureItem(
            <div>
              <Text>{translations.proTrialFeatures.firstComment}</Text>
            </div>
          )}
          {proTrialFeatureItem(
            <div>
              <Text>{translations.proTrialFeatures.report}</Text>
              <Text>
                <strong>{translations.proTrialFeatures.reportBold}</strong>
              </Text>
            </div>
          )}
          {proTrialFeatureItem(
            <div>
              <Text>{translations.proTrialFeatures.integrations}</Text>
              <Text>
                <strong>
                  {translations.proTrialFeatures.integrationsBold}
                </strong>
              </Text>
              <Text>{translations.proTrialFeatures.integrations2}</Text>
            </div>
          )}
        </div>
      </div>
    </Popover>
  </div>
);

InstagramFirstCommentProTrialModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  hideModal: PropTypes.func.isRequired,
  startTrial: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default InstagramFirstCommentProTrialModal;
