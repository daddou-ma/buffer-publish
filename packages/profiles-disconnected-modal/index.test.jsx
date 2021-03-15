import React from 'react';
import {
  render,
  screen,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import userEvent from '@testing-library/user-event';
import { getURL } from '@bufferapp/publish-server/formatters';
import { selectedProfile } from '@bufferapp/publish-profile-sidebar/mockData/profiles';
import '@bufferapp/publish-web/components/i18n';
import { axe } from 'jest-axe';
import ProfilesDisconnectedModal from './index';

describe('ProfilesDisconnectedModal', () => {
  const profile = [
    { ...selectedProfile, isAdmin: true, organizationId: '123' },
  ];
  const initialState = {
    organizations: {
      list: [{ isAdmin: true, id: '123' }],
      selected: { shouldRedirectToAccountChannels: true },
    },
    profilesDisconnectedModal: { disconnectedProfiles: profile },
  };

  test('opens account channels when user clicks on reconnect', () => {
    const hostname = 'publish.local.buffer.com';
    window.location.assign = jest.fn();
    window.location.hostname = hostname;

    render(<ProfilesDisconnectedModal />, {
      initialState,
    });
    const connectButton = screen.getByRole('button');

    userEvent.click(connectButton);

    expect(window.location.assign).toHaveBeenCalledWith(
      getURL.getAccountChannelsURL()
    );
    window.location.assign.mockRestore();
  });

  test('a11y | disconnected modal is accessible', async () => {
    const { container } = render(<ProfilesDisconnectedModal />, initialState);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
