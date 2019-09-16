import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DiscontinuousProgressBar } from '@bufferapp/publish-shared-components';
import { Avatar, Text } from '@bufferapp/ui';
import { fontWeightMedium } from '@bufferapp/ui/style/fonts';
import { borderRadius } from '@bufferapp/ui/style/borders';

const IMAGE_WIDTH = 306;
const IMAGE_HEIGHT = 544;

const ContentWrapper = styled.div`
  background-color: #000;
  padding: 24px;
  border-radius: ${borderRadius} 0 0 ${borderRadius};
`;

const Header = styled.div`
  position: absolute;
  top: 24px;
  display: flex;
  flex-direction: column;
  width: calc(${IMAGE_WIDTH}px - 16px);
  margin: 8px;
`;

const AvatarContainer = styled.span`
  display: flex;
  align-items: center;

  p:first-of-type {
    margin-left: 7px;
    font-weight: ${fontWeightMedium};
  }
`;

const Image = styled.img`
  object-fit: cover;
`;

const Video = styled.video`
  object-fit: cover;
`;

const PreviewMedia = ({
  story,
  user,
  numberOfStories,
}) => {
  const { avatarUrl, handle } = user;
  const {
    type, asset_url, thumbnail_url, order,
  } = story;

  return (
    <ContentWrapper>
      <Header>
        <DiscontinuousProgressBar
          totalNumberOfBars={numberOfStories}
          numberOfBarsFilled={order}
        />
        <AvatarContainer>
          <Avatar
            src={avatarUrl}
            alt={handle}
            size="small"
          />
          <Text type="p" color="white">{handle}</Text>
        </AvatarContainer>
      </Header>
      {(type === 'image' || type === 'gif')
        && (
          <Image height={IMAGE_HEIGHT} width={IMAGE_WIDTH} src={asset_url} />
        )
      }
      {type === 'video'
        && (
          <Video height={IMAGE_HEIGHT} width={IMAGE_WIDTH} poster={thumbnail_url} autoPlay loop muted>
            <source src={asset_url} type="video/mp4" />
            <source src={asset_url} type="video/webm" />
          </Video>
        )
      }
    </ContentWrapper>
  );
};

PreviewMedia.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    handle: PropTypes.string,
  }).isRequired,
  numberOfStories: PropTypes.number.isRequired,
  story: PropTypes.shape({
    note: PropTypes.string,
    type: PropTypes.oneOf(['image', 'video', 'gif']),
    order: PropTypes.string,
    asset_url: PropTypes.string,
    thumbnail_url: PropTypes.string,
  }).isRequired,
};

export default PreviewMedia;
