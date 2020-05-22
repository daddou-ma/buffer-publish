import React from 'react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { green } from '@bufferapp/ui/style/colors';
import {
  render,
  screen,
  waitFor,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import '@bufferapp/publish-web/components/i18n';
import RPCClient from '@bufferapp/micro-rpc-client';
import { createMemoryHistory } from 'history';

import CampaignForm from './index';

const campaignForm = () => {
  const input = screen.getByLabelText(/name/i);
  const purpleColor = screen.getByLabelText(/purple/i);
  const greenColor = screen.getByLabelText(/green/i);
  const saveButton = screen.getByRole('button', { name: /save campaign/i });
  const cancelButton = screen.getByRole('button', { name: /cancel/i });

  return {
    input,
    purpleColor,
    greenColor,
    saveButton,
    cancelButton,
  };
};

const initialState = {
  appSidebar: { user: { features: ['campaigns'] } },
};

describe('CampaignForm | user interaction', () => {
  const rpcCall = RPCClient.prototype.call;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('entering values in create form enables save option', async () => {
    render(<CampaignForm />, {
      initialState,
    });

    const { input, purpleColor, greenColor, saveButton } = campaignForm();

    expect(screen.getByRole('heading')).toHaveTextContent(/create campaign/i);
    expect(purpleColor).toBeChecked();
    expect(saveButton).toBeDisabled();

    await userEvent.type(input, 'Campaign Test');
    expect(input).toHaveValue('Campaign Test');

    userEvent.click(greenColor);

    expect(purpleColor).not.toBeChecked();
    expect(greenColor).toBeChecked();
    expect(saveButton).not.toBeDisabled();

    userEvent.click(saveButton);

    expect(rpcCall).toHaveBeenCalledWith('createCampaign', {
      color: green,
      name: 'Campaign Test',
    });
    expect(rpcCall).toHaveBeenCalledTimes(1);
  });

  test('entering values in update form enables save option', async () => {
    const campaignId = '18027';
    const campaign = {
      id: campaignId,
      name: 'Test Campaign',
      color: green,
      globalOrganizationId: '1',
      channels: [],
    };

    jest
      .spyOn(RPCClient.prototype, 'call')
      .mockResolvedValueOnce({ ...campaign });

    render(<CampaignForm editMode />, {
      initialState: {
        ...initialState,
        campaignForm: { campaignId, isLoading: false },
      },
    });

    expect(rpcCall).toHaveBeenCalledWith('getCampaign', {
      campaignId,
      fullItems: false,
      past: false,
    });
    expect(rpcCall).toHaveBeenCalledTimes(1);

    const { input, greenColor, saveButton } = campaignForm();
    await waitFor(() => expect(input).toHaveValue('Test Campaign'));
    await waitFor(() => expect(greenColor).toBeChecked());

    userEvent.clear(input);
    await userEvent.type(input, 'Campaign updated');
    expect(input).toHaveValue('Campaign updated');
    expect(saveButton).not.toBeDisabled();

    userEvent.click(saveButton);

    expect(rpcCall).toHaveBeenCalledWith('updateCampaign', {
      campaignId,
      color: green,
      name: 'Campaign updated',
    });
    expect(rpcCall).toHaveBeenCalledTimes(2);
  });

  test(`update campaign redirects to campaigns view if there's an error fetching the campaign`, async () => {
    const campaignId = '18027';
    const errorResponse = new Error('Campaign not found');
    jest
      .spyOn(RPCClient.prototype, 'call')
      .mockRejectedValueOnce(errorResponse);

    const { history } = render(<CampaignForm editMode />, {
      initialState: {
        ...initialState,
        campaignForm: { campaignId, isLoading: false },
      },
    });

    expect(rpcCall).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(console.error).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(console.error).toHaveBeenCalledWith(errorResponse)
    );
    await waitFor(() => expect(history.location.pathname).toBe('/campaigns'));
  });

  test('creating a campaign with error from api should fail', async () => {
    const errorResponse = new Error('An error occurred');
    jest
      .spyOn(RPCClient.prototype, 'call')
      .mockRejectedValueOnce(errorResponse);

    render(<CampaignForm />, {
      initialState,
    });

    const { input, saveButton } = campaignForm();

    await userEvent.type(input, 'New Campaign');
    userEvent.click(saveButton);

    expect(rpcCall).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(console.error).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(console.error).toHaveBeenCalledWith(errorResponse)
    );
  });

  test('user should not be able to access campaigns without having the feature flip', () => {
    render(<CampaignForm />, {
      initialState: {
        appSidebar: { user: { features: [''] } },
      },
    });

    expect(screen.queryByRole('heading')).toBeNull();
  });

  test('a11y | campaign form is accessible', async () => {
    const { container } = render(<CampaignForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('returns to campaigns when click cancel inside the form', () => {
    const initiaHistory = createMemoryHistory();
    initiaHistory.push('/', { from: '/campaigns' });

    const { history } = render(<CampaignForm history={initiaHistory} />, {
      initialState,
    });
    const { cancelButton } = campaignForm();

    userEvent.click(cancelButton);
    expect(history.location.pathname).toBe('/campaigns');
  });
});
