import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  EmptyState,
  BufferLoading,
} from '@bufferapp/publish-shared-components';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { Button } from '@bufferapp/ui';
import CopyIcon from '@bufferapp/ui/Icon/Icons/Copy';
import Avatar from '@bufferapp/ui/Avatar';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import { trackAction } from '@bufferapp/publish-data-tracking';
import { IconArrowPopover } from '@bufferapp/components';
import { openPreviewPage } from '../../util';

const ErrorBoundary = getErrorBoundary(true);

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1.8rem',
  width: '100%',
};

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

const profileBadgeStyle = {
  padding: '0.05rem 0.25rem',
};

const profileHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
};

const buttonsWrapperStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '340px',
};

const linkFieldStyle = {
  marginRight: '12px',
  width: '100%',
};

const copyLinkButtonStyle = {
  alignItems: 'center',
  backgroundColor: '#E0E0E0',
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
  color: '#636363',
  cursor: 'pointer',
  display: 'flex',
  fontFamily: 'Roboto',
  fontSize: '14px',
  height: '40px',
  outline: 'none',
  paddingLeft: '16px',
  paddingRight: '16px',
  width: '100%',
};

const copyLinkStyle = {
  width: '16px',
  height: '16px',
  marginLeft: 'auto',
};

const onCopyToClipboard = (text, handleCopyToClipboard) => {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(el);
  if (copied) {
    handleCopyToClipboard(true);
  } else {
    handleCopyToClipboard(false);
  }
};

const onPreviewClick = (publicGridUrl) => {
  trackAction({ location: 'grid', action: 'click_preview_url' });
  openPreviewPage(publicGridUrl);
};

const GridPosts = ({
  total,
  loading,
  gridPosts,
  onImageClick,
  onImageClose,
  onChangePostUrl,
  onSavePostUrl,
  isManager,
  isLockedProfile,
  isBusinessAccount,
  profile,
  handleCopyToClipboard,
  publicGridUrl,
  features,
}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <BufferLoading size={64} />
      </div>
    );
  }

  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }

  if (features.isFreeUser() && !isBusinessAccount) {
    return <div />;
  }

  if (total < 1) {
    return (
      <Fragment>
        <EmptyState
          title="You haven’t published any posts with this account in the past 30 days!"
          subtitle="Once a post has gone live via Buffer,
          you can track its performance here to learn what works best with your audience!"
          heroImg="https://s3.amazonaws.com/buffer-publish/images/empty-sent2x.png"
          heroImgSize={{ width: '270px', height: '150px' }}
        />
      </Fragment>
    );
  }

  return (
    <ErrorBoundary>
      <div>
        <div style={headerStyle}>
          <div style={profileHeaderStyle}>
            <div style={profileBadgeStyle}>
              <Avatar
                src={profile.avatar_https}
                fallbackUrl="https://s3.amazonaws.com/buffer-ui/Default+Avatar.png"
                alt={profile.handle}
                size="large"
                type="social"
                network={profile.service}
              />
            </div>
          </div>
          <div style={buttonsWrapperStyles}>
            <div style={linkFieldStyle}>
              <button
                style={copyLinkButtonStyle}
                onClick={() => {
                  onCopyToClipboard(
                    publicGridUrl,
                    handleCopyToClipboard,
                  );
                }}
              >
                {publicGridUrl}
                <div style={copyLinkStyle}>
                  <div style={{ display: 'inline-block', position: 'relative', top: '0px', left: '5px' }}>
                    <IconArrowPopover
                      icon={<CopyIcon size="medium" />}
                      shadow
                      oneLine
                      label="Copy Page Link"
                    >
                      <div style={{ padding: '.25rem .10rem' }}>
                        Copy Page Link
                      </div>
                    </IconArrowPopover>
                  </div>
                </div>
              </button>
            </div>
            <Button
              label={'Preview Page'}
              type="secondary"
              onClick={() => {
                onPreviewClick(publicGridUrl);
              }}
            />
          </div>
        </div>
        <GridList
          gridPosts={gridPosts}
          onChangePostUrl={onChangePostUrl}
          onSavePostUrl={onSavePostUrl}
          onImageClick={onImageClick}
          onImageClose={onImageClose}
          timezone={profile.timezone}
        />
      </div>
    </ErrorBoundary>
  );
};

GridPosts.propTypes = {
  loading: PropTypes.bool,
  page: PropTypes.number, // eslint-disable-line
  gridPosts: PropTypes.arrayOf(
    PropTypes.shape({
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        }),
      ),
    }),
  ),
  total: PropTypes.number,
  onChangePostUrl: PropTypes.func,
  onSavePostUrl: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClose: PropTypes.func,
  handleCopyToClipboard: PropTypes.func,
  features: PropTypes.object.isRequired, // eslint-disable-line
  isManager: PropTypes.bool,
  isBusinessAccount: PropTypes.bool,
  publicGridUrl: PropTypes.string,
  isLockedProfile: PropTypes.bool,
  profile: PropTypes.shape({
    service: PropTypes.string,
    avatar_https: PropTypes.string,
    timezone: PropTypes.string,
  }),
};

GridPosts.defaultProps = {
  loading: true,
  total: 0,
  gridPosts: [],
  publicGridUrl: '',
  isManager: false,
  isBusinessAccount: false,
  isLockedProfile: false,
  onChangePostUrl: () => {},
  onSavePostUrl: () => {},
  onImageClick: () => {},
  onImageClose: () => {},
  handleCopyToClipboard: () => {},
  profile: {},
};

export default WithFeatureLoader(GridPosts);
