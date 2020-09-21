import React from 'react';
import {
  render,
  cleanup,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import { axe } from 'jest-axe';
import { getRequestName } from './index';
import IGPersonalProfileNotification from './components/IGPersonalProfileNotification';

describe('ProfilePage', () => {
  it('should export getRequestName', () => {
    expect(getRequestName).toBeDefined();
  });

  it('should return queue request name', () => {
    const queueRequestName = getRequestName('queue');
    expect(queueRequestName).toEqual('queuedPosts');
  });

  it('should return default request name', () => {
    const queueRequestName = getRequestName('other');
    expect(queueRequestName).toEqual('queuedPosts');
  });

  it('a11y | Instagram personal profile notification is accessible', async () => {
    const { container } = render(
      <IGPersonalProfileNotification
        onDirectPostingClick={() => {}}
        profileId="123"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    cleanup();
  });
});
