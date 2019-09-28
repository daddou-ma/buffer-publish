import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';
import PlanFeatureList from '../PlanFeatureList';
import {
  ColumnStyle,
  TopContentStyle,
  ImageWrapperStyle,
  FooterStyle,
  ButtonWrapperStyle,
  LinkStyle,
  TextStyle,
} from './style';

const PlanColumn = ({
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
      <Text type="h1">
        { isNonprofit ? nonProfitCost : cost }/mo
      </Text>
      <Text>{ billingText }</Text>
    </TopContentStyle>
    {features.map((feature, index) => (
      <PlanFeatureList feature={feature} key={feature} tooltip={featureTooltips[index]} />
    ))}
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
      <TextStyle>or </TextStyle>
      <LinkStyle href="https://buffer.com/pricing/publish#compare-features">
        <Text>see more features</Text>
      </LinkStyle>
    </FooterStyle>
  </ColumnStyle>
);

PlanColumn.propTypes = {
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

export default PlanColumn;
