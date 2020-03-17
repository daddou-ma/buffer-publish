import React from 'react';
import styled from 'styled-components';
import ProfileSidebar from '@bufferapp/publish-profile-sidebar';
import { Route, Switch } from 'react-router-dom';
import CampaignForm from '@bufferapp/publish-campaign-form';
import ViewCampaign from '@bufferapp/publish-campaign';
import ListCampaigns from '@bufferapp/publish-campaigns-list';
import {
  campaignScheduled,
  campaignsPage,
  campaignCreate,
  campaignEdit,
} from '@bufferapp/publish-routes';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const ProfileSidebarStyle = styled.div`
  flex-basis: 16rem;
  width: 16rem;
  min-width: 16rem;
  position: sticky;
  bottom: 0;
  top: 0;
  max-height: 100vh;
`;

const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PageWithSidebar = () => {
  return (
    <Wrapper>
      <ProfileSidebarStyle>
        <ProfileSidebar />
      </ProfileSidebarStyle>
      <ContentStyle>
        <Switch>
          <Route path={campaignCreate.route} component={CampaignForm} />
          <Route
            path={campaignEdit.route}
            render={props => <CampaignForm {...props} editMode />}
          />
          <Route path={campaignScheduled.route} component={ViewCampaign} />
          <Route path={campaignsPage.route} component={ListCampaigns} />
        </Switch>
      </ContentStyle>
    </Wrapper>
  );
};

export default PageWithSidebar;
