import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

const getActionTypes = switchOrganization => ({
  adminWithOrgAccess: {
    primaryAction: {
      label: t(`missingPageAccess.adminWithOtherOrgAccess.primaryLabel`),
      onClick: switchOrganization,
    },
    secondaryAction: {
      label: t(`missingPageAccess.adminWithOtherOrgAccess.secondaryLabel`),
      onClick: () => window.assign('https://buffer.com/pricing/publish'), // TO-DO: confirm
    },
  },
  nonAdminWithOrgAccess: {
    primaryAction: {
      label: t(`missingPageAccess.nonAdminWithOtherOrgAccess.primaryLabel`),
      onClick: switchOrganization,
    },
    secondaryAction: {
      label: t(`missingPageAccess.nonAdminWithOtherOrgAccess.secondaryLabel`),
      onClick: () => window.assign(),
    },
  },
  admin: {
    primaryAction: {
      label: t(`missingPageAccess.admin.primaryLabel`),
      onClick: () => window.assign('https://buffer.com/pricing/publish'),
    },
    secondaryAction: {
      label: t(`missingPageAccess.admin.secondaryLabel`),
      onClick: () => window.assign('https://buffer.com/publish'),
    },
  },
  nonAdmin: {
    secondaryAction: {
      label: t(`missingPageAccess.nonadmin.secondaryLabel`),
      onClick: () => window.assign('https://support.buffer.com/hc/en-us'),
    },
  },
});

export const getActions = ({ accessType, switchOrganization }) => {
  const actions = getActionTypes(switchOrganization);
  return actions[accessType];
};

export const getAccessType = (isAdmin, hasOrgWithAccess) => {
  if (isAdmin) {
    return hasOrgWithAccess ? 'adminWithOrgAccess' : 'admin';
  }
  return hasOrgWithAccess ? 'nonAdminWithOrgAccess' : 'nonAdmin';
};
