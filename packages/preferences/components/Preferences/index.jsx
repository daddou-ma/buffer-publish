import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, Tab } from '@bufferapp/publish-shared-components';
import { Button } from '@bufferapp/ui';
import { ArrowLeft } from '@bufferapp/ui/Icon';
import { gray } from '@bufferapp/ui/style/colors';
import {
  preferencesAppsExtras,
  preferencesSecurity,
  preferencesNotifications,
  preferencesGeneral,
} from '@bufferapp/publish-routes';
import ManageAppsAndExtras from '@bufferapp/manage-apps-extras';
import Notifications from '@bufferapp/publish-account-notifications';
import ProfileSidebarComponent from '@bufferapp/publish-profile-sidebar/components/ProfileSidebar';
import styled from 'styled-components';
import TabsNames from '../../constants';
import Security from '../Security';
import General from '../General';
import { openBillingWindow } from '../../../tabs/utils';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const PreferencesWrapper = styled.div`
  flex-grow: 1;
  padding: 0 1rem;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.nav``;

const TabStyle = styled.div`
  overflow-y: auto;
  height: calc(100vh - 113px); /* 56px appshell + 57px tabs*/
`;

const ContainerStyle = styled.div`
  max-width: 864px;
  padding-top: 16px;
  margin: 0 auto;
`;

const Preferences = ({
  selectedTabId,
  onTabClick,
  onBackToDashboardClick,
  selectedProfileId,
  profiles,
  isOnBusinessTrial,
}) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <PreferencesWrapper>
        <Nav id="tabs">
          <Tabs selectedTabId={selectedTabId} onTabClick={onTabClick}>
            <Tab tabId={TabsNames.GENERAL}>{t('preferences.menu.general')}</Tab>
            <Tab tabId={TabsNames.SECURITY}>
              {t('preferences.menu.security')}
            </Tab>
            <Tab tabId={TabsNames.NOTIFICATIONS}>
              {t('preferences.menu.notifications')}
            </Tab>
            <Tab tabId={TabsNames.APPS_EXTRAS}>
              {t('preferences.menu.appsAndExtras')}
            </Tab>
            <Tab tabId={TabsNames.BILLING} onClick={() => openBillingWindow()}>
              {t('preferences.menu.billing')}
            </Tab>
          </Tabs>
        </Nav>
        <TabStyle>
          <ContainerStyle>
            <Button
              type="secondary"
              size="small"
              icon={<ArrowLeft color={gray} />}
              label={t('preferences.backToDashboard')}
              onClick={() =>
                onBackToDashboardClick({
                  selectedProfileId,
                  profiles,
                  isOnBusinessTrial,
                })
              }
            />
            <main id="main">
              <Switch>
                <Route
                  path={preferencesAppsExtras.route}
                  component={ManageAppsAndExtras}
                />
                <Route path={preferencesSecurity.route} component={Security} />
                <Route
                  path={preferencesNotifications.route}
                  component={Notifications}
                />
                <Route path={preferencesGeneral.route} component={General} />
                <Redirect to={preferencesGeneral.route} />
              </Switch>
            </main>
          </ContainerStyle>
        </TabStyle>
      </PreferencesWrapper>
    </Wrapper>
  );
};

Preferences.propTypes = {
  selectedTabId: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onBackToDashboardClick: PropTypes.func.isRequired,
  selectedProfileId: ProfileSidebarComponent.propTypes.selectedProfileId,
  profiles: ProfileSidebarComponent.propTypes.profiles.isRequired,
  isOnBusinessTrial: PropTypes.bool.isRequired,
};

Preferences.defaultProps = {
  selectedProfileId: undefined,
};

export default Preferences;
