import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SensitiveData } from '@bufferapp/publish-shared-components';
import Avatar from '@bufferapp/ui/Avatar';
import { Text } from '@bufferapp/ui';

const AvatarContainer = styled.div`
  display: flex;
  padding: 8px 0px 13px;
`;

const AvatarNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 16px;
`;

const HeaderBar = ({
  selectedProfile,
}) => (
  <Fragment>
    <AvatarContainer>
      <Avatar
        src={selectedProfile.avatar_https}
        fallbackUrl="https://s3.amazonaws.com/buffer-ui/Default+Avatar.png"
        alt={selectedProfile.handle}
        size="medium"
        type="social"
        network={selectedProfile.service}
      />
      <AvatarNameWrapper>
        <SensitiveData>
          <Text type="p">
            {selectedProfile.handle}
          </Text>
        </SensitiveData>
      </AvatarNameWrapper>
    </AvatarContainer>
  </Fragment>
);

HeaderBar.propTypes = {
  selectedProfile: PropTypes.shape({
    avatar_https: PropTypes.string,
    service: PropTypes.string,
    handle: PropTypes.string,
  }).isRequired,
};

export default HeaderBar;
