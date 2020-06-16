import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  render,
  screen,
} from '@bufferapp/publish-test-utils/utils/custom-render';
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
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import RPCClient from '@bufferapp/micro-rpc-client';
import '@bufferapp/publish-web/components/i18n';

import AppPages from './index';

const AppPagesWithRouter = withRouter(AppPages);

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

const initialState = {
  user: buildUser(),
  profileSidebar: {
    selectedProfileId: profileTwitter.id,
    selectedProfile: profileTwitter,
    profiles: [profileTwitter, profileIG],
  },
};

// eslint-disable-next-line react/prop-types
const _TestContextContainer = ({ children }) => <>{children}</>;

const getTime = date => {
  const day = date || new Date();
  return Math.floor(day / 1000);
};

const campaign = buildCampaign();
const day1 = new Date('2020-01-01T11:00:00.000Z');
const queuedPost1 = buildPostWithImage({
  overrides: {
    profileId: profileIG.id,
    scheduledAt: getTime(day1),
    campaignDetails: campaign,
  },
});

const day2 = new Date('2020-01-02T11:00:00.000Z');
const queuedPost2 = buildPostWithImage({
  overrides: {
    profileId: profileIG.id,
    scheduledAt: getTime(day2),
  },
});

const queuedPosts = [queuedPost1, queuedPost2];

const sentPost = buildPostWithImage({
  overrides: {
    profileId: profileIG.id,
    scheduledAt: getTime(new Date('2019-12-27T11:00:00.000Z')),
  },
});

const sentPosts = [sentPost];

const storyGroup = buildStoryGroup({
  overrides: {
    profileId: profileIG.id,
    scheduledAt: getTime(new Date('2020-01-10T11:00:00.000Z')),
  },
});
const storyGroups = [storyGroup];

const pastReminder = buildPostWithImage({
  overrides: {
    profileId: profileIG.id,
    scheduledAt: getTime(new Date('2019-12-10T11:00:00.000Z')),
  },
});
const pastRemindersPosts = [pastReminder];

const draft = buildPostWithImage({
  overrides: {
    profileId: profileIG.id,
    scheduledAt: getTime(new Date('2019-12-12T11:00:00.000Z')),
  },
});
const draftPosts = [draft];

const mockApiCalls = () => {
  jest.spyOn(RPCClient.prototype, 'call').mockImplementation(name => {
    const result = {
      getCounts: {
        counts: {
          drafts_needs_approval_true: 0,
          drafts_needs_approval_false: 0,
        },
      },
      pastRemindersPosts: { total: 1, updates: pastRemindersPosts },
      queuedPosts: { total: 2, updates: queuedPosts },
      getStoryGroups: { total: 1, updates: storyGroups },
      getHashtagGroups: { data: { snippets: [] } },
      sentPosts: { total: 1, updates: sentPosts },
      gridPosts: { total: 0, updates: [] },
      draftPosts: { total: 1, drafts: draftPosts },
      default: { fake: 'yes' },
    };

    return Promise.resolve(result[name] || result.default);
  });
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
    Date.now = jest.fn(() => new Date('2020-01-01T10:10:00.000Z'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render proper tabs for non IG account', () => {
    render(
      <TestDragDropContainer>
        <AppPagesWithRouter />
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
    expect(pastRemindersTab).not.toBeInTheDocument();
    expect(shopGridTab).not.toBeInTheDocument();
  });

  it('should navigate through queues and render posts', async () => {
    mockApiCalls();

    render(
      <TestDragDropContainer>
        <AppPagesWithRouter />
      </TestDragDropContainer>,
      { initialState }
    );

    expect(screen.queryByText(/share now/i)).toBeNull();

    const twitterProfileSidebarBtn = screen.getByText(profileTwitter.handle);
    const igProfileSidebarBtn = screen.getByText(profileIG.handle);

    expect(twitterProfileSidebarBtn).toBeInTheDocument();
    expect(igProfileSidebarBtn).toBeInTheDocument();

    /* Main Queue tab asserts */
    userEvent.click(igProfileSidebarBtn);

    const {
      queueTab,
      analyticsTab,
      awaitingApprovalTab,
      draftsTab,
      settingsTab,
    } = tabMenuOptions();

    const storiesTab = screen.getByRole('link', { name: /stories/i });
    const pastRemindersTab = screen.getByRole('link', {
      name: /past reminders/i,
    });
    const shopGridTab = screen.getByRole('link', {
      name: /shop grid/i,
    });

    expect(queueTab).toBeInTheDocument();
    expect(storiesTab).toBeInTheDocument();
    expect(pastRemindersTab).toBeInTheDocument();
    expect(analyticsTab).toBeInTheDocument();
    expect(awaitingApprovalTab).toBeInTheDocument();
    expect(draftsTab).toBeInTheDocument();
    expect(shopGridTab).toBeInTheDocument();
    expect(settingsTab).toBeInTheDocument();

    expect(
      await screen.findByText(/what would you like to share?/i)
    ).toBeInTheDocument();

    const { dayButton, weekButton, monthButton } = mainQueueButtons();
    const today = screen.getByText(/today/i);
    const date = screen.getByText(/january 1\b/i);
    const slots = screen.getAllByText(/11:00 am/i);

    expect(dayButton).toBeInTheDocument();
    expect(weekButton).toBeInTheDocument();
    expect(monthButton).toBeInTheDocument();
    expect(today).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(slots.length).toBeGreaterThan(0);

    const shareNow = await screen.findAllByText(/share now/i);
    expect(shareNow.length).toBe(2);
    expect(screen.getByText(queuedPost1.postContent.text)).toBeInTheDocument();
    expect(screen.getByText(queuedPost2.postContent.text)).toBeInTheDocument();
    expect(screen.getByText(campaign.name)).toBeInTheDocument();

    expect(rpcCall).toHaveBeenCalledWith('getStoryGroups', {
      isFetchingMore: false,
      profileId: profileIG.id,
    });
    expect(rpcCall).toHaveBeenCalledWith('getHashtagGroups', {
      organizationId: profileIG.organizationId,
    });
    expect(rpcCall).toHaveBeenCalledWith('getCounts', {
      profileId: profileIG.id,
    });
    expect(rpcCall).toHaveBeenCalledWith('getLinkShortener', {
      profileId: profileIG.id,
    });
    expect(rpcCall).toHaveBeenCalledWith('queuedPosts', {
      profileId: profileIG.id,
      isFetchingMore: false,
      count: 300,
    });
    expect(rpcCall).toHaveBeenCalledWith('gridPosts', {
      profileId: profileIG.id,
    });
    expect(rpcCall).toHaveBeenCalledWith('getCampaignsList', {});
    expect(rpcCall).toHaveBeenCalledTimes(7);

    /* Stories tab asserts */
    userEvent.click(storiesTab);

    expect(
      await screen.findByText(/what would you like to add to your story?/i)
    ).toBeInTheDocument();

    const shareNowStories = await screen.findAllByText(/share now/i);
    expect(shareNowStories.length).toBe(1);
    expect(screen.getByText(/preview/i)).toBeInTheDocument();
    expect(screen.queryByText(/share again/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/send to mobile/i)).not.toBeInTheDocument();

    /* Past Reminders tab asserts */
    userEvent.click(pastRemindersTab);

    expect(screen.getByText(/recent past reminders/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /posts/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /stories/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByText(pastReminder.postContent.text)
    ).toBeInTheDocument();
    expect(screen.queryByText(/share again/i)).toBeInTheDocument();
    expect(screen.queryByText(/send to mobile/i)).toBeInTheDocument();
    expect(rpcCall).toHaveBeenCalledWith('pastRemindersPosts', {
      profileId: profileIG.id,
      isFetchingMore: false,
    });
    expect(rpcCall).toHaveBeenCalledTimes(8);

    /* Analytics tab asserts */
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
    expect(rpcCall).toHaveBeenCalledTimes(9);

    /* Drafts tab asserts */
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
    expect(rpcCall).toHaveBeenCalledTimes(10);
  });
});
