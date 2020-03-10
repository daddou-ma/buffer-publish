import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from '@bufferapp/components';
import { grayLight } from '@bufferapp/ui/style/colors';
import { Text, Button, Avatar } from '@bufferapp/ui';

const CardHeaderWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${grayLight};
  padding: 12px 16px;
`;

const CardHeaderWrapperWithButton = styled(CardHeaderWrapper)`
  padding: 8px 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
`;

const ProfileWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const ProfileHandle = styled(Text)`
  margin-left: 16px;
`;

const CreatorWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const AvatarWrapper = styled.span`
  margin-right: 9px;
`;

const TextWithStyles = styled(Text)`
  font-size: 12px;
  line-height: 20px;
  margin: 0;
`;

const getCreatedText = creatorName =>
  creatorName ? `${creatorName} created this ` : 'Created ';

const CardHeader = ({
  profile,
  creatorName,
  avatarUrl,
  createdAt,
  onPreviewClick,
}) => {
  const WrapperComponent = onPreviewClick
    ? CardHeaderWrapperWithButton
    : CardHeaderWrapper;
  const hasProfileDetails = profile?.handle && profile?.type;

  return (
    <WrapperComponent>
      <ContentWrapper>
        {hasProfileDetails && (
          <ProfileWrapper>
            <Avatar
              src={profile.avatarUrl}
              fallbackUrl="https://s3.amazonaws.com/buffer-ui/Default+Avatar.png"
              alt={profile.handle}
              size="small"
              type="social"
              network={profile.type}
            />
            <ProfileHandle type="label" color="grayDark">
              {profile.handle}
            </ProfileHandle>
          </ProfileWrapper>
        )}
        <CreatorWrapper>
          {creatorName && !hasProfileDetails && (
            <AvatarWrapper>
              <Image
                src={avatarUrl}
                border="circle"
                height="1.25rem"
                width="1.25rem"
              />
            </AvatarWrapper>
          )}
          <TextWithStyles type="p" color="grayDark">
            {getCreatedText(creatorName)}
            {createdAt}
          </TextWithStyles>
        </CreatorWrapper>
      </ContentWrapper>
      {onPreviewClick && (
        <Button
          type="secondary"
          label="Preview"
          size="small"
          onClick={onPreviewClick}
        />
      )}
    </WrapperComponent>
  );
};

CardHeader.propTypes = {
  creatorName: PropTypes.string,
  avatarUrl: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onPreviewClick: PropTypes.func,
  profile: PropTypes.shape({
    avatarUrl: PropTypes.string,
    handle: PropTypes.string,
    type: PropTypes.string,
  }),
};

CardHeader.defaultProps = {
  onPreviewClick: null,
  creatorName: null,
  profile: null,
};

export default CardHeader;
