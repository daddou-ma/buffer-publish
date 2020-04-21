import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LinkifiedText, Text } from '@bufferapp/components';

const ContentTextWrapper = styled.span`
  padding-right: 1rem;
  flex-grow: 1;
`;

const UpdateTextContent = ({ basic, text, links }) => (
  <ContentTextWrapper>
    {basic ? (
      <Text color="black" size="mini" whitespace="pre-wrap">
        {text}
      </Text>
    ) : (
      <LinkifiedText
        color="black"
        links={links}
        size="mini"
        whitespace="pre-wrap"
        newTab
        unstyled
      >
        {text}
      </LinkifiedText>
    )}
  </ContentTextWrapper>
);

UpdateTextContent.propTypes = {
  basic: PropTypes.bool.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
      rawString: PropTypes.string,
    })
  ).isRequired,
  text: PropTypes.string.isRequired,
};

export default UpdateTextContent;
