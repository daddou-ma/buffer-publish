import React from 'react';
import PropTypes from 'prop-types';
import { Text, Link } from '@bufferapp/components';
import { borderWidth } from '@bufferapp/components/style/border';
import { mystic } from '@bufferapp/components/style/color';
import { SERVICE_NAMES } from '@bufferapp/publish-constants';
import { abbreviateNumber } from '@bufferapp/publish-server/formatters/src';

const statsBarStyle = {
  display: 'flex',
  backgroundColor: '#fcfcfc',
  marginRight: '-1px',
};

const statsCellStyle = {
  flexGrow: 1,
  flexBasis: 0,
  display: 'flex',
  borderTop: `${borderWidth} solid ${mystic}`,
  padding: '8px',
  borderRight: `${borderWidth} solid ${mystic}`,
  alignItems: 'center',
  flexDirection: 'column',
};

const PostStats = ({ statistics, profileService, showTwitterMentions }) => {
  const titles = {
    retweets: 'Retweet',
    comments: 'Comment',
    likes: 'Like',
    favorites: 'Like',
    mentions: 'Mention',
    clicks: 'Click',
    reach_twitter: 'Impressions',
    reach: 'Reach',
    shares: 'Share',
    reshares: 'Reshare',
    repins: 'Save',
    plusOne: '+1',
  };

  const createElement = typeStats => {
    const isLinkedinClicks =
      typeStats === 'clicks' && profileService === 'linkedin';
    let value = statistics[typeStats];
    let title = titles[typeStats];
    if (typeStats === 'reach_twitter' && profileService === 'twitter') {
      value = statistics.impressions;
    }
    if (typeStats === 'reach' && profileService === 'twitter') {
      return;
    }
    if (
      !showTwitterMentions &&
      typeStats === 'mentions' &&
      profileService === 'twitter'
    ) {
      return;
    }
    if (
      typeStats !== 'reach' &&
      typeStats !== 'reach_twitter' &&
      typeStats !== 'plusOne' &&
      value !== 1
    ) {
      title += 's';
    }

    return value === undefined ? null : (
      <div style={statsCellStyle} key={typeStats}>
        <Text size={'large'} color={'black'}>
          {abbreviateNumber(value, 1)}
        </Text>
        <span>
          <Text size={'mini'}>{title}</Text>
          {isLinkedinClicks && (
            <Link
              href={
                'https://faq.buffer.com/article/181-why-does-linkedin-sometimes-show-a-different-number-for-clicks'
              }
              unstyled
            >
              *
            </Link>
          )}
        </span>
      </div>
    );
  };

  return (
    <div style={statsBarStyle}>
      {Object.keys(titles).map(typeStats => createElement(typeStats))}
    </div>
  );
};

PostStats.propTypes = {
  profileService: PropTypes.oneOf(SERVICE_NAMES),
};

export default PostStats;
