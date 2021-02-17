import React from 'react';
import {
  render,
  screen,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import userEvent from '@testing-library/user-event';
import '@bufferapp/publish-web/components/i18n';
import { axe } from 'jest-axe';
import MissingAccessPage from './index';
import { URLS } from './utils';

describe('Missing Access', () => {
  const hostname = 'publish.local.buffer.com';
  window.location.assign = jest.fn();
  window.location.hostname = hostname;
  const initialState = {
    organizations: {
      selected: {
        isAdmin: true,
        name: 'AlpenGlow',
        ownerEmail: 'test@buffer.com',
      },
    },
    appShell: {
      organizations: [
        {
          billing: { canAccessPublishing: false, name: 'Buffer', id: '123' },
        },
      ],
    },
  };
  test('opens publish pricing page with user clicks on sign up as an admin with other org access', () => {
    const orgs = [
      {
        billing: { canAccessPublishing: true, name: 'Buffer', id: '123' },
      },
    ];
    render(<MissingAccessPage />, {
      initialState: {
        ...initialState,
        appShell: {
          organizations: orgs,
        },
      }
    });
    const secondaryButton = screen.getAllByRole('button')[0];
    userEvent.click(secondaryButton);

    expect(window.location.assign).toHaveBeenCalledWith(URLS.SIGN_UP_URL);
    window.location.assign.mockRestore();
  });
  test('opens support url when user clicks on learn more as a non-admin with org access', () => {
    const orgs = [
      {
        billing: { canAccessPublishing: true, name: 'Buffer', id: '123' },
      },
    ];
    render(<MissingAccessPage />, {
      initialState: {
        ...initialState,
        organizations: {
          selected: {
            isAdmin: false,
            name: 'AlpenGlow',
            ownerEmail: 'test@buffer.com',
          },
        },
        appShell: {
          organizations: orgs,
        },
      },
    });
    const secondaryButton = screen.getAllByRole('button')[0];
    userEvent.click(secondaryButton);

    expect(window.location.assign).toHaveBeenCalledWith(URLS.SUPPORT_URL);
    window.location.assign.mockRestore();
  });
  test('opens pricing url when user clicks on sign up as an admin', () => {
    render(<MissingAccessPage />, {
      initialState,
    });
    const primaryButton = screen.getAllByRole('button')[1];

    userEvent.click(primaryButton);

    expect(window.location.assign).toHaveBeenCalledWith(URLS.SIGN_UP_URL);
    window.location.assign.mockRestore();
  });
  test('opens publish marketing url when user clicks on learn more as an admin', () => {
    render(<MissingAccessPage />, {
      initialState,
    });
    const secondaryButton = screen.getAllByRole('button')[0];

    userEvent.click(secondaryButton);

    expect(window.location.assign).toHaveBeenCalledWith(URLS.MARKETING_URL);
    window.location.assign.mockRestore();
  });
  test('opens buffer support url when user clicks on contact support as non-admin', () => {
    render(<MissingAccessPage />, {
      initialState: {
        ...initialState,
        organizations: {
          selected: {
            isAdmin: false,
            name: 'AlpenGlow',
            ownerEmail: 'test@buffer.com',
          },
        },
      },
    });
    const secondaryButton = screen.getByRole('button');
    userEvent.click(secondaryButton);

    expect(window.location.assign).toHaveBeenCalledWith(
      URLS.CONTACT_SUPPORT_URL
    );
    window.location.assign.mockRestore();
  });

  test('a11y | missing access page is accessible', async () => {
    const { container } = render(<MissingAccessPage />, {
      initialState,
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
