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

const PlanColumnExperimentControl = ({
  title,
  cost,
  nonProfitCost,
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
      <UserIcon Icon={plan === 'premium_business' ? <People /> : <Person />} text={plan === 'premium_business' ? '2 users' : '1 user'} />
      <PriceStyle>
        <Text type="h1">
          { isNonprofit ? nonProfitCost : cost }
          /mo
        </Text>
      </PriceStyle>
      <BillingTextStyle>
        <Text>{ billingText }</Text>
      </BillingTextStyle>
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
          onClick={() => onChoosePlanClick({ source, plan })}
        />
      </ButtonWrapperStyle>
    </FooterStyle>
  </ColumnStyle>
);

PlanColumnExperimentControl.propTypes = {
  title: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  nonProfitCost: PropTypes.string.isRequired,
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

export default PlanColumnExperimentControl;
