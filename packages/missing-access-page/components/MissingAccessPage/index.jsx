import React from 'react';
import PropTypes from 'prop-types';
import { GlobalEmptyState } from '@bufferapp/publish-shared-components';
import { useTranslation } from 'react-i18next';
import { getActions } from '../../utils';

const { t } = useTranslation();

const MissingAccessPage = ({
  accessType,
  orgName,
  ownerEmail,
  orgWithAccess,
  switchOrganization,
}) => {
  const actions = getActions({ accessType, switchOrganization });
  return (
    <GlobalEmptyState
      imageSrc="https://buffer-publish.s3.amazonaws.com/images/campaign-sent-1.png"
      altText={t('missingPageAccess.altText')}
      header={t('missingPageAccess.header')}
      description={t(`missingPageAccess[${accessType}].description`, {
        currentOrg: orgName,
        email: ownerEmail,
        orgWithAccess,
      })}
      primaryAction={actions.primaryAction}
      secondaryAction={actions.secondaryAction}
    />
  );
};

MissingAccessPage.propTypes = {
  accessType: PropTypes.string.isRequired,
};

export default MissingAccessPage;
