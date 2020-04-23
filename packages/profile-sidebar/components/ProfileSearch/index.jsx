import React from 'react';
import PropTypes from 'prop-types';
import { Search as SearchIcon } from '@bufferapp/ui/Icon';
import Search from '@bufferapp/ui/Search';
import Select from '@bufferapp/ui/Select';
import Avatar from '@bufferapp/ui/Avatar';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import styles from './styles.css';

const Wrapper = styled.div`
  width: 100%;
  margin: 7px 0px 15px 0px;
`;

const AvatarStyle = styled.div`
  margin: 5px 11px 5px 0;
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 5px 8px 4px 8px;
  border-radius: 4px;
  border: 1px solid #b8b8b8;
  color: #636363;
  background-color: #ffffff;
  box-shadow: 2px 2px 0 2px transparent;
  transition-property: border-width, border-color, box-shadow;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
`;

const getCustomProfiles = profiles => {
  const items = [];
  profiles.forEach(profile => {
    const itemProfile = {
      ...profile,
      title: profile.handle,
      icon: (
        <AvatarStyle className={styles.searchSidebar}>
          <Avatar
            src={profile.avatarUrl}
            fallbackUrl="https://s3.amazonaws.com/buffer-ui/Default+Avatar.png"
            alt={profile.handle}
            size="small"
            type="social"
            network={profile.type}
          />
        </AvatarStyle>
      ),
    };
    items.push(itemProfile);
  });
  return items;
};

const CustomButton = ({
  t,
  onSearchChange,
  onButtonClick,
  onSearchProfileChange,
}) => {
  const onChange = searchValue => {
    onSearchProfileChange(searchValue);
    onSearchChange(searchValue);
  };

  return (
    <SearchBarWrapper>
      <SearchIcon />
      <Search
        onClick={onButtonClick}
        onChange={searchValue => {
          onChange(searchValue);
        }}
        height="small"
        placeholder={t('profile-sidebar.searchProfiles')}
        isOpen
      />
    </SearchBarWrapper>
  );
};

CustomButton.propTypes = {
  t: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  onSearchProfileChange: PropTypes.func.isRequired,
};

const ProfileSearch = ({
  profiles,
  handleSubmit,
  isSearchPopupVisible,
  onSearchProfileChange,
}) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Select
        customButton={(onButtonClick, onSearchChange) => (
          <CustomButton
            t={t}
            onButtonClick={onButtonClick}
            onSearchChange={onSearchChange}
            onSearchProfileChange={onSearchProfileChange}
          />
        )}
        isInputSearch
        fullWidth
        hideSearch
        selectPopupVisible={isSearchPopupVisible}
        capitalizeItemLabel={false}
        hasCustomAction={false}
        items={getCustomProfiles(profiles)}
        keyMap={{ id: 'id', title: 'handle' }}
        noResultsCustomMessage={t('profile-sidebar.noProfilesFound')}
        onSelectClick={selectedProfile => handleSubmit({ selectedProfile })}
      />
    </Wrapper>
  );
};

ProfileSearch.defaultProps = {
  profiles: [],
  isSearchPopupVisible: false,
};

ProfileSearch.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      handle: PropTypes.string.isRequired,
    })
  ),
  handleSubmit: PropTypes.func.isRequired,
  onSearchProfileChange: PropTypes.func.isRequired,
  isSearchPopupVisible: PropTypes.bool,
};

export default ProfileSearch;
