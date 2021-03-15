import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@bufferapp/ui';
import { GlobalEmptyState } from '@bufferapp/publish-shared-components';
import { useTranslation, Trans } from 'react-i18next';
import { fontWeightMedium } from '@bufferapp/ui/style/fonts';
import { useUser } from '@bufferapp/app-shell';

import { getActions, getAccessType } from '../../utils';

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
  orgName,
  ownerEmail,
  switchOrganization,
  isAdmin,
}) => {
  const { t } = useTranslation();
  const user = useUser();
  const orgWithAccess = user?.organizations?.find(
    org => org.billing?.canAccessPublishing
  );
  const accessType = getAccessType({
    isAdmin,
    hasOrgWithAccess: !!orgWithAccess,
  });
  const orgNameWithAccess = orgWithAccess?.name;
  const description = getDescription({
    accessType,
    ownerEmail,
    orgNameWithAccess,
    orgIdWithAccess: orgWithAccess?.id,
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
  orgName: PropTypes.string.isRequired,
  ownerEmail: PropTypes.string.isRequired,
  switchOrganization: PropTypes.func.isRequired,
  isAdmin: PropTypes.func.isRequired,
};

export default MissingAccessPage;
