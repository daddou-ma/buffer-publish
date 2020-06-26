import React from 'react';
import {
  render,
  screen,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import { getTime } from '@bufferapp/publish-utils/date';
import userEvent from '@testing-library/user-event';
import {
  buildUser,
  buildProfile,
  buildIGProfile,
  buildPostWithImage,
  buildCampaign,
  buildOrganization,
  buildStoryGroup,
} from '@bufferapp/publish-test-utils/generate-data';
import setupRpcMocks from '@bufferapp/publish-test-utils/utils/setupRpcMocks';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import RPCClient from '@bufferapp/micro-rpc-client';
import '@bufferapp/publish-web/components/i18n';

import AppPages from './index';

const organization = buildOrganization();
const profileTwitter = buildProfile({
  overrides: {
    organizationId: organization.id,
  },
});
const profileIG = buildIGProfile({
  overrides: {
    organizationId: organization.id,
  },
});

const profiles = [profileTwitter, profileIG];
const initialState = {
  user: buildUser(),
  publishProfiles: profiles,
  organizations: { selected: { id: organization.id } },
  profileSidebar: {
    selectedProfileId: profileTwitter.id,
    selectedProfile: profileTwitter,
    profiles,
  },
};

// eslint-disable-next-line react/prop-types
const _TestContextContainer = ({ children }) => <>{children}</>;

const campaign = buildCampaign();

const queuedPost1 = buildPostWithImage({
  overrides: {
    profileId: profileIG.id,
    profile_service: 'instagram',
    due_at: getTime(new Date('2020-01-01T11:00:00.000Z')),
    scheduledAt: getTime(new Date('2020-01-01T11:00:00.000Z')),
    campaignDetails: campaign,
    commentEnabled: true,
    commentText: 'First comment',
  },
});

const queuedPost2 = buildPostWithImage({
  overrides: {
    profileId: profileIG.id,
    due_at: getTime(new Date('2020-01-02T11:00:00.000Z')),
    scheduledAt: getTime(new Date('2020-01-02T11:00:00.000Z')),
  },
});

const sentPost = buildPostWithImage({
  overrides: {
    profileId: profileIG.id,
    scheduledAt: getTime(new Date('2019-12-27T11:00:00.000Z')),
  },
});

const storyGroup = buildStoryGroup({
  overrides: {
    profileId: profileIG.id,
    scheduledAt: getTime(new Date('2020-01-10T11:00:00.000Z')),
  },
});

const pastReminder1 = buildPostWithImage({
  overrides: {
    profileId: profileIG.id,
    due_at: getTime(new Date('2019-12-10T11:00:00.000Z')),
    scheduledAt: getTime(new Date('2019-12-10T11:00:00.000Z')),
  },
});

const pastReminder2 = buildPostWithImage({
  overrides: {
    profileId: profileIG.id,
    due_at: getTime(new Date('2019-12-20T11:00:00.000Z')),
    scheduledAt: getTime(new Date('2019-12-20T11:00:00.000Z')),
  },
});

const pastStoryGroup = buildStoryGroup({
  overrides: {
    profileId: profileIG.id,
    scheduledAt: getTime(new Date('2020-01-18T11:00:00.000Z')),
  },
});

const draft = buildPostWithImage({
  overrides: {
    profileId: profileIG.id,
    scheduledAt: getTime(new Date('2019-12-12T11:00:00.000Z')),
  },
});

const mockedRpcResponses = {
  pastRemindersPosts: { total: 1, updates: [pastReminder1, pastReminder2] },
  getPastRemindersStories: { total: 1, updates: [pastStoryGroup] },
  queuedPosts: { total: 2, updates: [queuedPost2, queuedPost1] },
  getStoryGroups: { total: 1, updates: [storyGroup] },
  getHashtagGroups: { data: { snippets: [] } },
  sentPosts: { total: 1, updates: [sentPost] },
  gridPosts: { total: 0, updates: [] },
  draftPosts: { total: 1, drafts: [draft] },
  getCampaign: campaign,
  getLinkShortener: { foo: 'bar' },
  getCounts: {
    counts: {
      drafts_needs_approval_true: 0,
      drafts_needs_approval_false: 0,
    },
  },
  getCampaignsList: { data: [campaign] },
  default: { fake: 'yes' },
};

const tabMenuOptions = () => {
  const queueTab = screen.getByRole('link', { name: /queue/i });
  const analyticsTab = screen.getByRole('link', { name: /analytics/i });
  const awaitingApprovalTab = screen.getByRole('link', {
    name: /awaiting approval/i,
  });
  const draftsTab = screen.getByRole('link', { name: /drafts/i });
  const settingsTab = screen.getByRole('link', { name: /settings/i });

  return {
    queueTab,
    analyticsTab,
    awaitingApprovalTab,
    draftsTab,
    settingsTab,
  };
};

const mainQueueButtons = () => {
  const dayButton = screen.getByRole('button', {
    name: /day/i,
  });
  const weekButton = screen.getByRole('button', {
    name: /week/i,
  });
  const monthButton = screen.getByRole('button', {
    name: /month/i,
  });

  return {
    dayButton,
    weekButton,
    monthButton,
  };
};

describe('AppPages | user interaction', () => {
  const rpcCall = RPCClient.prototype.call;
  const TestDragDropContainer = DragDropContext(TestBackend)(
    _TestContextContainer
  );

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    Date.now = jest.fn(() => new Date('2020-01-01T10:10:00.000Z'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders proper tabs for non IG account', () => {
    setupRpcMocks(mockedRpcResponses);

    render(
      <TestDragDropContainer>
        <AppPages />
      </TestDragDropContainer>,
      { initialState }
    );

    const {
      queueTab,
      analyticsTab,
      awaitingApprovalTab,
      draftsTab,
      settingsTab,
    } = tabMenuOptions();

    expect(queueTab).toBeInTheDocument();
    expect(analyticsTab).toBeInTheDocument();
    expect(awaitingApprovalTab).toBeInTheDocument();
    expect(draftsTab).toBeInTheDocument();
    expect(settingsTab).toBeInTheDocument();

    const storiesTab = screen.queryByRole('link', { name: /stories/i });
    const shopGridTab = screen.queryByRole('link', { name: /shop grid/i });
    const pastRemindersTab = screen.queryByRole('link', {
      name: /past reminders/i,
    });
    expect(storiesTab).not.toBeInTheDocument();
    expect(shopGridTab).not.toBeInTheDocument();
    expect(pastRemindersTab).not.toBeInTheDocument();
  });

  it('renders the main queue and queued posts on profile selection', async () => {
    const {
      getStoryGroups,
      getHashtagGroups,
      getCounts,
      getLinkShortener,
      queuedPosts,
      gridPosts,
      getCampaignsList,
    } = setupRpcMocks(mockedRpcResponses);

    render(
      <TestDragDropContainer>
        <AppPages />
      </TestDragDropContainer>,
      { initialState }
    );

    expect(screen.queryByText(/share now/i)).toBeNull();
    const twitterProfileSidebarBtn = screen.getByText(profileTwitter.handle);
    const igProfileSidebarBtn = screen.getByText(profileIG.handle);
    expect(twitterProfileSidebarBtn).toBeInTheDocument();
    expect(igProfileSidebarBtn).toBeInTheDocument();

    userEvent.click(igProfileSidebarBtn);

    const storiesTab = screen.getByRole('link', { name: /stories/i });
    const pastRemindersTab = screen.getByRole('link', {
      name: /past reminders/i,
    });
    const shopGridTab = screen.getByRole('link', {
      name: /shop grid/i,
    });

    expect(storiesTab).toBeInTheDocument();
    expect(pastRemindersTab).toBeInTheDocument();
    expect(shopGridTab).toBeInTheDocument();

    /* Main Queue tab asserts */
    expect(
      await screen.findByText(/what would you like to share?/i)
    ).toBeInTheDocument();

    const { dayButton, weekButton, monthButton } = mainQueueButtons();
    expect(dayButton).toBeInTheDocument();
    expect(weekButton).toBeInTheDocument();
    expect(monthButton).toBeInTheDocument();

    const today = screen.getByText(/today/i);
    const date = screen.getByText(/january 1\b/i);
    const slots = screen.getAllByText(/11:00 am/i);
    expect(today).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(slots.length).toBeGreaterThan(0);

    expect(await screen.findAllByText(/share now/i)).toHaveLength(2);
    expect(
      await screen.findAllByTitle(/post includes a comment/i)
    ).toHaveLength(1);
    expect(screen.getByText(queuedPost1.postContent.text)).toBeInTheDocument();
    expect(screen.getByText(queuedPost2.postContent.text)).toBeInTheDocument();

    expect(getStoryGroups).toHaveBeenCalledWith({
      isFetchingMore: false,
      profileId: profileIG.id,
    });
    expect(getHashtagGroups).toHaveBeenCalledWith({
      organizationId: profileIG.organizationId,
    });
    expect(getCounts).toHaveBeenCalledWith({
      profileId: profileIG.id,
    });
    expect(getLinkShortener).toHaveBeenCalledWith({
      profileId: profileIG.id,
    });
    expect(queuedPosts).toHaveBeenCalledWith({
      profileId: profileIG.id,
      isFetchingMore: false,
      count: 300,
    });
    expect(gridPosts)
      .toHaveBeenCalledWith({
        profileId: profileIG.id,
      })
      .toHaveBeenCalledTimes(2);
    expect(getCampaignsList).toHaveBeenCalledWith({});
    // expect(rpcCall).toHaveBeenCalledTimes(12);
  });

  it('navigates to a campaign on tag click from main queue', async () => {
    const { getCampaign } = setupRpcMocks(mockedRpcResponses);

    render(
      <TestDragDropContainer>
        <AppPages />
      </TestDragDropContainer>,
      { initialState }
    );

    userEvent.click(screen.getByText(profileIG.handle));
    const campaignTag = await screen.findByRole('button', {
      name: campaign.name,
    });
    expect(campaignTag).toBeInTheDocument();

    userEvent.click(campaignTag);
    expect(
      await screen.findByRole('heading', { name: campaign.name })
    ).toBeInTheDocument();

    expect(getCampaign).toHaveBeenCalledWith({
      campaignId: campaign.id,
      fullItems: true,
      past: false,
    });
  });

  it.only('navigates to Stories tab and renders stories', async () => {
    const { getStoryGroups } = setupRpcMocks(mockedRpcResponses);

    render(
      <TestDragDropContainer>
        <AppPages />
      </TestDragDropContainer>,
      { initialState }
    );

    userEvent.click(screen.getByText(profileIG.handle));

    /* Stories tab asserts */
    const storiesTab = screen.getByRole('link', { name: /stories/i });
    userEvent.click(storiesTab);

    expect(
      await screen.findByText(/what would you like to add to your story?/i)
    ).toBeInTheDocument();
    const storiesSlots = await screen.findAllByText(/add to story/i);
    expect(storiesSlots.length).toBeGreaterThan(0);

    expect(
      await screen.findAllByRole('button', { name: /share now/i })
    ).toHaveLength(1);
    expect(
      await screen.findAllByRole('button', { name: /preview/i })
    ).toHaveLength(1);
    expect(
      await screen.findAllByRole('button', { name: /delete/i })
    ).toHaveLength(1);
    expect(screen.queryByText(/share again/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/send to mobile/i)).not.toBeInTheDocument();

    expect(getStoryGroups).toHaveBeenCalledTimes(2);
  });

  it('navigates to Past Reminders tab renders reminders', async () => {
    mockApiCalls();

    render(
      <TestDragDropContainer>
        <AppPages />
      </TestDragDropContainer>,
      { initialState }
    );

    userEvent.click(screen.getByText(profileIG.handle));

    /* Past Reminders tab asserts */
    const pastRemindersTab = screen.queryByRole('link', {
      name: /past reminders/i,
    });
    userEvent.click(pastRemindersTab);

    const storiesSubTab = screen.getByRole('button', { name: /stories/i });
    expect(screen.getByText(/recent past reminders/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /posts/i })).toBeInTheDocument();
    expect(storiesSubTab).toBeInTheDocument();

    const reminders = await screen.findAllByTestId('post');
    expect(reminders).toHaveLength(2);
    /* Verifying the posts order */
    expect(reminders[0]).toHaveTextContent(pastReminder2.postContent.text);
    expect(reminders[1]).toHaveTextContent(pastReminder1.postContent.text);
    expect(await screen.findAllByText(/share again/i)).toHaveLength(2);
    expect(await screen.findAllByText(/send to mobile/i)).toHaveLength(2);
    expect(rpcCall).toHaveBeenCalledWith('pastRemindersPosts', {
      profileId: profileIG.id,
      isFetchingMore: false,
    });
    expect(rpcCall).toHaveBeenCalledTimes(13);

    userEvent.click(storiesSubTab);

    expect(await screen.findAllByText(/share again/i)).toHaveLength(1);
    expect(await screen.findAllByText(/send to mobile/i)).toHaveLength(1);
    expect(screen.getByText(/preview/i)).toBeInTheDocument();
    expect(rpcCall).toHaveBeenCalledWith('getPastRemindersStories', {
      profileId: profileIG.id,
      isFetchingMore: false,
    });
    expect(rpcCall).toHaveBeenCalledTimes(14);
  });

  it('navigates to Analytics tab and renders sent posts', async () => {
    mockApiCalls();

    render(
      <TestDragDropContainer>
        <AppPages />
      </TestDragDropContainer>,
      { initialState }
    );

    userEvent.click(screen.getByText(profileIG.handle));

    /* Analytics tab asserts */
    const analyticsTab = screen.queryByRole('link', {
      name: /analytics/i,
    });
    userEvent.click(analyticsTab);

    expect(await screen.findByText(/your sent posts/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /posts/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByText(sentPost.postContent.text)).toBeInTheDocument();
    expect(screen.queryByText(/share again/i)).toBeInTheDocument();
    expect(screen.queryByText(/send to mobile/i)).not.toBeInTheDocument();
    expect(rpcCall).toHaveBeenCalledWith('sentPosts', {
      profileId: profileIG.id,
      isFetchingMore: false,
    });
    expect(rpcCall).toHaveBeenCalledTimes(13);
  });

  it('navigates to Drafts tab and renders drafts posts', async () => {
    mockApiCalls();

    render(
      <TestDragDropContainer>
        <AppPages />
      </TestDragDropContainer>,
      { initialState }
    );

    userEvent.click(screen.getByText(profileIG.handle));

    /* Drafts tab asserts */
    const draftsTab = screen.queryByRole('link', {
      name: /drafts/i,
    });
    userEvent.click(draftsTab);

    expect(await screen.findByText(/create a new draft/i)).toBeInTheDocument();
    expect(screen.getByText(draft.postContent.text)).toBeInTheDocument();
    expect(screen.queryByText(/add to queue/i)).toBeInTheDocument();
    expect(screen.queryByText(/share again/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/send to mobile/i)).not.toBeInTheDocument();
    expect(rpcCall).toHaveBeenCalledWith('draftPosts', {
      profileId: profileIG.id,
      isFetchingMore: false,
      needsApproval: false,
      clear: true,
    });
    expect(rpcCall).toHaveBeenCalledTimes(12);
  });
});
