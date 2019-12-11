import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  EmptyState,
  BufferLoading,
} from '@bufferapp/publish-shared-components';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { Button, Text, Tooltip } from '@bufferapp/ui';
import CopyIcon from '@bufferapp/ui/Icon/Icons/Copy';
import InfoIcon from '@bufferapp/ui/Icon/Icons/Info';
import ArrowRightIcon from '@bufferapp/ui/Icon/Icons/ArrowRight';
import Avatar from '@bufferapp/ui/Avatar';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import { trackAction } from '@bufferapp/publish-data-tracking';
import { IconArrowPopover } from '@bufferapp/components';
import styled from 'styled-components';
import { grayLight, grayDark, gray } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';
import { fontFamily, fontSize } from '@bufferapp/ui/style/fonts';
import { openPreviewPage } from '../../util';
import CustomLinks from '../CustomLinks';

const ErrorBoundary = getErrorBoundary(true);

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.8rem;
  width: 100%;
`;

const StlyedLoadingGridContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 5rem;
`;

const StyledProfileBadge = styled.div`
  padding: 0.05rem 0.25rem;
`;

const StyledProfileHeader = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 340px;
`;

const StyledLinkField = styled.div`
  margin-right: 12px;
  width: 100%;
`;

const StlyedCopyLinkButton = styled.button`
  align-items: center;
  background-color: ${grayLight};
  border: 1px solid ${grayLight};
  border-radius: ${borderRadius};
  color: ${grayDark};
  cursor: pointer;
  display: flex;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  height: 40px;
  outline: none;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
`;

const StyledCopyLink = styled.div`
  width: 16px;
  height: 16px;
  margin-left: auto;
`;

const StyledCopyLinkIcon = styled.div`
  display: inline-block;
  position: relative;
  top: 0;
  left: 5px;
`;

const StyledCopyLinkText = styled.div`
  padding: 0.25rem 0.1rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled(Text)`
  color: ${grayDark};
  margin: 16px 0;
`;

const TooltipWrapper = styled.div`
  padding: 6px 0 0 6px;
`;

const onCopyToClipboard = ({ publicGridUrl, handleCopyToClipboard }) => {
  const el = document.createElement('textarea');
  el.value = publicGridUrl;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(el);
  if (copied) {
    handleCopyToClipboard({ copySuccess: true, publicGridUrl });
  } else {
    handleCopyToClipboard({ copySuccess: false });
  }
};

const onPreviewClick = publicGridUrl => {
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
  trackPagePreviewed,
  isManager,
  isLockedProfile,
  isBusinessAccount,
  profile,
  handleCopyToClipboard,
  publicGridUrl,
  features,
  customLinksDetails,
  onUpdateCustomLinks,
  onUpdateCustomLinksColor,
  onUpdateCustomLinksButtonType,
  onDeleteCustomLink,
  onUpdateLinkText,
  onUpdateLinkUrl,
  hasCustomLinksFlip,
  maxCustomLinks,
  onToggleEditMode,
  onSwapCustomLinks,
  onCancelCustomLinkEdit,
  onSaveNewLinkClick,
  onUpdateSingleCustomLink,
  isValidItem,
}) => {
  if (loading) {
    return (
      <StlyedLoadingGridContainer>
        <BufferLoading size={64} />
      </StlyedLoadingGridContainer>
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
        <StyledHeader>
          <StyledProfileHeader>
            <StyledProfileBadge>
              <Avatar
                src={profile.avatar_https}
                fallbackUrl="https://s3.amazonaws.com/buffer-ui/Default+Avatar.png"
                alt={profile.handle}
                size="large"
                type="social"
                network={profile.service}
              />
            </StyledProfileBadge>
          </StyledProfileHeader>
          <StyledButtonWrapper>
            <StyledLinkField>
              <StlyedCopyLinkButton
                type="button"
                onClick={() => {
                  onCopyToClipboard({
                    publicGridUrl,
                    handleCopyToClipboard,
                  });
                }}
              >
                {publicGridUrl}
                <StyledCopyLink>
                  <StyledCopyLinkIcon>
                    <IconArrowPopover
                      icon={<CopyIcon size="medium" />}
                      shadow
                      oneLine
                      label="Copy Page Link"
                    >
                      <StyledCopyLinkText>Copy Page Link</StyledCopyLinkText>
                    </IconArrowPopover>
                  </StyledCopyLinkIcon>
                </StyledCopyLink>
              </StlyedCopyLinkButton>
            </StyledLinkField>
            <Button
              label="Preview Page"
              type="secondary"
              onClick={() => {
                onPreviewClick(publicGridUrl);
                trackPagePreviewed(profile);
              }}
              icon={<ArrowRightIcon />}
              iconEnd
            />
          </StyledButtonWrapper>
        </StyledHeader>
        {hasCustomLinksFlip && (
          <CustomLinks
            customLinksDetails={customLinksDetails}
            onUpdateCustomLinks={onUpdateCustomLinks}
            onUpdateCustomLinksColor={onUpdateCustomLinksColor}
            onUpdateCustomLinksButtonType={onUpdateCustomLinksButtonType}
            onDeleteCustomLink={onDeleteCustomLink}
            onUpdateLinkText={onUpdateLinkText}
            onUpdateLinkUrl={onUpdateLinkUrl}
            maxCustomLinks={maxCustomLinks}
            onToggleEditMode={onToggleEditMode}
            onSwapCustomLinks={onSwapCustomLinks}
            onCancelCustomLinkEdit={onCancelCustomLinkEdit}
            onSaveNewLinkClick={onSaveNewLinkClick}
            onUpdateSingleCustomLink={onUpdateSingleCustomLink}
            isValidItem={isValidItem}
          />
        )}
        <TitleWrapper>
          <Title type="h3" color="grayDark">
            Posts
          </Title>
          <TooltipWrapper>
            <Tooltip
              label="Only posts with links will appear on your public Shop Grid page."
              position="right"
            >
              <InfoIcon color={gray} />
            </Tooltip>
          </TooltipWrapper>
        </TitleWrapper>
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
        })
      ),
    })
  ),
  total: PropTypes.number,
  onChangePostUrl: PropTypes.func,
  onSavePostUrl: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClose: PropTypes.func,
  handleCopyToClipboard: PropTypes.func,
  trackPagePreviewed: PropTypes.func.isRequired,
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
  customLinksDetails: PropTypes.shape({
    customLinks: PropTypes.array,
    maxCustomLinks: PropTypes.number,
    buttonColor: PropTypes.string,
  }),
  isValidItem: PropTypes.func,
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
  isValidItem: () => {},
  customLinksDetails: {
    customLinks: [],
    maxCustomLinks: 0,
    buttonColor: null,
  },
};

export default WithFeatureLoader(GridPosts);
