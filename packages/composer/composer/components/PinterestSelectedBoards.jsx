import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/PinterestSelectedBoards.css';

class PinterestSelectedBoards extends React.Component {
  static propTypes = {
    profiles: PropTypes.array,
  };

  getSelectedBoard = () => {
    const selectedPinterestProfiles = this.props.profiles.filter(
      profile => profile.isSelected && profile.service.name === 'pinterest'
    );

    return selectedPinterestProfiles.reduce(
      (reducedSelectedSubprofiles, profile) => {
        const doesProfileHaveSelectedSubprofile =
          profile.selectedSubprofileId !== null;
        if (!doesProfileHaveSelectedSubprofile)
          return reducedSelectedSubprofiles;

        const getSubProfile = subprofile =>
          subprofile.id === profile.selectedSubprofileId;
        const selectedSubprofileForProfile = profile.subprofiles.find(
          getSubProfile
        );

        return reducedSelectedSubprofiles.concat(selectedSubprofileForProfile);
      },
      []
    );
  };

  render() {
    const selectedBoards = this.getSelectedBoard();
    const firstBoard = selectedBoards[0];

    const hasMultipleBoardsSelected = selectedBoards.length > 1;

    const getAvatar = avatar => {
      const defaultAvatarToOverride =
        'https://static.bufferapp.com/images/app/pin_2x.png';
      const defaultAvatar =
        'https://static.bufferapp.com/images/app/img_pin@2x.png';
      if (avatar === defaultAvatarToOverride) {
        return defaultAvatar;
      }
      return avatar;
    };
    const firstBoardAvatar = firstBoard ? getAvatar(firstBoard.avatar) : null;

    return (
      <div className={styles.selectedBoardsContainer}>
        <div className={styles.selectedBoardsLabel}>Pinning to:</div>
        <img
          className={styles.selectedBoardThumbnail}
          src={firstBoardAvatar}
          role="presentation"
        />
        {firstBoard && (
          <div className={styles.selectedBoardName}>{firstBoard.name}</div>
        )}

        {hasMultipleBoardsSelected && (
          <div className={styles.additionalBoard}>
            + {selectedBoards.length - 1} more
          </div>
        )}
      </div>
    );
  }
}

export default PinterestSelectedBoards;
