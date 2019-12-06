import React from 'react';
import PropTypes from 'prop-types';
import { EmptyState } from '@bufferapp/publish-shared-components';

const renderEmptyState = (isManager, view) => {
  let title;
  let subtitle;
  let emoji;

  if (view === 'awaitingApproval' || view === 'pendingApproval') {
    emoji = '✨';
    title = 'Nothing to see here!';

    if (isManager) {
      subtitle =
        'Only drafts that are awaiting approval will appear here, until you approve them.';
    } else {
      subtitle =
        "Create a draft in the Drafts tab and then click, 'Request Approval' to send it here for review. Your post will be added to the queue once a manager approves it.";
    }
  } else if (view === 'drafts') {
    emoji = '✍️';
    title = "Looks like you don't have any drafts yet!";

    if (isManager) {
      subtitle = 'This is where drafts from your team will appear.';
    } else {
      subtitle =
        "Use this place to create some drafts — when you're ready click Request Approval to send them to the Pending Approval tab.";
    }
  }
  return <EmptyState title={title} subtitle={subtitle} emoji={emoji} />;
};

const Empty = ({ isManager, view }) => (
  <div>{renderEmptyState(isManager, view)}</div>
);

Empty.propTypes = {
  isManager: PropTypes.bool,
  view: PropTypes.oneOf([
    'awaitingApproval',
    'pendingApproval',
    'drafts',
    null,
  ]),
};

Empty.defaultProps = {
  isManager: false,
};

export default Empty;
