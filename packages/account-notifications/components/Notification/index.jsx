import React from 'react';
import PropTypes from 'prop-types';
import { Toggle } from '@bufferapp/components';
import { Row } from '@bufferapp/publish-shared-components';
import { Text } from '@bufferapp/ui';
import { useTranslation } from 'react-i18next';

const switchStyle = {
  flex: 0.3,
  whiteSpace: 'nowrap',
  margin: '0 5px 0 1rem',
  textAlign: 'right',
};

const Notification = ({
  title,
  description,
  onToggleClick,
  toggleIsEnabled,
  type,
}) => {
  const { t } = useTranslation();

  return (
    <Row>
      <div>
        <Text type="h3">{title}</Text>
        {description && <Text type="p">{description}</Text>}
      </div>
      <div style={switchStyle}>
        <Toggle
          onText={t('common.enabled')}
          offText={t('common.disabled')}
          on={toggleIsEnabled}
          size="mini"
          onClick={() => onToggleClick(!toggleIsEnabled, type)}
        />
      </div>
    </Row>
  );
};

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onToggleClick: PropTypes.func.isRequired,
  toggleIsEnabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

Notification.defaultProps = {
  description: null,
};

export default Notification;
