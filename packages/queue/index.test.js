import React from 'react';
import {
  render,
  screen,
  waitFor,
  cleanup,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { getTime } from '@bufferapp/publish-utils/date';
import {
  buildUser,
  buildProfile,
  buildPost,
  buildPostWithImage,
  buildCampaign,
} from '@bufferapp/publish-test-utils/generate-data';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import RPCClient from '@bufferapp/micro-rpc-client';
import '@bufferapp/publish-web/components/i18n';

import QueuedPosts from './index';
import RetiringProfileBanner from './components/RetiringProfileBanner/index';

const profile = buildProfile();
const initialState = {
  queue: {
    byProfileId: { [profile.id]: { posts: [], page: 0, loading: false } },
    editMode: false,
    showComposer: false,
    emptySlotMode: false,
    editingPostId: '',
    isInstagramLoading: false,
  },
  profileSidebar: {
    selectedProfileId: profile.id,
    selectedProfile: profile,
    profiles: [profile],
  },
  user: buildUser(),
  drafts: {
    draftMode: false,
  },
  campaignsList: {
    campaigns: null,
  },
  organizations: {
    selected: {
      hasCalendarFeature: true,
      hasCampaignsFeature: true,
    },
  },
};

// eslint-disable-next-line react/prop-types
const _TestContextContainer = ({ children }) => <>{children}</>;

const queueComponents = () => {
  const whatToShareInput = screen.getByRole('button', {
    name: /what would you like to share?/i,
  });
  const dayButton = screen.getByRole('button', {
    name: /day/i,
  });
  const weekButton = screen.getByRole('button', {
    name: /week/i,
  });
  const monthButton = screen.getByRole('button', {
    name: /month/i,
  });
  const today = screen.getByText(/today/i);
  const date = screen.getByText(/january 1\b/i);
  const slots = screen.getAllByText(/11:00 am/i);

  return {
    whatToShareInput,
    dayButton,
    weekButton,
    monthButton,
    today,
    date,
    slots,
  };
};

describe('QueuedPosts | user interaction', () => {
  const rpcCall = RPCClient.prototype.call;
  const TestDragDropContainer = DragDropContext(TestBackend)(
    _TestContextContainer
  );

  const campaign = buildCampaign();
  const day1 = new Date('2020-01-01T11:00:00.000Z');
  const post1 = buildPost({
    overrides: {
      profileId: profile.id,
      scheduledAt: getTime(day1),
      campaignDetails: campaign,
    },
  });

  const day2 = new Date('2020-01-02T11:00:00.000Z');
  const post2 = buildPostWithImage({
    overrides: {
      profileId: profile.id,
      scheduledAt: getTime(day2),
    },
  });

  const posts = { [post1.id]: post1, [post2.id]: post2 };

  beforeAll(() => {
    Date.now = jest.fn(() => new Date('2020-01-01T10:10:00.000Z'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render empty queue with slots', () => {
    render(
      <TestDragDropContainer>
        <QueuedPosts profileId={profile.id} />
      </TestDragDropContainer>,
      {
        initialState,
      }
    );

    const {
      whatToShareInput,
      dayButton,
      weekButton,
      monthButton,
      today,
      date,
      slots,
    } = queueComponents();

    expect(whatToShareInput).toBeInTheDocument();
    expect(dayButton).toBeInTheDocument();
    expect(weekButton).toBeInTheDocument();
    expect(monthButton).toBeInTheDocument();
    expect(today).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(slots.length).toBeGreaterThan(0);
  });

  test('should render queue with slots and posts', async () => {
    render(
      <TestDragDropContainer>
        <QueuedPosts profileId={profile.id} />
      </TestDragDropContainer>,
      {
        initialState: {
          ...initialState,
          queue: {
            ...initialState.queue,
            byProfileId: {
              [profile.id]: {
                posts,
                total: 2,
                page: 2,
                loading: false,
              },
            },
          },
        },
      }
    );

    expect(rpcCall).toHaveBeenCalledWith('getCampaignsList', {});
    expect(rpcCall).toHaveBeenCalledTimes(1);

    expect(screen.getByText(post1.postContent.text)).toBeInTheDocument();
    expect(screen.getByText(post1.postDetails.postAction)).toBeInTheDocument();
    expect(screen.getByText(campaign.name)).toBeInTheDocument();

    const shareNowButtons = screen.getAllByText(/share now/i);
    expect(shareNowButtons.length).toBe(2);
    userEvent.click(shareNowButtons[0]);

    const sharing = await screen.findByText(/sharing.../i);
    await waitFor(() => {
      expect(sharing).toBeInTheDocument();
    });

    expect(rpcCall).toHaveBeenCalledWith('sharePostNow', {
      profileId: profile.id,
      updateId: post1.id,
    });
    expect(rpcCall).toHaveBeenCalledTimes(2);
  });
  test('a11y | retiring IG profile banner is accessible', async () => {
    const { container } = render(<RetiringProfileBanner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    cleanup();
  });
});
