import React from 'react';
import PropTypes from 'prop-types';
import { Link, Divider } from '@bufferapp/components';
import { Row } from '@bufferapp/publish-shared-components';
import { Button, Text } from '@bufferapp/ui';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal';

const rowBlockStyle = {
  display: 'block',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '2rem',
  marginRight: '1rem',
};

const AppsManager = ({
  connectedApps,
  showModalAppId,
  showModalAppName,
  onRequestOpenModal,
  onRequestCloseModal,
  onConfirmRevokeApp,
  submitting,
}) => {
  const { t } = useTranslation();

  return (
    <section style={rowBlockStyle}>
      <div>
        <Text type="h2">Connected Apps</Text>
        <Text type="p">
          Get the most out of Buffer and share from your mobile, news reader, blog
          or anywhere!{' '}
          <Link newTab href="https://buffer.com/extras">
            Get More Apps →
          </Link>
        </Text>
        <Divider />
        {connectedApps.map(app => (
          <div key={app.id}>
            <Row>
              <Text type="h3">{app.name}</Text>
              <Button
                type="secondary"
                label="Revoke Access"
                onClick={() =>
                  onRequestOpenModal({ appId: app.id, appName: app.name })
                }
              />
            </Row>
            <Divider />
          </div>
        ))}
      </div>
      {showModalAppId !== null && (
        <Modal
          appId={showModalAppId}
          appName={showModalAppName}
          onCancelClick={onRequestCloseModal}
          onConfirmClick={onConfirmRevokeApp}
          submitting={submitting}
        />
      )}
    </section>
  );
};

AppsManager.propTypes = {
  connectedApps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  showModalAppId: PropTypes.string,
  showModalAppName: PropTypes.string,
  onRequestCloseModal: PropTypes.func.isRequired,
  onRequestOpenModal: PropTypes.func.isRequired,
  onConfirmRevokeApp: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

AppsManager.defaultProps = {
  connectedApps: [],
  showModalAppId: null,
  showModalAppName: '',
  submitting: false,
};

export default AppsManager;
