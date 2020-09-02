import React from 'react';
import {
  render,
  screen,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import userEvent from '@testing-library/user-event';
import { getTime } from '@bufferapp/publish-utils/date';
import {
  buildUser,
  buildProfile,
  buildCampaign,
  buildCampaignItem,
  buildOrganization,
} from '@bufferapp/publish-test-utils/generate-data';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import RPCClient from '@bufferapp/micro-rpc-client';
import '@bufferapp/publish-web/components/i18n';
import AppPages from '@bufferapp/publish-app-pages';

// eslint-disable-next-line react/prop-types
const _TestContextContainer = ({ children }) => <>{children}</>;

const organization = buildOrganization();
const user = buildUser();
const profileTwitter = buildProfile({
  overrides: {
    organizationId: organization.id,
  },
});

const day = new Date('2020-01-02T11:00:00.000Z');
const scheduledAt = getTime(day);
const campaignItem = buildCampaignItem({
  overrides: {
    profileId: profileTwitter.id,
    user,
    dueAt: scheduledAt,
  },
});
const campaign = buildCampaign({
  overrides: {
    updatedAt: getTime(new Date()),
    createdAt: getTime(new Date()),
    startDate: scheduledAt,
    endDate: scheduledAt,
    dateRange: 'Jan 2-2, 2020',
    sent: 0,
    scheduled: 1,
    items: [campaignItem],
  },
});
const campaigns = [campaign];

const profiles = [profileTwitter];
const initialState = {
  user,
  profileSidebar: {
    selectedProfileId: profileTwitter.id,
    selectedProfile: profileTwitter,
    profileList: profiles,
    profiles,
  },
};

const mockApiCalls = () => {
  jest.spyOn(RPCClient.prototype, 'call').mockImplementation(name => {
    const result = {
      getCampaignsList: campaigns,
      getCampaign: campaign,
      default: { fake: 'yes' },
    };
    return Promise.resolve(result[name] || result.default);
  });
};

const campaignDetailsFields = async campaignDetails => {
  const totalScheduled = await screen.findByText(
    `${campaignDetails.scheduled} Scheduled`
  );
  const totalSent = await screen.findByText(
    `${campaignDetails.scheduled} Scheduled`
  );
  const dateRange = await screen.findByText(campaignDetails.dateRange);
  const campaignName = screen.getByText(campaignDetails.name);

  return {
    totalScheduled,
    totalSent,
    dateRange,
    campaignName,
  };
};

const campaignsListFields = async () => {
  const createCampaignBtn = await screen.findByRole('button', {
    name: /create a campaign/i,
  });
  const viewCampaignBtn = await screen.findByRole('button', {
    name: /view campaign/i,
  });
  const campaignsHeading = await screen.findByRole('heading', {
    name: /^campaigns/i,
  });

  return {
    createCampaignBtn,
    viewCampaignBtn,
    campaignsHeading,
  };
};

const campaignsQueueFields = async () => {
  const scheduledLink = await screen.findByRole('link', { name: /scheduled/i });
  const sentLink = await screen.findByRole('link', { name: /sent/i });

  return {
    scheduledLink,
    sentLink,
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
        <AppPages />
      </TestDragDropContainer>,
      {
        route: '/campaigns',
        initialState,
      }
    );

    /* List campaigns assertions */
    const {
      createCampaignBtn,
      viewCampaignBtn,
      campaignsHeading,
    } = await campaignsListFields();

    expect(createCampaignBtn).toBeInTheDocument();
    expect(campaignsHeading).toBeInTheDocument();
    expect(viewCampaignBtn).toBeInTheDocument();

    const {
      dateRange,
      campaignName,
      totalScheduled,
      totalSent,
    } = await campaignDetailsFields(campaign);

    expect(dateRange).toBeInTheDocument();
    expect(campaignName).toBeInTheDocument();
    expect(totalScheduled).toBeInTheDocument();
    expect(totalSent).toBeInTheDocument();

    expect(rpcCall).toHaveBeenCalledWith('getCampaignsList', {});
    expect(rpcCall).toHaveBeenCalledTimes(1);

    /* Campaign queue assertions */
    userEvent.click(viewCampaignBtn);

    const { scheduledLink, sentLink } = await campaignsQueueFields();
    expect(scheduledLink).toBeInTheDocument();
    expect(sentLink).toBeInTheDocument();

    const {
      campaignName: viewCampaignName,
      dateRange: viewDateRange,
      totalScheduled: viewTotalScheduled,
      totalSent: viewTotalSent,
    } = await campaignDetailsFields(campaign);

    expect(viewCampaignName).toBeInTheDocument();
    expect(viewDateRange).toBeInTheDocument();
    expect(viewTotalScheduled).toBeInTheDocument();
    expect(viewTotalSent).toBeInTheDocument();
    expect(screen.getAllByText(/create post/i)).toHaveLength(2);
    expect(screen.getByText(/edit campaign/i)).toBeInTheDocument();
    expect(screen.getByText(/delete campaign/i)).toBeInTheDocument();
    expect(screen.getByText(/view report/i)).toBeInTheDocument();
    expect(screen.getByText(profileTwitter.handle)).toBeInTheDocument();
    expect(screen.getByText(campaignItem.postContent.text)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /^delete/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /^edit/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /^share now/i })).toHaveLength(
      1
    );

    expect(rpcCall).toHaveBeenCalledWith('getCampaign', {
      campaignId: campaign.id,
      fullItems: true,
      past: false,
    });
    expect(rpcCall).toHaveBeenCalledTimes(2);
  });
});
