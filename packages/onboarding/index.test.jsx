import React from 'react';
import {
  render,
  screen,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import userEvent from '@testing-library/user-event';
import TestBackend from 'react-dnd-test-backend';
import { getConnectDirectURLs } from '@bufferapp/publish-profile-sidebar/utils';
import { DragDropContext } from 'react-dnd';
import Onboarding, { reducer, actions, actionTypes, middleware } from './index';
import {
  profiles,
  selectedProfile,
} from '../profile-sidebar/mockData/profiles';

describe('Onboarding', () => {
  const _TestContextContainer = ({ children }) => <>{children}</>;
  const TestDragDropContainer = DragDropContext(TestBackend)(
    _TestContextContainer
  );
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

  test('opens network connect url when user clicks on profile connect shortcut', () => {
    const hostname = 'publish.local.buffer.com';
    const expectedURL = getConnectDirectURLs({
      cta: 'publish-app-onboarding-addProfile-1',
    }).twitter;

    window.location.assign = jest.fn();
    window.location.hostname = hostname;

    render(
      <TestDragDropContainer>
        <Onboarding />
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
    const connectLink = screen.getByRole('button', {
      name: /Twitter Connect a Twitter profile/i,
    });

    userEvent.click(connectLink);

    expect(window.location.assign).toHaveBeenCalledWith(expectedURL);
    window.location.assign.mockRestore();
  });
  test('opens account channels when user clicks on profile connect shortcut', () => {
    const hostname = 'publish.local.buffer.com';
    window.location.assign = jest.fn();
    window.location.hostname = hostname;

    render(
      <TestDragDropContainer>
        <Onboarding />
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
    const connectLink = screen.getByRole('button', {
      name: /Twitter Connect a Twitter profile/i,
    });

    userEvent.click(connectLink);

    expect(window.location.assign).toHaveBeenCalledWith(
      getURL.getAccountChannelsURL()
    );
    window.location.assign.mockRestore();
  });
});
