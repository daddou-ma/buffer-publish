import { useTranslation } from 'react-i18next';

export const URLS = {
  SIGN_UP_URL: 'https://buffer.com/pricing/publish',
  SUPPORT_URL: 'https://support.buffer.com/hc/en-us/articles/360063417793',
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
        onClick: () => window.location.assign(URLS.SIGN_UP_URL),
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
        onClick: () => window.location.assign(URLS.SUPPORT_URL),
      },
    },
    admin: {
      primaryAction: {
        label: t('missing-access-page.accessTypes.admin.primaryLabel'),
        onClick: () => window.location.assign(URLS.SIGN_UP_URL),
      },
      secondaryAction: {
        label: t('missing-access-page.accessTypes.admin.secondaryLabel'),
        onClick: () => window.location.assign(URLS.MARKETING_URL),
      },
    },
    nonAdmin: {
      secondaryAction: {
        label: t('missing-access-page.accessTypes.nonAdmin.secondaryLabel'),
        onClick: () => window.location.assign(URLS.CONTACT_SUPPORT_URL),
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

export const getAccessType = ({ isAdmin, hasOrgWithAccess }) => {
  if (isAdmin) {
    return hasOrgWithAccess ? 'adminWithOrgAccess' : 'admin';
  }
  return hasOrgWithAccess ? 'nonAdminWithOrgAccess' : 'nonAdmin';
};
