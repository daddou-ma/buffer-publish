import React from 'react';
import PropTypes from 'prop-types';

import { Popover, Card, Text, Button } from '@bufferapp/components';

import ProfileBadge from '@bufferapp/publish-profile-sidebar/components/ProfileBadge';

const ProfilesDisconnectedModal = ({
  translations,
  disconnectedProfiles,
  reconnectProfile,
  hideModal,
}) => (
  <div style={{ position: 'fixed', zIndex: '3000' }}>
    <Popover onOverlayClick={hideModal}>
      <Card>
        <div style={{ maxWidth: '580px', margin: '0 16px' }}>
          <Text size="large" weight="medium" color="black">
            {translations.headline}
          </Text>
          <div style={{ margin: '16px 0 16px' }}>
            <Text>{translations.body1}</Text>
          </div>
          <div style={{ margin: '16px 0 16px' }}>
            <Text>{translations.body2}</Text>
          </div>
          {disconnectedProfiles.map(p => (
            <div
              key={p.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                border: '1px solid #E0E0E0',
                padding: '8px',
                borderRadius: '4px',
                margin: '8px 0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ProfileBadge avatarUrl={p.avatar_https} type={p.service} />
                <div style={{ marginLeft: '16px' }}>
                  <Text weight="medium">{p.formatted_username}</Text>
                </div>
              </div>
              <Button
                disabled={p.reconnecting}
                onClick={() => reconnectProfile(p.id, p.service, p.isInstagramBusiness)}
                small
              >
                {p.reconnecting ? translations.reconnecting : translations.cta}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </Popover>
  </div>
);

ProfilesDisconnectedModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  disconnectedProfiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  reconnectProfile: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default ProfilesDisconnectedModal;
