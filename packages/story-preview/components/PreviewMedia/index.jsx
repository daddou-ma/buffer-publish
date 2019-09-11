import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar, Text } from '@bufferapp/ui';
import { fontWeightMedium } from '@bufferapp/ui/style/fonts';
import { borderRadius } from '@bufferapp/ui/style/borders';

const ContentWrapper = styled.div`
  background-color: #000;
  height: calc(100% - 48px);
  width: calc(354px - 48px);
  padding: 24px;
  border-radius: ${borderRadius} 0 0 ${borderRadius};
`;

const Header = styled.div`
  position: absolute;
  top: 24px;
  display: flex;
  align-items: center;
  margin: 8px;

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
}) => {
  const { avatarUrl, handle } = user;
  const { type, asset_url, thumbnail_url } = story;

  return (
    <ContentWrapper>
      <Header>
        <Avatar
          src={avatarUrl}
          alt={handle}
          size="small"
        />
        <Text type="p" color="white">{handle}</Text>
      </Header>
      {(type === 'image' || type === 'gif')
        && (
          <Image height="544" width="306" src={asset_url} />
        )
      }
      {type === 'video'
        && (
          <Video height="544" width="306" poster={thumbnail_url} autoPlay loop muted>
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
  story: PropTypes.shape({
    note: PropTypes.string,
    type: PropTypes.oneOf(['image', 'video', 'gif']),
    order: PropTypes.number,
    asset_url: PropTypes.string,
    thumbnail_url: PropTypes.string,
  }).isRequired,
};

export default PreviewMedia;
