/* eslint-disable import/first */

import AppActionCreators from '../../action-creators/AppActionCreators';

jest.mock('../../utils/WebAPIUtils');
jest.mock('../../utils/LifecycleHooks');
jest.mock('../../stores/AppStore');
jest.mock('../../stores/ComposerStore');
jest.mock('../../dispatcher');
jest.mock('../../action-creators/NotificationActionCreators');

import NotificationActionCreators from '../../action-creators/NotificationActionCreators';
import WebAPIUtils from '../../utils/WebAPIUtils';
import AppHooks from '../../utils/LifecycleHooks';
import AppStore from '../../stores/AppStore';
import ComposerStore from '../../stores/ComposerStore';
import {
  ButtonsQueuingTypesMap,
  NotificationScopes,
  UpgradeErrorCodes,
} from '../../AppConstants';

describe('AppActionCreators', () => {
  const selectedProfiles = ['profile 1', 'profile 2'];

  describe('saveDrafts', () => {
    beforeEach(() => {
      AppStore.getOptions.mockReturnValue({
        saveButtons: Array.from(ButtonsQueuingTypesMap.keys()),
      });

      AppStore.getAppState.mockReturnValue({
        isSavingPossible: true,
      });

      AppStore.getUserData.mockReturnValue({
        shouldAlwaysSkipEmptyTextAlert: true,
      });

      AppStore.getMetaData.mockReturnValue({});
      ComposerStore.getEnabledDrafts.mockReturnValue([]);
      ComposerStore.isDraftLocked = id => id.match(/^locked/);

      NotificationActionCreators.queueSuccess.mockReturnValue(true);

      WebAPIUtils.saveDrafts.mockReturnValue(
        Promise.resolve({
          successfulResponses: ['great!'],
          unsuccessfulResponses: [],
        })
      );

      AppStore.getSelectedProfiles.mockReturnValue(selectedProfiles);
    });
    afterEach(() => jest.resetAllMocks());

    it('shows an upgrade notice when the profile queue limit is reached', async () => {
      AppStore.getOrganizationsData.mockReturnValue({
        selected: { showUpgradeToProCta: true },
      });
      WebAPIUtils.saveDrafts.mockReturnValue(
        Promise.resolve({
          successfulResponses: [],
          unsuccessfulResponses: [
            {
              code: UpgradeErrorCodes.queueLimit,
              message: 'reached queue limit',
              serviceName: 'twitter',
            },
          ],
        })
      );
      await AppActionCreators.saveDrafts();
      expect(NotificationActionCreators.queueInfo).toHaveBeenCalledWith({
        scope: 'PROFILE_QUEUE_LIMIT-twitter',
        message: 'reached queue limit',
        isUnique: true,
        cta: {
          label: expect.any(String),
          action: expect.any(Function),
        },
      });
    });

    it('requests saveDrafts to the Web API', async () => {
      await AppActionCreators.saveDrafts();
      expect(WebAPIUtils.saveDrafts).toHaveBeenCalledWith({
        customScheduleTime: null,
        drafts: [],
        profiles: selectedProfiles,
        queueingType: 'SAVE_AND_APPROVE',
      });
      expect(NotificationActionCreators.queueSuccess).toHaveBeenCalled();
      expect(AppHooks.handleSavedDrafts).toHaveBeenCalledWith({
        message: 'Great! The post has been saved.',
      });
    });

    it('out of all enabled drafts, it sends over the unlocked ones', async () => {
      ComposerStore.getEnabledDrafts.mockReturnValue([
        {
          id: 'unlocked_draft',
        },
        {
          id: 'locked_draft',
        },
      ]);
      await AppActionCreators.saveDrafts();

      expect(WebAPIUtils.saveDrafts).toHaveBeenCalledWith({
        customScheduleTime: null,
        drafts: [
          {
            id: 'unlocked_draft',
          },
        ],
        profiles: selectedProfiles,
        queueingType: 'SAVE_AND_APPROVE',
      });
    });

    it('sends a success notification if the draft was saved through the extension', async () => {
      ComposerStore.getEnabledDrafts.mockReturnValue([
        {
          id: 'unlocked_draft',
        },
        {
          id: 'locked_draft',
        },
      ]);
      AppStore.isExtension.mockReturnValue(true);
      await AppActionCreators.saveDrafts();

      expect(NotificationActionCreators.queueSuccess).toHaveBeenCalledWith({
        scope: NotificationScopes.UPDATE_SAVING_AGGREGATE,
        message: 'Great! The post has been saved.',
      });
    });
  });
  describe('displayModals', () => {
    it('triggers SHOW_IG_FIRST_COMMENT_PRO_TRIAL_MODAL event message ', async () => {
      await AppActionCreators.triggerInteraction({
        message: { action: 'SHOW_IG_FIRST_COMMENT_PRO_TRIAL_MODAL' },
      });
      expect(AppHooks.handleActionTaken).toHaveBeenCalledWith({
        message: { action: 'SHOW_IG_FIRST_COMMENT_PRO_TRIAL_MODAL' },
      });
    });
    it('triggers HIDE_IG_FIRST_COMMENT_PRO_TRIAL_MODAL event message ', async () => {
      await AppActionCreators.triggerInteraction({
        message: { action: 'HIDE_IG_FIRST_COMMENT_PRO_TRIAL_MODAL' },
      });
      expect(AppHooks.handleActionTaken).toHaveBeenCalledWith({
        message: { action: 'HIDE_IG_FIRST_COMMENT_PRO_TRIAL_MODAL' },
      });
    });
  });
});
