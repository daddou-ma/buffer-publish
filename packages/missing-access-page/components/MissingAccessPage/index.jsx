import React from 'react';
import PropTypes from 'prop-types';
import { GlobalEmptyState } from '@bufferapp/publish-shared-components';
import { useTranslation } from 'react-i18next';
import { getActions } from '../../utils';

const MissingAccessPage = ({
  accessType,
  orgName,
  orgNameWithAccess = null,
  orgIdWithAccess,
  ownerEmail,
  switchOrganization,
}) => {
  const { t } = useTranslation();
  const actions = getActions({
    accessType,
    switchOrganization,
    orgNameWithAccess,
    orgIdWithAccess,
  });
  return (
    <GlobalEmptyState
      imageSrc="https://buffer-publish.s3.amazonaws.com/images/campaign-sent-1.png"
      altText={t('missing-access-page.altText')}
      header={t('missing-access-page.heading')}
      description={t(
        `missing-access-page.accessTypes.${accessType}.description`,
        {
          orgName,
          orgNameWithAccess,
          ownerEmail,
        }
      )}
      primaryAction={actions.primaryAction}
      secondaryAction={actions.secondaryAction}
    />
  );
};

MissingAccessPage.propTypes = {
  accessType: PropTypes.string.isRequired,
  orgName: PropTypes.string.isRequired,
  orgNameWithAccess: PropTypes.string,
  ownerEmail: PropTypes.string.isRequired,
  switchOrganization: PropTypes.func.isRequired,
};

export default MissingAccessPage;
