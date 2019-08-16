import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { ArrowLeft } from '@bufferapp/ui/Icon';
import { gray } from '@bufferapp/ui/style/colors';
import ProfileSidebarComponent from '@bufferapp/publish-profile-sidebar/components/ProfileSidebar';
import styled from 'styled-components';
import PlanColumn from '../PlanColumn';
import getSource from '../../utils/source';

const ButtonStyle = styled.div`
  padding: 16px 16px 0px;
`;

const ColumnContainerStyle = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderStyle = styled(Text)`
  margin-top: 0px;
`;

const Plans = ({
  onChoosePlanClick,
  currentPlan,
  onBackToDashboardClick,
  selectedProfileId,
  profiles,
  translations,
}) => (
  <div>
    <ButtonStyle>
      <Button
        type="secondary"
        size="small"
        icon={<ArrowLeft color={gray} />}
        label="Back to Dashboard"
        onClick={() =>
          onBackToDashboardClick({
            selectedProfileId,
            profiles,
          })
        }
      />
    </ButtonStyle>
    <div style={{ textAlign: 'center' }}>
      <HeaderStyle type="h1"> Choose your Buffer Publish plan </HeaderStyle>
      <ColumnContainerStyle>
        <PlanColumn
          {...translations.pro}
          currentPlan={currentPlan}
          onChoosePlanClick={onChoosePlanClick}
          source={getSource('pro', currentPlan)}
        />
        <PlanColumn
          {...translations.premium}
          currentPlan={currentPlan}
          onChoosePlanClick={onChoosePlanClick}
          source={getSource('premium', currentPlan)}
        />
        <PlanColumn
          {...translations.small}
          currentPlan={currentPlan}
          onChoosePlanClick={onChoosePlanClick}
          source={getSource('small', currentPlan)}
        />
      </ColumnContainerStyle>
    </div>
  </div>
);

Plans.propTypes = {
  onChoosePlanClick: PropTypes.func.isRequired,
  currentPlan: PropTypes.string.isRequired,
  onBackToDashboardClick: PropTypes.func.isRequired,
  selectedProfileId: ProfileSidebarComponent.propTypes.selectedProfileId,
  profiles: ProfileSidebarComponent.propTypes.profiles.isRequired,
  translations: PropTypes.object.isRequired,  // eslint-disable-line
};

export default Plans;
