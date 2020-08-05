import React from 'react';
import PropTypes from 'prop-types';
import { fontWeightBold } from '@bufferapp/ui/style/fonts';
import { borderRadius } from '@bufferapp/ui/style/borders';
import { grayLight } from '@bufferapp/ui/style/colors';
import { Popover, Card } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';
import Avatar from '@bufferapp/ui/Avatar';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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

const PermissionText = styled(Text)`
  line-height: 32px;
  margin: 0;
`;

const ProfilesDisconnectedModal = ({
  disconnectedProfiles,
  reconnectProfile,
  hideModal,
  displayExtraMessage,
}) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Popover onOverlayClick={hideModal}>
        <Card reducedPadding>
          <ModalContainer>
            <Text type="h3">{t('profiles-disconnected-modal.headline')}</Text>
            {displayExtraMessage && (
              <ExtraMessageWithStyles type="p">
                {t('profiles-disconnected-modal.extraMessage.instagram')}
              </ExtraMessageWithStyles>
            )}
            <Text type="p">{t('profiles-disconnected-modal.body1')}</Text>
            <Text type="p">{t('profiles-disconnected-modal.body2')}</Text>
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
                {p.isAdmin && p.isAdmin === 'false' ? (
                  <PermissionText type="p">Contact an org admin</PermissionText>
                ) : (
                  <Button
                    disabled={p.reconnecting}
                    onClick={() =>
                      reconnectProfile({ id: p.id, service: p.service })
                    }
                    size="small"
                    type="primary"
                    label={
                      p.reconnecting
                        ? t('profiles-disconnected-modal.reconnecting')
                        : t('profiles-disconnected-modal.cta')
                    }
                  />
                )}
              </DisconnectedProfile>
            ))}
          </ModalContainer>
        </Card>
      </Popover>
    </Container>
  );
};

ProfilesDisconnectedModal.propTypes = {
  disconnectedProfiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  reconnectProfile: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  displayExtraMessage: PropTypes.bool,
};

ProfilesDisconnectedModal.defaultProps = {
  displayExtraMessage: false,
};

export default ProfilesDisconnectedModal;
