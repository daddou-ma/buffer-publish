import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  render,
  screen,
  waitFor,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import userEvent from '@testing-library/user-event';
import {
  buildUser,
  buildProfile,
  buildPost,
  buildPostWithImage,
  buildCampaign,
  buildOrganization,
} from '@bufferapp/publish-test-utils/generate-data';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import RPCClient from '@bufferapp/micro-rpc-client';
import '@bufferapp/publish-web/components/i18n';

import AppPages from './index';

const AppPagesWithRouter = withRouter(AppPages);

const organization = buildOrganization();
const profile1 = buildProfile({
  overrides: {
    organizationId: organization.id,
  },
});
const profile2 = buildProfile({
  overrides: {
    handle: 'test2',
    organizationId: organization.id,
  },
});

const appInitialState = {
  user: buildUser(),
  profileSidebar: {
    selectedProfileId: profile1.id,
    selectedProfile: profile1,
    profiles: [profile1, profile2],
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
const queuedPost1 = buildPost({
  overrides: {
    profileId: profile2.id,
    scheduledAt: getTime(day1),
    campaignDetails: campaign,
  },
});

const day2 = new Date('2020-01-02T11:00:00.000Z');
const queuedPost2 = buildPostWithImage({
  overrides: {
    profileId: profile2.id,
    scheduledAt: getTime(day2),
  },
});

const queuedPosts = [queuedPost1, queuedPost2];

const sentPost1 = buildPost({
  overrides: {
    profileId: profile2.id,
    scheduledAt: getTime(new Date('2019-12-27T11:00:00.000Z')),
  },
});

const sentPosts = [sentPost1];

const mockApiCalls = () => {
  jest.spyOn(RPCClient.prototype, 'call').mockImplementation(name => {
    if (name === 'getCounts') {
      return Promise.resolve({
        counts: {
          drafts_needs_approval_true: 0,
          drafts_needs_approval_false: 0,
        },
      });
    }
    if (name === 'queuedPosts') {
      return Promise.resolve({
        total: 1,
        updates: queuedPosts,
      });
    }
    if (name === 'getStoryGroups') {
      return Promise.resolve({
        total: 0,
        updates: [],
      });
    }
    if (name === 'getHashtagGroups') {
      return Promise.resolve({
        data: {
          snippets: [],
        },
      });
    }
    if (name === 'sentPosts') {
      return Promise.resolve({
        total: 1,
        updates: sentPosts,
      });
    }
    return Promise.resolve({ fake: 'yes' });
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

  test('should render main queue and navigate through other queues', async () => {
    mockApiCalls();

    render(
      <TestDragDropContainer>
        <AppPagesWithRouter />
      </TestDragDropContainer>,
      {
        initialState: appInitialState,
      }
    );

    expect(screen.queryByText(/share now/i)).toBeNull();
    expect(screen.getByText(profile1.handle)).toBeInTheDocument();

    const secondProfile = screen.getByText(profile2.handle);
    expect(secondProfile).toBeInTheDocument();

    userEvent.click(secondProfile);

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

    await waitFor(() => {
      expect(
        screen.getByText(/what would you like to share?/i)
      ).toBeInTheDocument();
    });

    const shareNowButtons = screen.getAllByText(/share now/i);
    await waitFor(() => {
      expect(shareNowButtons.length).toBe(2);
    });

    /*
      TODO: since profile2 is a Twitter profile, we shouldn't be calling
      neither getStoryGroups nor getHashtagGroups, unless is an IG profile
    */
    expect(rpcCall).toHaveBeenCalledWith('getStoryGroups', {
      isFetchingMore: false,
      profileId: profile2.id,
    });
    expect(rpcCall).toHaveBeenCalledWith('getHashtagGroups', {
      organizationId: profile2.organizationId,
    });
    expect(rpcCall).toHaveBeenCalledWith('getCounts', {
      profileId: profile2.id,
    });
    expect(rpcCall).toHaveBeenCalledWith('getLinkShortener', {
      profileId: profile2.id,
    });
    expect(rpcCall).toHaveBeenCalledWith('queuedPosts', {
      profileId: profile2.id,
      isFetchingMore: false,
      count: 300,
    });
    expect(rpcCall).toHaveBeenCalledWith('getCampaignsList', {});
    expect(rpcCall).toHaveBeenCalledTimes(6);

    userEvent.click(analyticsTab);

    await waitFor(() => {
      expect(screen.getByText(/your sent posts/i)).toBeInTheDocument();
    });
  });
});
