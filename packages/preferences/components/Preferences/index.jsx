import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Nav, NavLink } from '@bufferapp/publish-shared-components';
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
  onBackToDashboardClick,
  selectedProfileId,
  profiles,
  isOnBusinessTrial,
}) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <PreferencesWrapper>
        <Nav>
          <NavLink to={preferencesGeneral.route} activeOnlyWhenExact>
            {t('preferences.menu.general')}
          </NavLink>
          <NavLink to={preferencesSecurity.route} activeOnlyWhenExact>
            {t('preferences.menu.security')}
          </NavLink>
          <NavLink to={preferencesNotifications.route} activeOnlyWhenExact>
            {t('preferences.menu.notifications')}
          </NavLink>
          <NavLink to={preferencesAppsExtras.route} activeOnlyWhenExact>
            {t('preferences.menu.appsAndExtras')}
          </NavLink>
          <span onClick={() => openBillingWindow()}>
            <NavLink activeOnlyWhenExact>{t('preferences.menu.billing')}</NavLink>
          </span>
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
  onBackToDashboardClick: PropTypes.func.isRequired,
  selectedProfileId: ProfileSidebarComponent.propTypes.selectedProfileId,
  profiles: ProfileSidebarComponent.propTypes.profiles.isRequired,
  isOnBusinessTrial: PropTypes.bool.isRequired,
};

Preferences.defaultProps = {
  selectedProfileId: undefined,
};

export default Preferences;
