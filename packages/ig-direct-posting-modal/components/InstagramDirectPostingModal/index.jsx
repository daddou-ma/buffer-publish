import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Card } from '@bufferapp/components';
import Link from '@bufferapp/ui/Link';

import { Text, Button } from '@bufferapp/ui';

const cardContentStyle = {
  maxWidth: '470px',
  textAlign: 'left',
  margin: '28px',
};

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
  <>
    <Popover>
      <Card noPadding noBorder>
        <div style={cardContentStyle}>
          <Text type="h3">{translations.headline}</Text>
          <Text type="p">{translations.description}</Text>
          {!isBusinessOnInstagram && (
            <>
              <Text type="p">
                {translations.instructions1}
                <Link
                  newTab
                  href="https://support.buffer.com/hc/en-us/articles/360052978413-Deprecating-Instagram-Personal-Profiles"
                >
                  {translations.learnMore}
                </Link>
              </Text>
              <Text type="p">{translations.instructions2}</Text>
            </>
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
  </>
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
