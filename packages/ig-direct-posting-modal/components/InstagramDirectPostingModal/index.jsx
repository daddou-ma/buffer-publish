import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Card, Link } from '@bufferapp/components';

import { Text, Button } from '@bufferapp/ui';

const cardContentStyle = {
  maxWidth: '470px',
  textAlign: 'left',
  margin: '28px',
};

const textWrapperStyle = {};

const buttonWrapperStyle = {
  display: 'flex',
  marginTop: '16px',
  paddingTop: '16px',
  borderTop: '1px solid #eee',
  justifyContent: 'space-between',
  width: '100%',
};

const InstagramDirectPostingModal = ({
  translations,
  isBusinessOnInstagram,
  onSetUpDirectPostingClick,
  onCheckInstagramBusinessClick,
  onHideInstagramModal,
  profileId,
}) => (
  <div>
    <Popover>
      <Card noPadding noBorder>
        <div style={cardContentStyle}>
          <Text type="h3">{translations.headline}</Text>
          <div style={textWrapperStyle}>
            <Text type="p">{translations.description}</Text>
          </div>
          {!isBusinessOnInstagram && (
            <div style={textWrapperStyle}>
              <Text type="p">
                {translations.instructions}
                <Link
                  newTab
                  href="https://faq.buffer.com/article/959-publish-instagram-set-up"
                >
                  {translations.learnMore}
                </Link>
              </Text>
            </div>
          )}
          <div style={buttonWrapperStyle}>
            <Button
              onClick={onHideInstagramModal}
              type="text"
              label={translations.dismiss}
            />
            {isBusinessOnInstagram && (
              <Button
                type="primary"
                onClick={() => onSetUpDirectPostingClick(profileId)}
                label={translations.cta1}
              />
            )}
            {!isBusinessOnInstagram && (
              <Button
                type="primary"
                onClick={() => onCheckInstagramBusinessClick(profileId)}
                label={translations.cta2}
              />
            )}
          </div>
        </div>
      </Card>
    </Popover>
  </div>
);

InstagramDirectPostingModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  profileId: PropTypes.string.isRequired,
  isBusinessOnInstagram: PropTypes.bool.isRequired,
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
  onHideInstagramModal: PropTypes.func.isRequired,
  onCheckInstagramBusinessClick: PropTypes.func.isRequired,
};

export default InstagramDirectPostingModal;
