import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UpdateMediaContent from '../UpdateMediaContent';
import UpdateAttachmentContent from '../UpdateAttachmentContent';
import UpdateTextContent from '../UpdateTextContent';
import RetweetPanel from '../RetweetPanel';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.isLink ? 'column' : 'row')};
`;

/* eslint-disable react/prop-types */
const Content = ({ isLink, isMedia, ...props }) => (
  <ContentWrapper isLink={isLink}>
    <UpdateTextContent {...props} />
    {isLink && <UpdateAttachmentContent {...props} />}
    {isMedia && <UpdateMediaContent {...props} />}
  </ContentWrapper>
);
/* eslint-enable react/prop-types */

const UpdateContent = ({ ...props }) => {
  const { type, retweetProfile } = props;
  const isMedia =
    type === 'image' || type === 'video' || type === 'multipleImage';
  const isLink = type === 'link';

  return (
    <React.Fragment>
      {retweetProfile ? (
        <RetweetPanel {...props}>
          <Content {...props} isLink={isLink} isMedia={isMedia} />
        </RetweetPanel>
      ) : (
        <Content {...props} isLink={isLink} isMedia={isMedia} />
      )}
    </React.Fragment>
  );
};

UpdateContent.propTypes = {
  type: PropTypes.oneOf(['text', 'image', 'multipleImage', 'link', 'video'])
    .isRequired,
  retweetProfile: PropTypes.shape({
    avatarUrl: PropTypes.string,
    handle: PropTypes.string,
    name: PropTypes.string,
  }),
};

UpdateContent.defaultProps = {
  retweetProfile: undefined,
};

export default UpdateContent;
