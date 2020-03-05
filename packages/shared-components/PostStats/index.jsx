import React from 'react';
import PropTypes from 'prop-types';
import { Text, Link } from '@bufferapp/components';
import { Tooltip } from '@bufferapp/ui';
import { borderWidth } from '@bufferapp/components/style/border';
import { mystic } from '@bufferapp/components/style/color';
import { SERVICE_NAMES } from '@bufferapp/publish-constants';
import { abbreviateNumber } from '@bufferapp/publish-server/formatters/src';
import styled from 'styled-components';
import InfoIcon from '@bufferapp/ui/Icon/Icons/Info';
import { gray, grayDark } from '@bufferapp/ui/style/colors';
import Button from '@bufferapp/analyze-shared-components/Button';

const StatsTitle = styled(Text)`
  color: ${grayDark};
`;

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

const TooltipWrapper = styled.div`
  display: inline-block;
  padding: 0 4px;
  bottom: -4px;
  position: relative;
`;

const TooltipMessage = ({ label }) => {
  return label ? (
    <TooltipWrapper>
      <Tooltip label={label} position="right">
        <InfoIcon color={gray} />
      </Tooltip>
    </TooltipWrapper>
  ) : null;
};

const ExternalLink = ({ link }) => {
  return link ? (
    <Link href={link} unstyled>
      *
    </Link>
  ) : null;
};

ExternalLink.propTypes = {
  link: PropTypes.string,
};

ExternalLink.defaultProps = {
  link: null,
};

const StatisticElement = ({ key, value, title, tooltip, link }) => {
  if (typeof value === 'undefined' || value === null) {
    return null;
  }

  return (
    <StatsContainerStyled key={key}>
      <Text size="large" color="black">
        {abbreviateNumber(value, 1)}
      </Text>
      <StatsTitle>
        <Text size="mini">{title}</Text>
        <TooltipMessage label={tooltip} />
        <ExternalLink link={link} />
      </StatsTitle>
    </StatsContainerStyled>
  );
};

StatisticElement.propTypes = {
  key: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  tooltip: PropTypes.string,
  link: PropTypes.string,
};

StatisticElement.defaultProps = {
  key: null,
  value: null,
  title: null,
  tooltip: null,
  link: null,
};

const PostStats = ({
  statistics,
  profileService,
  showTwitterMentions,
  profileServiceType = null,
}) => {
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
      {Object.keys(titles).map(typeStats => {
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

        const stat = {
          key: typeStats,
          value,
          title,
          tooltip:
            profileService === 'instagram' && profileServiceType === 'profile'
              ? `Instagram has deprecated statistics for non business accounts. Set up direct posting to start seeing these statistics from Instagram Business.`
              : null,
          link: !(typeStats === 'clicks' && profileService === 'linkedin')
            ? null
            : 'https://faq.buffer.com/article/181-why-does-linkedin-sometimes-show-a-different-number-for-clicks',
        };

        return (
          <StatisticElement
            key={stat.key}
            value={stat.value}
            title={stat.title}
            tooltip={stat.tooltip}
            link={stat.link}
            stat={stat}
          />
        );
      })}
    </StatsContainer>
  );
};

const stats = [
  {
    value: 1,
    title: 'string',
    tooltip: 'string',
    link: 'url',
  },
];

PostStats.propTypes = {
  profileService: PropTypes.oneOf(SERVICE_NAMES),
  statistics: PropTypes.shape({
    impressions: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
