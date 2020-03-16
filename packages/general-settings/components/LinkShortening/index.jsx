import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/ui';

import LinkShorteningWrapper from './LinkShorteningWrapper';

const pinterestSectionStyling = {
  padding: '10px',
  background: '#efefef',
  borderRadius: '6px',
  backgroundClip: 'padding-box',
  width: '100%',
};

const LinkShortening = ({
  features,
  onOptionSelect,
  profileService,
  linkShorteners,
  loading,
  selectedShortener,
  onDisconnectBitlyURLClick,
  onConnectBitlyURLClick,
  isManager,
  isBitlyConnected,
}) => {
  const linkList =
    linkShorteners &&
    linkShorteners.map(ls => ({
      value: ls.domain,
      name: `${ls.domain} ${ls.login ? `- ${ls.login}` : ''}`,
      selected: ls.selected,
    }));

  if (profileService === 'pinterest') {
    return (
      <LinkShorteningWrapper
        loading={false}
        startSectionStyles={{
          width: '100%',
        }}
      >
        <div>
          <div style={pinterestSectionStyling}>
            <Text type="p">
              Sadly, at the moment Pinterest does not allow posting of shortened
              links. <br />
              For more, read all about it{' '}
              <a
                href="https://help.pinterest.com/en/articles/blocked-links-and-websites"
                rel="noopener noreferrer"
                target="_blank"
              >
                here
              </a>
              .
            </Text>
          </div>
        </div>
      </LinkShorteningWrapper>
    );
  }
  return (
    <LinkShorteningWrapper
      isFreeUser={features.isFreeUser}
      loading={loading}
      startSectionStyles={{
        flex: 1,
      }}
      onOptionSelect={onOptionSelect}
      linkList={linkList}
      selectedShortener={selectedShortener}
      onConnectBitlyURLClick={onConnectBitlyURLClick}
      onDisconnectBitlyURLClick={onDisconnectBitlyURLClick}
      showConnectBitly={isManager}
      isBitlyConnected={isBitlyConnected}
      isManager={isManager}
    >
      <div>
        <Text type="p">
          Are your links feeling a little long? Well worry no longer, choose one
          of our link shorteners or connect your own bit.ly account and Buffer
          will make sure that your links are shortened whenever you post.
        </Text>
        <Text type="p">
          Please note that due to the specific spam filter LinkedIn uses, we do
          not support buff.ly for LinkedIn and will default to bit.ly.
        </Text>
      </div>
    </LinkShorteningWrapper>
  );
};

LinkShortening.defaultProps = {
  onOptionSelect: null,
  linkShorteners: null,
  loading: true,
  profileService: null,
  selectedShortener: null,
  isManager: true,
  isBitlyConnected: false,
};

LinkShortening.propTypes = {
  isManager: PropTypes.bool,
  isBitlyConnected: PropTypes.bool,
  onConnectBitlyURLClick: PropTypes.func.isRequired,
  onDisconnectBitlyURLClick: PropTypes.func.isRequired,
  profileService: PropTypes.string,
  onOptionSelect: PropTypes.func,
  linkShorteners: PropTypes.arrayOf(
    PropTypes.shape({
      domain: PropTypes.string,
      selected: PropTypes.bool,
      tracking: PropTypes.bool,
      login: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  selectedShortener: PropTypes.string,
  features: PropTypes.shape({
    isFreeUser: PropTypes.func,
  }).isRequired,
};

export default LinkShortening;
