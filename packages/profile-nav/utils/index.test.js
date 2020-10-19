import generateProfileTabs from './index';

describe('generateProfileTabs', () => {
  it('renders basic list of tabs if no especial features', () => {
    const result = generateProfileTabs({});
    expect(result).toEqual(['queue', 'analytics', 'settings', 'overview']);
  });

  it('renders complete list of tabs if features', () => {
    const profile = {
      service: 'instagram',
      isManager: true,
      shouldHideAdvancedAnalytics: true,
    };
    const organization = {
      hasApprovalFeature: true,
      hasDraftsFeature: true,
      hasGridFeature: true,
      hasStoriesFeature: true,
    };
    const result = generateProfileTabs({ profile, organization });
    expect(result).toEqual([
      'queue',
      'analytics',
      'settings',
      'pastReminders',
      'awaitingApproval',
      'drafts',
      'grid',
      'stories',
    ]);
  });
  it('includes drafts in the list, to display a paywall page', () => {
    const organization = {
      showShowDraftsPaywall: true,
    };
    const result = generateProfileTabs({ organization });
    expect(result).toEqual(expect.arrayContaining(['drafts']));
  });
  it('includes pending approval in the list for non managers', () => {
    const profile = {
      isManager: false,
    };
    const organization = {
      hasApprovalFeature: true,
    };
    const result = generateProfileTabs({ profile, organization });
    expect(result).toEqual(expect.arrayContaining(['pendingApproval']));
    expect(result).toEqual(expect.not.arrayContaining(['awaitingApproval']));
  });
});
