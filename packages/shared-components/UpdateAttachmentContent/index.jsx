import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Link, Text, Image } from '@bufferapp/components';

const LinkWrapper = styled.div`
  padding-top: 1rem;
`;

const LinkContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const LinkText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  flex-grow: 1;
  min-width: 0;
`;

const LinkUrl = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0.25rem 1rem 1rem 0;
`;

const UpdateAttachmentContent = ({ linkAttachment }) => (
  <LinkWrapper>
    <Link href={linkAttachment.url} unstyled newTab>
      <Card noPadding>
        <LinkContent>
          <Image
            src={linkAttachment.thumbnailUrl}
            width="15rem"
            minWidth="15rem"
            maxWidth="15rem"
            height="10rem"
            border="rounded"
            objectFit="cover"
          />
          <LinkText>
            <div>
              <Text>{linkAttachment.title}</Text>
            </div>
            <LinkUrl>
              <Text size="small">{linkAttachment.url}</Text>
            </LinkUrl>
            <div>
              <Text size="small">{linkAttachment.description}</Text>
            </div>
          </LinkText>
        </LinkContent>
      </Card>
    </Link>
  </LinkWrapper>
);

UpdateAttachmentContent.propTypes = {
  linkAttachment: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    thumbnailUrl: PropTypes.string,
  }),
};

UpdateAttachmentContent.defaultProps = {
  linkAttachment: {},
};

export default UpdateAttachmentContent;
