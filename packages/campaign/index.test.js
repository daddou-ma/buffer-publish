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
  buildCampaign,
  buildOrganization,
} from '@bufferapp/publish-test-utils/generate-data';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import RPCClient from '@bufferapp/micro-rpc-client';
import '@bufferapp/publish-web/components/i18n';
import AppPages from '@bufferapp/publish-app-pages';

const AppPagesWithRouter = withRouter(AppPages);

// eslint-disable-next-line react/prop-types
const _TestContextContainer = ({ children }) => <>{children}</>;

const getTime = date => {
  const day = date || new Date();
  return Math.floor(day / 1000);
};

const organization = buildOrganization();
const user = buildUser();
const profileTwitter = buildProfile({
  overrides: {
    organizationId: organization.id,
  },
});

const day = new Date('2020-01-02T11:00:00.000Z');
const scheduledAt = getTime(day);
const campaign = buildCampaign({
  overrides: {
    updatedAt: getTime(new Date()),
    createdAt: getTime(new Date()),
    startDate: scheduledAt,
    endDate: scheduledAt,
    dateRange: 'Jan 2-2, 2020',
    sent: 0,
    scheduled: 1,
    items: [
      {
        postContent: {
          imageUrls: [],
          linkAttachment: {},
          links: [],
          retweetCommentLinks: [],
          text: 'Testing',
          type: 'text',
        },
        postDetails: {
          error: null,
          errorLink: null,
          isCustomScheduled: false,
          isInstagramReminder: false,
          isRetweet: false,
          postAction: 'This post will be sent June 16th at 10:00 AM (CEST).',
        },
        profileId: profileTwitter.id,
        user,
      },
    ],
  },
});
const initialState = {
  user,
  profileSidebar: {
    selectedProfileId: profileTwitter.id,
    selectedProfile: profileTwitter,
    profiles: [profileTwitter],
  },
};

const campaigns = [campaign];

const mockApiCalls = () => {
  jest.spyOn(RPCClient.prototype, 'call').mockImplementation(name => {
    if (name === 'getCampaignsList') {
      return Promise.resolve(campaigns);
    }
    if (name === 'getCampaign') {
      return Promise.resolve(campaign);
    }
  });
};

const campaignsListFields = () => {
  const totalScheduled = screen.getByText(`${campaign.scheduled} Scheduled`);
  const totalSent = screen.getByText(`${campaign.scheduled} Scheduled`);
  const createCampaignBtn = screen.getByRole('button', {
    name: /create a campaign/i,
  });
  const viewCampaignBtn = screen.getByRole('button', {
    name: /view campaign/i,
  });

  return {
    totalScheduled,
    totalSent,
    createCampaignBtn,
    viewCampaignBtn,
  };
};

const campaignsQueueFields = async () => {
  const scheduledLink = await screen.findByRole('link', { name: /scheduled/i });
  const sentLink = await screen.findByRole('link', { name: /sent/i });
  const dateRange = await screen.findByText(campaign.dateRange);
  const totalScheduledLabel = await screen.findByText(
    `${campaign.scheduled} Scheduled`
  );
  const totalSentLabel = await screen.findByText(`${campaign.sent} Sent`);

  return {
    scheduledLink,
    sentLink,
    dateRange,
    totalScheduledLabel,
    totalSentLabel,
  };
};

describe('ViewCampaign | user interaction', () => {
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

  it('should render campaigns list and navigate to a campaign queue', async () => {
    mockApiCalls();

    render(
      <TestDragDropContainer>
        <AppPagesWithRouter />
      </TestDragDropContainer>,
      {
        route: '/campaigns',
        initialState,
      }
    );

    /* List campaigns assertions */
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /campaigns/i })
      ).toBeInTheDocument();
    });

    const {
      totalScheduled,
      totalSent,
      createCampaignBtn,
      viewCampaignBtn,
    } = campaignsListFields();

    expect(createCampaignBtn).toBeInTheDocument();
    expect(screen.getByText(campaign.name)).toBeInTheDocument();
    expect(totalScheduled).toBeInTheDocument();
    expect(totalSent).toBeInTheDocument();
    expect(viewCampaignBtn).toBeInTheDocument();

    expect(rpcCall).toHaveBeenCalledWith('getCampaignsList', {});
    expect(rpcCall).toHaveBeenCalledTimes(1);

    /* Campaign queue assertions */
    userEvent.click(viewCampaignBtn);

    const {
      scheduledLink,
      sentLink,
      dateRange,
      totalScheduledLabel,
      totalSentLabel,
    } = await campaignsQueueFields();

    expect(scheduledLink).toBeInTheDocument();
    expect(sentLink).toBeInTheDocument();
    expect(dateRange).toBeInTheDocument();
    expect(totalScheduledLabel).toBeInTheDocument();
    expect(totalSentLabel).toBeInTheDocument();
    expect(screen.getByText(/edit campaign/i)).toBeInTheDocument();
    expect(screen.getByText(/view report/i)).toBeInTheDocument();
    expect(screen.getAllByText(/share now/i).length).toBe(1);

    expect(rpcCall).toHaveBeenCalledWith('getCampaign', {
      campaignId: campaign.id,
      fullItems: true,
      past: false,
    });
    expect(rpcCall).toHaveBeenCalledTimes(2);
  });
});
