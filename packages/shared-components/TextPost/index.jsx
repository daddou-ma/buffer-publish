import React from 'react';
import PropTypes from 'prop-types';
import { LinkifiedText, Text } from '@bufferapp/components';
import Post from '../Post';

const postContentStyle = {
  display: 'flex',
};

const postContentTextStyle = {
  paddingRight: '1rem',
  flexGrow: 1,
};

const TextPost = ({
  service_geolocation_name: locationName,
  source_url: sourceUrl,
  subprofile_id: subprofileID,
  ...props
}) => {
  const { basic, text, links } = props;
  const children = (
    <div style={postContentStyle}>
      <span style={postContentTextStyle}>
        {basic ? (
          <Text size="mini" whitespace="pre-wrap" color="black">
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
            basic={basic}
          >
            {text}
          </LinkifiedText>
        )}
      </span>
    </div>
  );

  return (
    <Post
      {...props}
      locationName={locationName}
      sourceUrl={sourceUrl}
      subprofileID={subprofileID}
    >
      {children}
    </Post>
  );
};

TextPost.propTypes = {
  ...Post.commonPropTypes,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      rawString: PropTypes.string,
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
  text: PropTypes.string.isRequired,
};

TextPost.defaultProps = Post.defaultProps;

export default TextPost;
