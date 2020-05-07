import React from 'react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { green, purple } from '@bufferapp/ui/style/colors';
import {
  render,
  screen,
  waitFor,
} from '@bufferapp/publish-test-utils/test-utils';
import '@bufferapp/publish-web/components/i18n';
import RPCClient from '@bufferapp/micro-rpc-client';

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

describe('CampaignForm | user interaction', () => {
  test('entering values in create form enables save option', async () => {
    render(<CampaignForm />);

    // preparing the form
    const { input, purpleColor, greenColor, saveButton } = campaignForm();

    // asserting initial values
    expect(purpleColor).toBeChecked();
    expect(saveButton).toBeDisabled();

    // user types in a campaign name
    await userEvent.type(input, 'Campaign Test');
    expect(input).toHaveValue('Campaign Test');

    // user clicks on a different color
    userEvent.click(greenColor);

    // asserting form changes after user input
    expect(purpleColor).not.toBeChecked();
    expect(greenColor).toBeChecked();
    expect(saveButton).not.toBeDisabled();

    // user clicks on save
    userEvent.click(saveButton);
  });

  test('entering values in update form enables save option', async () => {
    const campaignId = '18027';
    const campaign = {
      id: campaignId,
      _id: campaignId,
      name: 'Test Campaign',
      color: green,
      globalOrganizationId: '1',
      channels: [],
    };

    // Mock API
    RPCClient.prototype.call = jest.fn(() => {
      return Promise.resolve({ ...campaign });
    });

    render(<CampaignForm editMode />, {
      initialState: {
        campaignForm: { campaignId, isLoading: false },
      },
    });

    expect(RPCClient.prototype.call).toHaveBeenCalledWith('getCampaign', {
      campaignId,
      fullItems: false,
      past: false,
    });
    expect(RPCClient.prototype.call).toHaveBeenCalledTimes(1);

    // preparing the form
    const { input, purpleColor, greenColor, saveButton } = campaignForm();
    await waitFor(() => expect(input).toHaveValue('Test Campaign'));
    await waitFor(() => expect(greenColor).toBeChecked());

    // user clicks on a different color
    userEvent.click(purpleColor);
    expect(purpleColor).toBeChecked();

    // user types in an updated campaign name
    userEvent.clear(input);
    await userEvent.type(input, 'Campaign updated');
    expect(input).toHaveValue('Campaign updated');
    expect(saveButton).not.toBeDisabled();

    // user clicks on save
    userEvent.click(saveButton);

    expect(RPCClient.prototype.call).toHaveBeenCalledWith('updateCampaign', {
      campaignId,
      color: purple,
      name: 'Campaign updated',
    });
    expect(RPCClient.prototype.call).toHaveBeenCalledTimes(2);
  });

  test('not entering all values in the form disables save button', () => {
    render(<CampaignForm />);

    // preparing the form
    const { purpleColor, saveButton } = campaignForm();

    // asserting form changes after user input
    expect(purpleColor).toBeChecked();
    expect(saveButton).toBeDisabled();
  });

  test('a11y | campaign form is accessible', async () => {
    const { container } = render(<CampaignForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
