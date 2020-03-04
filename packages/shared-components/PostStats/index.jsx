import React from 'react';
import PropTypes from 'prop-types';
import { Text, Link } from '@bufferapp/components';
import { borderWidth } from '@bufferapp/components/style/border';
import { mystic } from '@bufferapp/components/style/color';
import { SERVICE_NAMES } from '@bufferapp/publish-constants';
import { abbreviateNumber } from '@bufferapp/publish-server/formatters/src';
import styled from 'styled-components';

const StatsContainer = styled.div`
  display: flex;
  background-color: #fcfcfc;
  margin-right: -1px;
`;

const StatsContainerStyled = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  border-top: ${borderWidth} solid ${mystic};
  padding: 8px;
  border-right: ${borderWidth} solid ${mystic};
  align-items: center;
  flex-direction: column;
`;

const LinkedInStatsLink = ({ typeStats, profileService }) => {
  if (!(typeStats === 'clicks' && profileService === 'linkedin')) {
    return null;
  }
  return (
    <Link
      href="https://faq.buffer.com/article/181-why-does-linkedin-sometimes-show-a-different-number-for-clicks"
      unstyled
    >
      *
    </Link>
  );
};

LinkedInStatsLink.propTypes = {
  typeStats: PropTypes.string,
  profileService: PropTypes.oneOf(SERVICE_NAMES),
};

LinkedInStatsLink.defaultProps = {
  profileService: null,
  typeStats: null,
};

const StatisticElement = ({
  typeStats,
  profileService,
  profileServiceType = null,
  showTwitterMentions,
  statistics,
  titles,
}) => {
  if (profileService === 'twitter') {
    if (
      typeStats === 'reach' ||
      (!showTwitterMentions && typeStats === 'mentions')
    ) {
      return null;
    }
  }
  let value = statistics[typeStats];
  let title = titles[typeStats];
  if (typeStats === 'reach_twitter' && profileService === 'twitter') {
    value = statistics.impressions;
  }
  const nonPluralTitles = ['reach', 'plusOne', 'reach_twitter'];
  if (value !== 1 && nonPluralTitles.indexOf(typeStats) < 0) {
    title += 's';
  }
  if (typeof value === 'undefined') {
    return null;
  }
  //
  // if (profileService === 'instagram' && profileServiceType === 'profile') {
  //   console.log('HEEEEEEEEERE');
  // }

  return (
    <StatsContainerStyled key={typeStats}>
      <Text size="large" color="black">
        {abbreviateNumber(value, 1)}
      </Text>
      <span>
        <Text size="mini">{title}</Text>
        <LinkedInStatsLink {...{ typeStats, profileService }} />
      </span>
    </StatsContainerStyled>
  );
};

StatisticElement.propTypes = {
  profileService: PropTypes.oneOf(SERVICE_NAMES),
  statistics: PropTypes.shape({
    impressions: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  }).isRequired,
  showTwitterMentions: PropTypes.bool,
  typeStats: PropTypes.string,
  titles: PropTypes.shape({}),
  profileServiceType: PropTypes.string,
};

StatisticElement.defaultProps = {
  profileService: null,
  profileServiceType: null,
  showTwitterMentions: false,
  titles: {},
  typeStats: null,
};

const PostStats = ({ statistics, profileService, showTwitterMentions, profileServiceType = null }) => {
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

  return (
    <StatsContainer>
      {Object.keys(titles).map(typeStats => (
        <StatisticElement
          {...{
            titles,
            typeStats,
            statistics,
            profileService,
            profileServiceType,
            showTwitterMentions,
          }}
        />
      ))}
    </StatsContainer>
  );
};

PostStats.propTypes = {
  profileService: PropTypes.oneOf(SERVICE_NAMES),
  statistics: PropTypes.shape({
    impressions: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  }).isRequired,
  showTwitterMentions: PropTypes.bool,
  profileServiceType: PropTypes.string,
};

PostStats.defaultProps = {
  profileService: null,
  profileServiceType: null,
  showTwitterMentions: false,
};

export default PostStats;
