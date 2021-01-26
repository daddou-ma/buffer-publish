import React from 'react';
import {
  render,
  screen,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import userEvent from '@testing-library/user-event';
import ProfileSidebar, {
  reducer,
  actions,
  actionTypes,
  middleware,
} from './index';

describe('ProfileSidebar', () => {
  test('should export reducer', () => {
    expect(reducer).toBeDefined();
  });

  test('should export actions', () => {
    expect(actions).toBeDefined();
  });

  test('should export actionTypes', () => {
    expect(actionTypes).toBeDefined();
  });

  test('should export middleware', () => {
    expect(middleware).toBeDefined();
  });
  test('opens account channels when user clicks in manage social accounts', () => {
    const hostname = 'publish.local.buffer.com';
    window.location.assign = jest.fn();
    window.location.hostname = hostname;

    render(<ProfileSidebar />, {
      initialState: {
        globalAccount: { shouldRedirectToAccountChannels: true },
      },
    });
    const connectButton = screen.getByRole('button');

    userEvent.click(connectButton);

    expect(window.location.assign).toHaveBeenCalledWith(
      getURL.getAccountChannelsURL()
    );
    window.location.assign.mockRestore();
  });
  test('opens org admin when user clicks in manage social accounts', () => {
    const hostname = 'publish.local.buffer.com';
    window.location.assign = jest.fn();
    window.location.hostname = hostname;

    render(<ProfileSidebar />, {
      initialState: {
        globalAccount: { shouldRedirectToAccountChannels: false },
      },
    });
    const connectButton = screen.getByRole('button');

    userEvent.click(connectButton);

    expect(window.location.assign).toHaveBeenCalledWith(
      getURL.getManageSocialAccountURL()
    );
    window.location.assign.mockRestore();
  });
});
