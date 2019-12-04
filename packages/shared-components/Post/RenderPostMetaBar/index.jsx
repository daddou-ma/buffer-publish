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
  isSent,
  isPastReminder,
}) => {
  if (profileService === 'instagram' && locationName) {
    return (
      <InstagramPostMetaBar
        dragging={dragging}
        locationName={locationName}
        isSent={isSent}
        isPastReminder={isPastReminder}
      />
    );
  } else if (profileService === 'pinterest' && subprofileID) {
    /*  having a subprofileID is required, sourceUrl is not */
    const subprofile = subprofiles
      ? subprofiles.find(profile => profile.id === subprofileID)
      : null;
    return (
      <PinterestPostMetaBar
        dragging={dragging}
        boardName={subprofile ? subprofile.name : null}
        boardAvatarUrl={subprofile ? subprofile.avatar : null}
        sourceUrl={sourceUrl}
        isSent={isSent}
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
    })
  ),
  dragging: PropTypes.bool,
  isSent: PropTypes.bool,
  isPastReminder: PropTypes.bool,
};

export default RenderPostMetaBar;
