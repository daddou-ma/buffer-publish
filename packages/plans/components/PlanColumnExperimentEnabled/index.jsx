import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';
import { People, Person } from '@bufferapp/ui/Icon';
import PlanFeatureList from '../PlanFeatureList';
import {
  ColumnStyle,
  TopContentStyle,
  ImageWrapperStyle,
  FooterStyle,
  ButtonWrapperStyle,
  UsersStyle,
  IconStyle,
  PriceStyle,
  BillingTextStyle,
  FeatureListStyle,
  PlanStyle,
  RightPlanItem,
  LeftPlanItem,
} from './style';

const UserIcon = ({ Icon, text }) => (
  <UsersStyle>
    <IconStyle>
      {Icon}
    </IconStyle>
    <Text>
      {text}
    </Text>
  </UsersStyle>
);

const RightPlanButton = ({
  isNonprofit, nonProfitCost, cost, billingText}) => (
    <RightPlanItem>
      <UserIcon Icon={<People />} text="2 users" />
      <PriceStyle>
        <Text type="h1">
          { isNonprofit ? nonProfitCost : cost }
              /mo
        </Text>
      </PriceStyle>
      <BillingTextStyle>
        <Text>{ billingText }</Text>
      </BillingTextStyle>
    </RightPlanItem>
);

const RightButton = styled(Button)`
  height: unset;
  background-color: #2c4bff24
`;

const LeftPlanButton = ({
  isNonprofit, nonProfitCost, cost, billingText}) => (
    <LeftPlanItem>
      <UserIcon Icon={<People />} text="1 user" />
      <PriceStyle>
        <Text type="h1">
          { isNonprofit ? nonProfitCost : cost }
              /mo
        </Text>
      </PriceStyle>
      <BillingTextStyle>
        <Text>{ billingText }</Text>
      </BillingTextStyle>
    </LeftPlanItem>
);

const LeftButton = styled(Button)`
  height: unset;
  background-color: #2c4bff24
`;

const PlanColumnExperimentEnabled = ({
  title,
  cost,
  nonProfitCost,
  soloCost,
  soloNonProfitCost,
  isNonprofit,
  imageSrc,
  plan,
  currentPlan,
  source,
  onChoosePlanClick,
  features,
  featureTooltips,
  buttonText,
  buttonCurrentPlanText,
  billingText,
  onPremiumPlanClick,
  selectedPremiumPlan,
}) => (
  <ColumnStyle>
    <TopContentStyle>
      <Text type="h3">{ title }</Text>
      <ImageWrapperStyle>
        <Image
          src={imageSrc}
          width="auto"
          height="130px"
        />
      </ImageWrapperStyle>
      {plan !== 'premium_business' && (
        <div>
          <UserIcon Icon={<Person />} text="1 user" />
          <PriceStyle>
            <Text type="h1">
              { isNonprofit ? nonProfitCost : cost }
              /mo
            </Text>
          </PriceStyle>
          <BillingTextStyle>
            <Text>{ billingText }</Text>
          </BillingTextStyle>
        </div>
      )}
      {plan === 'premium_business' && (
      <PlanStyle>
        <LeftButton
          type={selectedPremiumPlan === 1 ? 'primary' : 'secondary'}
          onClick={() => onPremiumPlanClick({ selectedPlan: 1 })}
          hasIconOnly
          size="large"
          icon={<LeftPlanButton isNonprofit={isNonprofit} nonProfitCost={soloNonProfitCost} cost={soloCost} billingText={billingText} />}
        />
        <RightButton
          type={selectedPremiumPlan === 1 ? 'secondary' : 'primary'}
          onClick={() => onPremiumPlanClick({ selectedPlan: 2 })}
          hasIconOnly
          size="large"
          icon={<RightPlanButton isNonprofit={isNonprofit} nonProfitCost={nonProfitCost} cost={cost} billingText={billingText} />}
        />
      </PlanStyle>
      )}
    </TopContentStyle>
    <FeatureListStyle>
      {features.map((feature, index) => (
        <PlanFeatureList feature={feature} key={feature} tooltip={featureTooltips[index]} />
      ))}
    </FeatureListStyle>
    <FooterStyle>
      <ButtonWrapperStyle>
        <Button
          type="primary"
          label={currentPlan === plan ? buttonCurrentPlanText : buttonText}
          fullWidth
          disabled={currentPlan === plan}
          onClick={() => onChoosePlanClick({ source, plan, soloPlanSelected: selectedPremiumPlan === 1 })}
        />
      </ButtonWrapperStyle>
    </FooterStyle>
  </ColumnStyle>
);

PlanColumnExperimentEnabled.propTypes = {
  title: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  nonProfitCost: PropTypes.string.isRequired,
  soloCost: PropTypes.string.isRequired,
  soloNonProfitCost: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
  currentPlan: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  onChoosePlanClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonCurrentPlanText: PropTypes.string.isRequired,
  billingText: PropTypes.string.isRequired,
  features: PropTypes.array.isRequired,
  featureTooltips: PropTypes.array.isRequired,
  isNonprofit: PropTypes.bool.isRequired,
};

export default PlanColumnExperimentEnabled;
