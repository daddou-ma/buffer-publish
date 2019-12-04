/**
 * Component that sits at the top of the stack of composers
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/ComposerHeader.css';
import { Services } from '../AppConstants';

const ComposerHeader = props => {
  const isAnyComposerExpanded = props.appState.expandedComposerId !== null;
  const multipleProfilesSelected =
    props.profiles.filter(profile => profile.isSelected).length > 1;
  let headerText;

  if (isAnyComposerExpanded) {
    const serviceName = props.appState.expandedComposerId;
    const service = Services.get(serviceName);
    const serviceProfileType = service.profileType;

    const selectedProfilesCountForExpanded = props.profiles.filter(
      profile => profile.service.name === serviceName && profile.isSelected
    ).length;

    headerText = `What do you want to share to ${selectedProfilesCountForExpanded} ${
      service.formattedName
    }
      ${
        selectedProfilesCountForExpanded > 1
          ? serviceProfileType.formattedPluralName
          : serviceProfileType.formattedName
      }?`;
  } else {
    headerText = multipleProfilesSelected
      ? 'Create your posts'
      : 'Create your post';
  }

  return <p className={styles.header}>{headerText}</p>;
};

ComposerHeader.propTypes = {
  appState: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired,
};

export default ComposerHeader;
