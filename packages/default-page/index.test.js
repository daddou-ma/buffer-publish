import React from 'react';
import {
  render,
  screen,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import userEvent from '@testing-library/user-event';
import '@bufferapp/publish-web/components/i18n';
import { axe } from 'jest-axe';
import DefaultPage from './index';

describe('DefaultPage', () => {
  test('loads permissions empty state for users without admin access', async () => {
    render(<DefaultPage />, {
      initialState: {
        organizations: {
          selected: {
            isAdmin: false,
            name: 'Cool Org',
            ownerEmail: 'ana@buffer.com',
          },
        },
      },
    });
    expect(screen.getByRole('heading')).toHaveTextContent(/joined Cool Org/i);
  });

  test('loads empty state for users with admin access', async () => {
    render(<DefaultPage />, {
      initialState: {
        organizations: { selected: { isAdmin: true } },
      },
    });
    expect(screen.getByRole('heading')).toHaveTextContent(
      "Let's get your account set up!"
    );
  });

  test('opens org admin when user clicks in manage social accounts', () => {
    const hostname = 'publish.local.buffer.com';
    const url = 'https://local.buffer.com/manage/accounts/connect';
    window.location.assign = jest.fn();
    window.location.hostname = hostname;

    render(<DefaultPage />, {
      initialState: {
        organizations: { selected: { isAdmin: true } },
      },
    });
    const connectButton = screen.getByRole('button');

    userEvent.click(connectButton);

    expect(window.location.assign).toHaveBeenCalledWith(url);
    window.location.assign.mockRestore();
  });

  test('a11y | default page is accessible', async () => {
    const { container } = render(<DefaultPage />, {
      initialState: {
        organizations: { selected: { isAdmin: true } },
      },
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
