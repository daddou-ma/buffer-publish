import React from 'react';
import PropTypes from 'prop-types';
import { fontWeightBold } from '@bufferapp/ui/style/fonts';
import { borderRadius } from '@bufferapp/ui/style/borders';
import { grayLight } from '@bufferapp/ui/style/colors';


import { Popover, Card } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';
import Avatar from '@bufferapp/ui/Avatar';
import styled from 'styled-components';

const ExtraMessageWithStyles = styled(Text)`
  margin: 0;
  font-weight: ${fontWeightBold};
`;

const DisconnectedProfile = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${grayLight};
  padding: 8px;
  border-radius: ${borderRadius};
  margin: 8px 0;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarName = styled.div`
  margin-left: 16px;
`;

const ModalContainer = styled.div`
  max-width: 470px;
  margin: 0 16px;
`;

const Container = styled.div`
  position: fixed;
  z-index: 3000;
`;

const ProfilesDisconnectedModal = ({
  translations,
  disconnectedProfiles,
  reconnectProfile,
  hideModal,
  extraMessage,
}) => (
  <Container>
    <Popover onOverlayClick={hideModal}>
      <Card reducedPadding>
        <ModalContainer>
          <Text type="h3">{translations.headline}</Text>
          {extraMessage && (
            <ExtraMessageWithStyles type="p">
              {extraMessage}
            </ExtraMessageWithStyles>
          )}
          <Text type="p">{translations.body1}</Text>
          <Text type="p">{translations.body2}</Text>
          {disconnectedProfiles.map(p => (
            <DisconnectedProfile key={p.id}>
              <AvatarContainer>
                <Avatar
                  src={p.avatar_https}
                  fallbackUrl="https://s3.amazonaws.com/buffer-ui/Default+Avatar.png"
                  alt={p.handle}
                  size="small"
                  type="social"
                  network={p.service}
                />
                <AvatarName>
                  <Text>{p.formatted_username}</Text>
                </AvatarName>
              </AvatarContainer>
              <Button
                disabled={p.reconnecting}
                onClick={() =>
                  reconnectProfile({ id: p.id, service: p.service })
                }
                size="small"
                type="primary"
                label={
                  p.reconnecting ? translations.reconnecting : translations.cta
                }
              />
            </DisconnectedProfile>
          ))}
        </ModalContainer>
      </Card>
    </Popover>
  </Container>
);

ProfilesDisconnectedModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  disconnectedProfiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  reconnectProfile: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  extraMessage: PropTypes.string,
};

ProfilesDisconnectedModal.defaultProps = {
  extraMessage: null,
};

export default ProfilesDisconnectedModal;
