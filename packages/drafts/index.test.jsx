import React from 'react';
import {
  render,
  screen,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import userEvent from '@testing-library/user-event';
import { getURL } from '@bufferapp/publish-server/formatters';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { axe } from 'jest-axe';
import middleware from './middleware';
import reducer, { actions, actionTypes } from './reducer';
import Drafts from './index';

describe('Drafts', () => {
  const hostname = 'publish.local.buffer.com';
  window.location.assign = jest.fn();
  window.location.hostname = hostname;
  const initialState = {
    organizations: {
      selected: {
        isAdmin: true,
        name: 'AlpenGlow',
        ownerEmail: 'test@buffer.com',
        showFreePaywall: true,
        canStartBusinessTrial: false,
      },
    },
    drafts: {
      editMode: false,
      editingPostId: '',
      draftMode: true,
      byProfileId: { '123456': { drafts: {} } },
    },
  };

  it('should export reducer', () => {
    expect(reducer).toBeDefined();
  });

  it('should export actions', () => {
    expect(actions).toBeDefined();
  });

  it('should export actionTypes', () => {
    expect(actionTypes).toBeDefined();
  });

  it('should export middleware', () => {
    expect(middleware).toBeDefined();
  });
  it('shows free paywall for org on free plan', () => {
    render(<Drafts tabId="drafts" profileId="1234" />, {
      initialState,
    });
    const primaryButton = screen.getByRole('button', {
      name: 'Upgrade',
    });
    expect(primaryButton).toBeInTheDocument();
  });
  it('redirects to billing when clicking button on pro paywall', () => {
    render(<Drafts tabId="drafts" profileId="1234" />, {
      initialState: {
        ...initialState,
        organizations: {
          selected: {
            isAdmin: true,
            name: 'AlpenGlow',
            ownerEmail: 'test@buffer.com',
            showFreePaywall: false,
            showProPaywall: true,
            canStartBusinessTrial: false,
          },
        },
      },
    });
    const primaryButton = screen.getByRole('button', {
      name: 'Upgrade to Buffer for Business',
    });
    expect(primaryButton).toBeInTheDocument();
    userEvent.click(primaryButton);
    const BILLING_URL = `${getURL.getBillingURL({
      cta: SEGMENT_NAMES.DRAFTS_BUSINESS_UPGRADE,
    })}`;
    expect(window.location.assign).toHaveBeenCalledWith(BILLING_URL);
    window.location.assign.mockRestore();
  });
  it('redirects to trial url when clicking button on pro paywall with business trial cta', () => {
    render(<Drafts tabId="drafts" profileId="1234" />, {
      initialState: {
        ...initialState,
        organizations: {
          selected: {
            isAdmin: true,
            name: 'AlpenGlow',
            ownerEmail: 'test@buffer.com',
            showFreePaywall: false,
            showProPaywall: true,
            canStartBusinessTrial: true,
          },
        },
      },
    });
    const primaryButton = screen.getByRole('button', {
      name: 'Start a Free 14-Day Trial of the Business Plan',
    });

    userEvent.click(primaryButton);
    const START_TRIAL_URL = getURL.getStartTrialURL({
      trialType: 'small',
      cta: SEGMENT_NAMES.DRAFTS_SBP_TRIAL,
      nextUrl: 'https://publish.buffer.com',
    });
    expect(window.location.assign).toHaveBeenCalledWith(START_TRIAL_URL);
    window.location.assign.mockRestore();
  });
  it('a11y | drafts page with paywall is accessible', async () => {
    const { container } = render(<Drafts tabId="drafts" profileId="1234" />, {
      initialState,
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
