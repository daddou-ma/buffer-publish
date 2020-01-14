import React from 'react';
import PropTypes from 'prop-types';

import { Popover, Card } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';
import Avatar from '@bufferapp/ui/Avatar';

const ProfilesDisconnectedModal = ({
  translations,
  disconnectedProfiles,
  reconnectProfile,
  hideModal,
}) => (
  <div style={{ position: 'fixed', zIndex: '3000' }}>
    <Popover onOverlayClick={hideModal}>
      <Card>
        <div style={{ maxWidth: '470px', margin: '0 16px' }}>
          <Text type="h3">{translations.headline}</Text>
          <Text type="p">{translations.body1}</Text>
          <Text type="p">{translations.body2}</Text>
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
                <Avatar
                  src={p.avatar_https}
                  fallbackUrl="https://s3.amazonaws.com/buffer-ui/Default+Avatar.png"
                  alt={p.handle}
                  size="small"
                  type="social"
                  network={p.service}
                />
                <div style={{ marginLeft: '16px' }}>
                  <Text weight="medium">{p.formatted_username}</Text>
                </div>
              </div>
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
    })
  ).isRequired,
  reconnectProfile: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default ProfilesDisconnectedModal;
