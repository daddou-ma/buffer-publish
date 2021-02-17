import { useTranslation } from 'react-i18next';

export const URLS = {
  SIGN_UP_URL: 'https://buffer.com/pricing/publish',
  SUPPORT_URL: 'https://support.buffer.com/hc/en-us',
  MARKETING_URL: 'https://buffer.com/publish',
  CONTACT_SUPPORT_URL: 'https://support.buffer.com/hc/en-us/requests/new',
};

const getActionTypes = ({
  switchOrganization,
  orgNameWithAccess,
  orgIdWithAccess,
}) => {
  const { t } = useTranslation();
  return {
    adminWithOrgAccess: {
      primaryAction: {
        label: t(
          'missing-access-page.accessTypes.adminWithOrgAccess.primaryLabel',
          { orgNameWithAccess }
        ),
        onClick: () => switchOrganization(orgIdWithAccess),
      },
      secondaryAction: {
        label: t(
          'missing-access-page.accessTypes.adminWithOrgAccess.secondaryLabel'
        ),
        onClick: () =>
          window.location.assign('https://buffer.com/pricing/publish'), // TO-DO: confirm
      },
    },
    nonAdminWithOrgAccess: {
      primaryAction: {
        label: t(
          'missing-access-page.accessTypes.nonAdminWithOrgAccess.primaryLabel',
          { orgNameWithAccess }
        ),
        onClick: () => switchOrganization(orgIdWithAccess),
      },
      secondaryAction: {
        label: t(
          'missing-access-page.accessTypes.nonAdminWithOrgAccess.secondaryLabel'
        ),
        onClick: () => window.location.assign(),
      },
    },
    admin: {
      primaryAction: {
        label: t('missing-access-page.accessTypes.admin.primaryLabel'),
        onClick: () =>
          window.location.assign('https://buffer.com/pricing/publish'),
      },
      secondaryAction: {
        label: t('missing-access-page.accessTypes.admin.secondaryLabel'),
        onClick: () => window.location.assign('https://buffer.com/publish'),
      },
    },
    nonAdmin: {
      secondaryAction: {
        label: t('missing-access-page.accessTypes.nonAdmin.secondaryLabel'),
        onClick: () =>
          window.location.assign('https://support.buffer.com/hc/en-us'),
      },
    },
  };
};

export const getActions = ({
  accessType,
  switchOrganization,
  orgNameWithAccess,
  orgIdWithAccess,
}) => {
  const actions = getActionTypes({
    switchOrganization,
    orgNameWithAccess,
    orgIdWithAccess,
  });
  return actions[accessType];
};

export const getAccessType = (isAdmin, hasOrgWithAccess) => {
  if (isAdmin) {
    return hasOrgWithAccess ? 'adminWithOrgAccess' : 'admin';
  }
  return hasOrgWithAccess ? 'nonAdminWithOrgAccess' : 'nonAdmin';
};
