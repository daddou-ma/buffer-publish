import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import DraftFooterApproval from './index';

const draftsView = 'drafts';
const approvalView = 'approval';

storiesOf('DraftFooterApproval', module)
  .addDecorator(withA11y)
  .add('drafts view: manager', () => (
    <DraftFooterApproval
      hasPermission
      onApproveClick={action('approve-click')}
      onRequestApprovalClick={action('request-approval-click')}
      onRescheduleClick={action('reschedule-click')}
      manager
      view={draftsView}
    />
  ))
  .add('drafts view: manager past due', () => (
    <DraftFooterApproval
      hasPermission
      isPastDue
      onApproveClick={action('approve-click')}
      onRequestApprovalClick={action('request-approval-click')}
      onRescheduleClick={action('reschedule-click')}
      manager
      view={draftsView}
    />
  ))
  .add('drafts view: not manager', () => (
    <DraftFooterApproval
      hasPermission
      onApproveClick={action('approve-click')}
      onRequestApprovalClick={action('request-approval-click')}
      onRescheduleClick={action('reschedule-click')}
      view={draftsView}
    />
  ))
  .add('drafts view: not manager. no permissions.', () => (
    <DraftFooterApproval
      hasPermission={false}
      onApproveClick={action('approve-click')}
      onRequestApprovalClick={action('request-approval-click')}
      onRescheduleClick={action('reschedule-click')}
      view={draftsView}
    />
  ))
  .add('drafts view: not manager. past due', () => (
    <DraftFooterApproval
      hasPermission
      isPastDue
      onApproveClick={action('approve-click')}
      onRequestApprovalClick={action('request-approval-click')}
      onRescheduleClick={action('reschedule-click')}
      view={draftsView}
    />
  ))
  .add('drafts view: not manager. past due. no permissions.', () => (
    <DraftFooterApproval
      hasPermission={false}
      isPastDue
      onApproveClick={action('approve-click')}
      onRequestApprovalClick={action('request-approval-click')}
      onRescheduleClick={action('reschedule-click')}
      view={draftsView}
    />
  ))
  .add('approval view: manager', () => (
    <DraftFooterApproval
      hasPermission
      onApproveClick={action('approve-click')}
      onRequestApprovalClick={action('request-approval-click')}
      onRescheduleClick={action('reschedule-click')}
      manager
      view={approvalView}
    />
  ))
  .add('approval view: manager past due', () => (
    <DraftFooterApproval
      hasPermission
      isPastDue
      onApproveClick={action('approve-click')}
      onRequestApprovalClick={action('request-approval-click')}
      onRescheduleClick={action('reschedule-click')}
      manager
      view={approvalView}
    />
  ))
  .add('approval view: not manager', () => (
    <DraftFooterApproval
      hasPermission
      onApproveClick={action('approve-click')}
      onRequestApprovalClick={action('request-approval-click')}
      onRescheduleClick={action('reschedule-click')}
      view={approvalView}
    />
  ))
  .add('approval view: not manager. past due', () => (
    <DraftFooterApproval
      hasPermission
      isPastDue
      onApproveClick={action('approve-click')}
      onRequestApprovalClick={action('request-approval-click')}
      onRescheduleClick={action('reschedule-click')}
      view={approvalView}
    />
  ))
  .add('approval view: not manager. past due. no permissions.', () => (
    <DraftFooterApproval
      hasPermission={false}
      isPastDue
      onApproveClick={action('approve-click')}
      onRequestApprovalClick={action('request-approval-click')}
      onRescheduleClick={action('reschedule-click')}
      view={approvalView}
    />
  ));
