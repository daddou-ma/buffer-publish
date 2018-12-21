import React from 'react';
import PropTypes from 'prop-types';
import InstagramPostMetaBar from '../InstagramPostMetaBar';
import PinterestPostMetaBar from '../PinterestPostMetaBar';

const RenderPostMetaBar = ({
  profileService,
  locationName,
  sourceUrl,
  subprofileID,
  subprofiles,
  dragging,
}) => {
  if (profileService === 'instagram' && locationName !== null) {
    return (
      <InstagramPostMetaBar
        dragging={dragging}
        locationName={locationName}
      />
    );
  } else if (profileService === 'pinterest' && subprofileID !== null) {
    /*  having a subprofileID is required, sourceUrl is not */
    const subprofile = subprofiles.find((profile => profile.id === subprofileID));
    return (
      <PinterestPostMetaBar
        dragging={dragging}
        boardName={subprofile.name}
        boardAvatarUrl={subprofile.avatar}
        sourceUrl={sourceUrl}
      />
    );
  }
  return null;
};

RenderPostMetaBar.propTypes = {
  profileService: PropTypes.string,
  locationName: PropTypes.string,
  sourceUrl: PropTypes.string,
  subprofileID: PropTypes.string,
  subprofiles: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ),
  dragging: PropTypes.bool,
  isSent: PropTypes.bool,
};

export default RenderPostMetaBar;
