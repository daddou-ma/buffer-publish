import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@bufferapp/ui';
import { GlobalEmptyState } from '@bufferapp/publish-shared-components';
import { useTranslation, Trans } from 'react-i18next';
import { fontWeightMedium } from '@bufferapp/ui/style/fonts';

import { getActions } from '../../utils';

const BoldText = styled.span`
  font-weight: ${fontWeightMedium};
`;
// using Trans component for mark up content
// https://github.com/arkross/arkross.github.io/wiki/Using-react-i18next-Trans-Component
const getDescription = ({
  accessType,
  ownerEmail,
  orgNameWithAccess,
  orgName,
}) => {
  const key = `missing-access-page.accessTypes.${accessType}.description`;
  const emailLink = <Link href={`mailto:${ownerEmail}`}>{{ ownerEmail }}</Link>;
  const boldOrgNameWithAccess = <BoldText>{{ orgNameWithAccess }}</BoldText>;
  const markupContent =
    accessType === 'nonAdmin' ? emailLink : boldOrgNameWithAccess;
  return (
    <Trans
      i18nKey={key}
      orgName={orgName}
      orgNameWithAccess={orgNameWithAccess}
      ownerEmail={ownerEmail}
    >
      Your organization <BoldText>{{ orgName }}</BoldText> ...your other organization
      {markupContent}
    </Trans>
  );
};

const MissingAccessPage = ({
  accessType,
  orgName,
  orgNameWithAccess = null,
  orgIdWithAccess = null,
  ownerEmail,
  switchOrganization,
}) => {
  const { t } = useTranslation();
  const description = getDescription({
    accessType,
    ownerEmail,
    orgNameWithAccess,
    orgName,
  });
  const actions = getActions({
    accessType,
    switchOrganization,
    orgNameWithAccess,
    orgIdWithAccess,
  });

  return (
    <GlobalEmptyState
      imageSrc="https://buffer-publish.s3.amazonaws.com/images/illustration-publishing.png"
      altText={t('missing-access-page.altText')}
      header={t('missing-access-page.heading')}
      description={description}
      primaryAction={actions.primaryAction}
      secondaryAction={actions.secondaryAction}
    />
  );
};

MissingAccessPage.propTypes = {
  accessType: PropTypes.string.isRequired,
  orgName: PropTypes.string.isRequired,
  orgNameWithAccess: PropTypes.string,
  orgIdWithAccess: PropTypes.string,
  ownerEmail: PropTypes.string.isRequired,
  switchOrganization: PropTypes.func.isRequired,
};

export default MissingAccessPage;
