import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  profilePageRoute,
  preferencePageRoute,
  childTabRoute,
  plansPageRoute,
  newBusinessTrialistsRoute,
  newConnectionRoute,
  generateProfilePageRoute,
  campaignScheduledRoute,
  campaignsPageRoute,
  campaignCreateRoute,
  campaignEditRoute,
} from '@bufferapp/publish-routes';
import PageWrapper from '@bufferapp/publish-app-pages/components/PageWrapper';
import ProfilePage from '@bufferapp/profile-page';
import Preferences from '@bufferapp/publish-preferences';
import Plans from '@bufferapp/publish-plans';
import DefaultPage from '@bufferapp/default-page';
import OnboardingManager from '@bufferapp/publish-onboarding';
import CampaignForm from '@bufferapp/publish-campaign-form';
import ViewCampaign from '@bufferapp/publish-campaign';
import ListCampaigns from '@bufferapp/publish-campaigns-list';

const AppPages = ({ profiles, isOnBusinessTrial }) => {
  const hasProfiles = profiles && profiles.length > 0;
  const redirectToQueue = () => {
    const selectedProfileId =
      Array.isArray(profiles) && !!profiles.length && profiles[0].id;
    const newPath = generateProfilePageRoute({ profileId: selectedProfileId });
    return <Redirect to={newPath} />;
  };
  return (
    <Switch>
      <Route path={preferencePageRoute} component={Preferences} />
      <Route path={plansPageRoute} component={Plans} />

      {!hasProfiles && (
        <Route path={newBusinessTrialistsRoute} component={OnboardingManager} />
      )}
      {!hasProfiles && isOnBusinessTrial && (
        <Redirect to={newBusinessTrialistsRoute} />
      )}

      {!hasProfiles && (
        <Route path={newConnectionRoute} component={DefaultPage} />
      )}
      {!hasProfiles && <Redirect to={newConnectionRoute} />}

      <Route
        path={campaignCreateRoute}
        render={() => (
          <PageWrapper>
            <CampaignForm />
          </PageWrapper>
        )}
      />
      <Route
        path={campaignEditRoute}
        render={props => (
          <PageWrapper>
            <CampaignForm {...props} editMode />
          </PageWrapper>
        )}
      />
      <Route
        path={campaignScheduledRoute}
        render={props => (
          <PageWrapper>
            <ViewCampaign {...props} />
          </PageWrapper>
        )}
      />
      <Route
        path={campaignsPageRoute}
        render={() => (
          <PageWrapper>
            <ListCampaigns />
          </PageWrapper>
        )}
      />

      <Route path={childTabRoute} component={ProfilePage} />
      <Route path={profilePageRoute} component={ProfilePage} />

      <Route>{redirectToQueue()}</Route>
    </Switch>
  );
};

AppPages.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.object),
  isOnBusinessTrial: PropTypes.bool,
};

AppPages.defaultProps = {
  isOnBusinessTrial: false,
  profiles: [],
};

export default AppPages;
