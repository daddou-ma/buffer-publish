import React from 'react';
import PropTypes from 'prop-types';
import UpdateMediaContent from '../UpdateMediaContent';
import UpdateAttachmentContent from '../UpdateAttachmentContent';
import UpdateTextContent from '../UpdateTextContent';

const UpdateContent = ({ type, ...props }) => {
  const media =
    type === 'image' || type === 'video' || type === 'multipleImage';
  const { linkAttachment, basic, links, text } = props;
  return (
    <React.Fragment>
      <UpdateTextContent basic={basic} links={links} text={text} />
      {type === 'link' && (
        <UpdateAttachmentContent linkAttachment={linkAttachment} />
      )}
      {media && <UpdateMediaContent {...props} />}
    </React.Fragment>
  );
};

UpdateContent.propTypes = {
  type: PropTypes.oneOf(['text', 'image', 'multipleImage', 'link', 'video'])
    .isRequired,
  linkAttachment: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    thumbnailUrl: PropTypes.string,
  }),
};

UpdateContent.defaultProps = {
  linkAttachment: {},
};

export default UpdateContent;
