import React from 'react';
import PropTypes from 'prop-types';
import { Search as SearchIcon } from '@bufferapp/ui/Icon';
import Search from '@bufferapp/ui/Search';
import Select from '@bufferapp/ui/Select';
import Avatar from '@bufferapp/ui/Avatar';
import styles from './styles.css';

const wrapperStyle = {
  width: '100%',
  margin: '7px 0px 15px 0px',
};

const searchBarWrapperStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  padding: '5px 8px 4px 8px',
  borderRadius: '4px',
  border: '1px solid #B8B8B8',
  color: '#636363',
  backgroundColor: '#FFFFFF',
  boxShadow: '2px 2px 0 2px transparent',
  transitionProperty: 'border-width, border-color, box-shadow',
  transitionDuration: '0.1s',
  transitionTimingFunction: 'ease-in',
};

const avatarStyle = {
  margin: '5px 11px 5px 0',
};

class ProfileSearch extends React.Component {
  onChange(onSearchChange, searchValue) {
    const { onSearchProfileChange } = this.props;
    onSearchProfileChange(searchValue);
    onSearchChange(searchValue);
  }

  getCustomProfiles(profiles) {
    const items = [];
    profiles.forEach(profile => {
      const itemProfile = {
        ...profile,
        title: profile.handle,
        icon: (
          <div className={styles.searchSidebar} style={avatarStyle}>
            <Avatar
              src={profile.avatarUrl}
              fallbackUrl="https://s3.amazonaws.com/buffer-ui/Default+Avatar.png"
              alt={profile.handle}
              size="small"
              type="social"
              network={profile.type}
            />
          </div>
        ),
      };
      items.push(itemProfile);
    });
    return items;
  }

  render() {
    const { profiles, handleSubmit, isSearchPopupVisible } = this.props;

    return (
      <div style={wrapperStyle}>
        <Select
          customButton={(onButtonClick, onSearchChange) => (
            <div style={searchBarWrapperStyle}>
              <SearchIcon />
              <Search
                onClick={onButtonClick}
                onChange={searchValue => {
                  this.onChange(onSearchChange, searchValue);
                }}
                height="small"
                placeholder="Search Profiles"
                isOpen
              />
            </div>
          )}
          isInputSearch
          fullWidth
          hideSearch
          selectPopupVisible={isSearchPopupVisible}
          capitalizeItemLabel={false}
          hasCustomAction={false}
          items={this.getCustomProfiles(profiles)}
          keyMap={{ id: 'id', title: 'handle' }}
          noResultsCustomMessage="No Profiles Found"
          onSelectClick={selectedProfile => handleSubmit({ selectedProfile })}
        />
      </div>
    );
  }
}

ProfileSearch.defaultProps = {
  profiles: [],
  handleSubmit: () => {},
  onSearchProfileChange: () => {},
  isSearchPopupVisible: false,
};

ProfileSearch.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      handle: PropTypes.string.isRequired,
    })
  ),
  handleSubmit: PropTypes.func,
  onSearchProfileChange: PropTypes.func,
  isSearchPopupVisible: PropTypes.bool,
};

export default ProfileSearch;
