import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar, Text } from '@bufferapp/ui';
import { grayDark } from '@bufferapp/ui/style/colors';

const UserDetailsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RetweetHandleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  color: ${grayDark};
`;

const Handle = styled(Text)`
  margin: 0;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.2px;
`;

const UserDetails = ({ name, handle, avatarUrl }) => (
  <UserDetailsContainer>
    <Avatar src={avatarUrl} size="medium" alt={`avatar image of ${name}`} />
    <RetweetHandleContainer>
      <Text type="label" color="">
        {name}
      </Text>
      <Handle type="p">{handle}</Handle>
    </RetweetHandleContainer>
  </UserDetailsContainer>
);

UserDetails.propTypes = {
  name: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

export default UserDetails;
