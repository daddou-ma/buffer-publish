import React from 'react';
import {
  render,
  screen,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import userEvent from '@testing-library/user-event';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';

import ProfileSidebar, {
  reducer,
  actions,
  actionTypes,
  middleware,
} from './index';

import { profiles, selectedProfile } from './mockData/profiles';

const _TestContextContainer = ({ children }) => <>{children}</>;

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
  test('opens account channels when user clicks on profile connect shortcut', () => {
    const hostname = 'publish.local.buffer.com';
    window.location.assign = jest.fn();
    window.location.hostname = hostname;
    const TestDragDropContainer = DragDropContext(TestBackend)(
      _TestContextContainer
    );

    render(
      <TestDragDropContainer>
        <ProfileSidebar />
      </TestDragDropContainer>,
      {
        initialState: {
          organizations: {
            selected: { canManageSocialAccounts: true, profileLimit: 10 },
          },
          globalAccount: { shouldRedirectToAccountChannels: true },
          profileSidebar: { profiles, selectedProfile, loading: false },
        },
      }
    );
    const connectLink = screen.getAllByRole('link')[1];

    userEvent.click(connectLink);

    expect(window.location.assign).toHaveBeenCalledWith(
      getURL.getAccountChannelsURL()
    );
    window.location.assign.mockRestore();
  });
  test('opens network connect url when user clicks on profile connect shortcut', () => {
    const hostname = 'publish.local.buffer.com';
    const expectedURL =
      'https://local.buffer.com/oauth/facebook/choose?cta=publish-app-sidebar-addProfile-1';
    window.location.assign = jest.fn();
    window.location.hostname = hostname;
    const TestDragDropContainer = DragDropContext(TestBackend)(
      _TestContextContainer
    );

    render(
      <TestDragDropContainer>
        <ProfileSidebar />
      </TestDragDropContainer>,
      {
        initialState: {
          organizations: {
            selected: { canManageSocialAccounts: true, profileLimit: 10 },
          },
          globalAccount: { shouldRedirectToAccountChannels: false },
          profileSidebar: { profiles, selectedProfile, loading: false },
        },
      }
    );
    const connectLink = screen.getAllByRole('link')[1];

    userEvent.click(connectLink);

    expect(window.location.assign).toHaveBeenCalledWith(expectedURL);
    window.location.assign.mockRestore();
  });
});
