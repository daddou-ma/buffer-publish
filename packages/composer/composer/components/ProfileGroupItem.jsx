import React from 'react';
import PropTypes from 'prop-types';
import AppActionCreators from '../action-creators/AppActionCreators';
import Button from '../components/Button';

import styles from './css/ProfileGroupItem.css';

class ProfileGroupItem extends React.Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    selectedProfileGroupsIds: PropTypes.array.isRequired,
  };

  onClick = e => {
    const { group, selectedProfileGroupsIds } = this.props;
    const { id } = group;

    if (this.isSelected(id))
      AppActionCreators.unselectGroupProfiles(id, selectedProfileGroupsIds);
    else AppActionCreators.selectGroupProfiles(id);

    e.preventDefault();
  };

  isSelected = id => this.props.selectedProfileGroupsIds.includes(id);

  render() {
    const { group } = this.props;
    const profilesCount = group.profileIds.length;

    const groupItemClassName = [
      this.isSelected(group.id)
        ? styles.selectedGroupBtn
        : styles.unselectedGroupBtn,
      'js-disable-dragging',
    ].join(' ');

    return (
      <Button className={groupItemClassName} onClick={this.onClick}>
        <span className={styles.groupName}>{group.name}</span>
        <span className={styles.profilesCount}>{profilesCount}</span>
      </Button>
    );
  }
}

export default ProfileGroupItem;
