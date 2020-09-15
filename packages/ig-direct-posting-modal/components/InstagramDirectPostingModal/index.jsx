import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Card } from '@bufferapp/components';
import Link from '@bufferapp/ui/Link';
import { useTranslation } from 'react-i18next';

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
  isBusinessOnInstagram,
  onSetUpDirectPostingClick,
  onCheckInstagramBusinessClick,
  onHideInstagramModal,
  profileId,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Popover>
        <Card noPadding noBorder>
          <div style={cardContentStyle}>
            <Text type="h3">
              {t('instagram-direct-posting-modal.headline')}
            </Text>
            <Text type="p">
              {t('instagram-direct-posting-modal.description')}
            </Text>
            {!isBusinessOnInstagram && (
              <>
                <Text type="p">
                  {t('instagram-direct-posting-modal.instructions1')}
                  <Link
                    newTab
                    href="https://support.buffer.com/hc/en-us/articles/360052978413-Deprecating-Instagram-Personal-Profiles"
                  >
                    {t('instagram-direct-posting-modal.learnMore')}
                  </Link>
                </Text>
                <Text type="p">
                  {t('instagram-direct-posting-modal.instructions2')}
                </Text>
              </>
            )}
            <div style={buttonWrapperStyle}>
              <Button
                onClick={onHideInstagramModal}
                type="text"
                label={t('instagram-direct-posting-modal.dismiss')}
              />
              {isBusinessOnInstagram && (
                <Button
                  type="primary"
                  onClick={() => onSetUpDirectPostingClick(profileId)}
                  label={t('instagram-direct-posting-modal.cta1')}
                />
              )}
              {!isBusinessOnInstagram && (
                <Button
                  type="primary"
                  onClick={() => onCheckInstagramBusinessClick(profileId)}
                  label={t('instagram-direct-posting-modal.cta2')}
                />
              )}
            </div>
          </div>
        </Card>
      </Popover>
    </>
  );};

InstagramDirectPostingModal.propTypes = {
  profileId: PropTypes.string.isRequired,
  isBusinessOnInstagram: PropTypes.bool.isRequired,
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
  onHideInstagramModal: PropTypes.func.isRequired,
  onCheckInstagramBusinessClick: PropTypes.func.isRequired,
};

export default InstagramDirectPostingModal;
