// jest.mock("../dispatcher");

import AppDispatcher from '../dispatcher';
import ComposerStore from '../stores/ComposerStore';
import { ActionTypes } from '../AppConstants';
import events from '../utils/Events';

describe('AppDispatcher', () => {
  it('sends a pubsub event when the upgrade modal is supposed to show', () => {
    const eventTrigger = jest.spyOn(events, 'trigger');
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.EVENT_SHOW_SWITCH_PLAN_MODAL,
    });
    expect(eventTrigger).toHaveBeenCalledWith('show-switch-plan-modal');
  });
});
