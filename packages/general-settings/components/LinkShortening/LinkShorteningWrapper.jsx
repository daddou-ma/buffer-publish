import { Text } from '@bufferapp/ui';
import Select from '@bufferapp/components/Select';
import PropTypes from 'prop-types';
import React from 'react';
import { BufferLoading } from '@bufferapp/publish-shared-components';
import ConnectBitlyToggler from './ConnectBitlyButton';

const bitlyWrapperSidebarStyle = {
  flexDirection: 'column',
  flex: '0.3',
  marginLeft: '1rem',
};

const wrapperSidebarStyle = {
  textAlign: 'right',
  whiteSpace: 'nowrap',
  marginLeft: '0.5rem',
  minWidth: '175px',
};

const optionOnlyStyle = {
  alignSelf: 'center',
};

const loadingContainerStyle = {
  ...wrapperSidebarStyle,
  paddingTop: '1.5rem',
};

const containerStyling = {
  display: 'flex',
  flex: '1 1 0%',
  flexDirection: 'row',
  padding: '0.5rem 0',
  width: '100%',
};

const LinkShorteningWrapper = ({
  isFreeUser,
  onOptionSelect,
  children,
  linkList,
  startSectionStyles,
  loading,
  selectedShortener,
  showConnectBitly,
  onConnectBitlyURLClick,
  onDisconnectBitlyURLClick,
  isBitlyConnected,
  isManager,
}) => {
  const selectedValue =
    selectedShortener || (linkList && linkList.filter(ll => ll.selected));

  return (
    <div style={containerStyling}>
      <div style={startSectionStyles}>
        <Text type="h3">Link Shortening</Text>
        {children}
      </div>
      {loading && (
        <div style={loadingContainerStyle}>
          <BufferLoading size={32} />
        </div>
      )}
      {linkList && !loading && (
        <div
          style={{
            ...wrapperSidebarStyle,
            ...bitlyWrapperSidebarStyle,
            ...(!showConnectBitly || isFreeUser ? optionOnlyStyle : ''),
          }}
        >
          <div>
            <Select
              options={linkList}
              onChange={onOptionSelect}
              value={selectedValue && selectedValue[0].value}
              size={'small'}
              disabled={!isManager}
            />
          </div>
          <ConnectBitlyToggler
            isFreeUser={isFreeUser}
            showConnectBitly={showConnectBitly}
            isBitlyConnected={isBitlyConnected}
            onConnectBitlyURLClick={onConnectBitlyURLClick}
            onDisconnectBitlyURLClick={onDisconnectBitlyURLClick}
          />
        </div>
      )}
    </div>
  );
};

LinkShorteningWrapper.defaultProps = {
  onOptionSelect: null,
  linkList: null,
  startSectionStyles: null,
  loading: true,
  selectedShortener: null,
  showConnectBitly: false,
  onConnectBitlyURLClick: null,
  onDisconnectBitlyURLClick: null,
  isBitlyConnected: false,
};

LinkShorteningWrapper.propTypes = {
  onConnectBitlyURLClick: PropTypes.func,
  onDisconnectBitlyURLClick: PropTypes.func,
  onOptionSelect: PropTypes.func,
  children: PropTypes.element.isRequired,
  loading: PropTypes.bool,
  linkList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      selected: PropTypes.bool,
    })
  ),
  startSectionStyles: PropTypes.shape({
    width: PropTypes.string,
    maxWidth: PropTypes.string,
  }),
  selectedShortener: PropTypes.string,
  showConnectBitly: PropTypes.bool,
  isBitlyConnected: PropTypes.bool,
  isFreeUser: PropTypes.func.isRequired,
  isManager: PropTypes.bool.isRequired,
};

export default LinkShorteningWrapper;
