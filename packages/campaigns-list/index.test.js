import React from 'react';
import {
  render,
  screen,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import '@bufferapp/publish-web/components/i18n';

import Campaigns from './index';

describe('List of Campaigns', () => {
  const initialState = {
    organizations: {
      selected: {
        isAdmin: true,
        name: 'AlpenGlow',
        ownerEmail: 'test@buffer.com',
        hasCampaignsFeature: false,
        canModifyCampaigns: true,
      },
    },
  };

  it('shows empty page paywall for users without campaigns', () => {
    render(<Campaigns />, {
      initialState,
    });
    const primaryButton = screen.getByRole('button', {
      name: 'Upgrade Your Plan',
    });
    expect(primaryButton).toBeInTheDocument();
  });
});
