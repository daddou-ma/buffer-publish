import React from 'react';
import Icon from '../../Icon';

const SearchIcon = ({ color, size }) =>
  <Icon color={color} size={size}>
    <path d="M12.6063847,11.1921711 L15.7047831,14.2905695 C16.0964514,14.6822378 16.1001014,15.3136075 15.7068544,15.7068544 C15.3163301,16.0973787 14.6901188,16.1043323 14.2905695,15.7047831 L11.1921711,12.6063847 C10.0235906,13.4815965 8.5723351,14 7,14 C3.13400675,14 0,10.8659932 0,7 C0,3.13400675 3.13400675,0 7,0 C10.8659932,0 14,3.13400675 14,7 C14,8.5723351 13.4815965,10.0235906 12.6063847,11.1921711 Z M7,12 C9.76142375,12 12,9.76142375 12,7 C12,4.23857625 9.76142375,2 7,2 C4.23857625,2 2,4.23857625 2,7 C2,9.76142375 4.23857625,12 7,12 Z" />
  </Icon>;

SearchIcon.propTypes = {
  ...Icon.propTypes,
};

export default SearchIcon;
