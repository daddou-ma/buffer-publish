import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Card, LinkifiedText, Text } from '@bufferapp/components';
import UserDetails from '../UserDetails';

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const RetweetPanel = ({
  retweetComment,
  retweetCommentLinks,
  basic,
  children,
  retweetProfile,
}) => (
  <Fragment>
    {retweetComment && (
      <Wrapper>
        {basic ? (
          <Text color="black" size="mini">
            {retweetComment}
          </Text>
        ) : (
          <LinkifiedText
            color="black"
            links={retweetCommentLinks}
            newTab
            size="mini"
            unstyled
          >
            {retweetComment}
          </LinkifiedText>
        )}
      </Wrapper>
    )}
    <Card color="off-white" reducedPadding>
      <Wrapper>
        <UserDetails {...retweetProfile} />
      </Wrapper>
      {children}
    </Card>
  </Fragment>
);

RetweetPanel.propTypes = {
  retweetProfile: PropTypes.shape({
    avatarUrl: PropTypes.string,
    handle: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  retweetComment: PropTypes.string,
  retweetCommentLinks: PropTypes.arrayOf(
    PropTypes.shape({
      rawString: PropTypes.string,
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
    })
  ),
  basic: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

RetweetPanel.defaultProps = {
  basic: false,
  retweetComment: undefined,
  retweetCommentLinks: [],
};

export default RetweetPanel;
