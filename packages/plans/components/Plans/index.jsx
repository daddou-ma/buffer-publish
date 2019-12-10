import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { ArrowLeft } from '@bufferapp/ui/Icon';
import { blueDarker, gray, orange } from '@bufferapp/ui/style/colors';
import ProfileSidebarComponent from '@bufferapp/publish-profile-sidebar/components/ProfileSidebar';
import styled from 'styled-components';
import PlanColumn from '../PlanColumn';
import PlanColumnWithPremiumSolo from '../PlanColumnWithPremiumSolo';
import { getSource } from '../../utils/plans';

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

const PromoHeaderStyle = styled(Text)`
  font-weight: bold;
  font-size: 42px;
  line-height: 52px;
  text-align: left;
  width: 417px;
  color: #ffffff;
`;

const PromoTextStyle = styled(Text)`
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  text-align: left;
  width: 380px;
  color: #ffffff;
  margin-top: 0px;
  margin-bottom: 5px;
`;

const PromoContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 200px;
  margin-right: 40px;
`;

const PromoHeaderLine = styled.div`
  border: 1px solid ${orange};
  width: 200px;
`;

const ContainerStyle = styled.div`
  overflow-y: auto;
  background: ${props => (props.isAwesomePromoUser ? blueDarker : 'white')};
  display: ${props => (props.isAwesomePromoUser ? 'flex' : '')};
`;

const Plans = ({
  onChoosePlanClick,
  currentPlan,
  onBackToDashboardClick,
  selectedProfileId,
  profiles,
  translations,
  isNonprofit,
  onPremiumPlanClick,
  selectedPremiumPlan,
  isAwesomePromoUser,
  shouldSeeSoloPlanOption,
}) => (
  <ContainerStyle isAwesomePromoUser={isAwesomePromoUser}>
    <ButtonStyle>
      <Button
        type="secondary"
        size="small"
        icon={<ArrowLeft color={gray} />}
        label={translations.buttonDashboardText}
        onClick={() => onBackToDashboardClick({
          selectedProfileId,
          profiles,
          isAwesomePromoUser,
        })
        }
      />
    </ButtonStyle>
    <div style={{ textAlign: 'center' }}>
      {!isAwesomePromoUser && (
        <HeaderStyle type="h1">{translations.headerText}</HeaderStyle>
      )}
      {!shouldSeeSoloPlanOption && !isAwesomePromoUser && (
        <ColumnContainerStyle>
          <PlanColumn
            {...translations.pro}
            imageSrc="https://static.buffer.com/marketing/static/illustrations/publish-pricing-pro@2x.jpeg"
            currentPlan={currentPlan}
            onChoosePlanClick={onChoosePlanClick}
            source={getSource({ newPlan: 'pro', currentPlan })}
            isNonprofit={isNonprofit}
          />
          <PlanColumn
            {...translations.premium}
            imageSrc="https://static.buffer.com/marketing/static/illustrations/publish-pricing-premium@2x.jpeg"
            currentPlan={currentPlan}
            onChoosePlanClick={onChoosePlanClick}
            source={getSource({ newPlan: 'premium_business', currentPlan })}
            isNonprofit={isNonprofit}
          />
          <PlanColumn
            {...translations.small}
            imageSrc="https://static.buffer.com/marketing/static/illustrations/publish-pricing-business@2x.jpeg"
            currentPlan={currentPlan}
            onChoosePlanClick={onChoosePlanClick}
            source={getSource({ newPlan: 'small', currentPlan })}
            isNonprofit={isNonprofit}
          />
        </ColumnContainerStyle>
      )}
      {shouldSeeSoloPlanOption && !isAwesomePromoUser && (
        <ColumnContainerStyle>
          <PlanColumnWithPremiumSolo
            {...translations.proExperiment}
            imageSrc="https://static.buffer.com/marketing/static/illustrations/publish-pricing-pro@2x.jpeg"
            currentPlan={currentPlan}
            onChoosePlanClick={onChoosePlanClick}
            source={getSource({ newPlan: 'pro', currentPlan })}
            isNonprofit={isNonprofit}
          />
          <PlanColumnWithPremiumSolo
            {...translations.premiumExperiment}
            imageSrc="https://static.buffer.com/marketing/static/illustrations/publish-pricing-premium@2x.jpeg"
            currentPlan={currentPlan}
            onChoosePlanClick={onChoosePlanClick}
            source={getSource({
              newPlan:
                selectedPremiumPlan === 1
                  ? 'solo_premium_business'
                  : 'premium_business',
              currentPlan,
            })}
            isNonprofit={isNonprofit}
            onPremiumPlanClick={onPremiumPlanClick}
            selectedPremiumPlan={selectedPremiumPlan}
          />
        </ColumnContainerStyle>
      )}
      {!shouldSeeSoloPlanOption && isAwesomePromoUser && (
        <ColumnContainerStyle>
          <PromoContainerStyle>
            <PromoHeaderStyle type="h1">
              {translations.promoHeader}
            </PromoHeaderStyle>
            <PromoTextStyle type="h3">{translations.promoDescription}</PromoTextStyle>
            <PromoHeaderLine />
          </PromoContainerStyle>
          <PlanColumnWithPremiumSolo
            {...translations.proExperiment}
            imageSrc="https://static.buffer.com/marketing/static/illustrations/publish-pricing-pro@2x.jpeg"
            currentPlan={currentPlan}
            onChoosePlanClick={onChoosePlanClick}
            source={getSource({ newPlan: 'pro', currentPlan })}
            isNonprofit={isNonprofit}
            isAwesomePromoUser={isAwesomePromoUser}
          />
          <PlanColumnWithPremiumSolo
            {...translations.premiumExperiment}
            imageSrc="https://static.buffer.com/marketing/static/illustrations/publish-pricing-premium@2x.jpeg"
            currentPlan={currentPlan}
            onChoosePlanClick={onChoosePlanClick}
            source={getSource({
              newPlan:
                selectedPremiumPlan === 1
                  ? 'solo_premium_business'
                  : 'premium_business',
              currentPlan,
            })}
            isNonprofit={isNonprofit}
            onPremiumPlanClick={onPremiumPlanClick}
            selectedPremiumPlan={selectedPremiumPlan}
            isAwesomePromoUser={isAwesomePromoUser}
          />
        </ColumnContainerStyle>
      )}
    </div>
  </ContainerStyle>
);

Plans.propTypes = {
  onChoosePlanClick: PropTypes.func.isRequired,
  currentPlan: PropTypes.string.isRequired,
  onBackToDashboardClick: PropTypes.func.isRequired,
  selectedProfileId: ProfileSidebarComponent.propTypes.selectedProfileId,
  profiles: ProfileSidebarComponent.propTypes.profiles.isRequired,
  translations: PropTypes.object.isRequired,  // eslint-disable-line
  isNonprofit: PropTypes.bool.isRequired,
};

export default Plans;
