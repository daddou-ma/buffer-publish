import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Link, Text } from '@bufferapp/components';
import Post from '../Post';
import UpdateTextContent from '../UpdateTextContent';

const postContentStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const linkStyle = {
  paddingTop: '1rem',
};

const linkAttachmentContentStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const linkAttachmentTextStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  flexGrow: 1,
  minWidth: 0,
};

const linkUrlStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: 'rgba(50, 59, 67, 0.3)',
  margin: '0.25rem 1rem 1rem 0',
};

const LinkPost = ({
  service_geolocation_name: locationName,
  source_url: sourceUrl,
  subprofile_id: subprofileID,
  ...props
}) => {
  const { basic, links, linkAttachment, text } = props;
  const children = (
    <div style={postContentStyle}>
      <UpdateTextContent basic={basic} links={links} text={text} />
      <div style={linkStyle}>
        <Link href={linkAttachment.url} unstyled newTab>
          <Card noPadding>
            <div style={linkAttachmentContentStyle}>
              <Image
                src={linkAttachment.thumbnailUrl}
                width="15rem"
                minWidth="15rem"
                maxWidth="15rem"
                height="10rem"
                border="rounded"
                objectFit="cover"
              />
              <div style={linkAttachmentTextStyle}>
                <div>
                  <Text>{linkAttachment.title}</Text>
                </div>
                <div style={linkUrlStyle}>
                  <Text size="small" color="outerSpaceLight">
                    {linkAttachment.url}
                  </Text>
                </div>
                <div>
                  <Text size="small">{linkAttachment.description}</Text>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </div>
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

LinkPost.propTypes = {
  ...Post.commonPropTypes,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      rawString: PropTypes.string,
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
  linkAttachment: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    thumbnailUrl: PropTypes.string,
  }).isRequired,
  text: PropTypes.string.isRequired,
};

LinkPost.defaultProps = Post.defaultProps;

export default LinkPost;
