import styled from 'styled-components';
import {
  blue,
  gray,
  grayDark,
  orangeLighter,
} from '@bufferapp/ui/style/colors';
import { Text } from '@bufferapp/ui';

export const ColumnStyle = styled.div`
  box-shadow: 0px 0px 16px #00000014;
  border-radius: 4px;
  margin-right: 40px;
  padding: 45px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  background: white;
  margin-top: ${props => (props.isAwesomePromoUser ? '90px' : '')};
`;

export const ButtonWrapperStyle = styled.div`
  margin: 24px 0px 8px;
`;

export const FooterStyle = styled.div`
  text-align: center;
  margin-top: auto;
`;

export const ImageWrapperStyle = styled.div`
  margin: 0px auto 30px;
  margin-bottom: ${props => (props.isPremium ? '30px' : '48px')};
`;

export const TopContentStyle = styled.div`
  position: relative;
  text-align: center;
`;

export const UsersStyle = styled.span`
  align-items: center;
  justify-content: center;
  display: flex;
  color: ${props => (props.isSelected ? blue : grayDark)};
  span {
    font-size: 14px;
  }
`;

export const IconStyle = styled.span`
  display: flex;
  padding-right: 4px;
`;

export const PriceStyle = styled.span`
  h1 {
    margin-bottom: 0px;
    margin-top: 6px;
  }
`;

export const FeatureListStyle = styled.span`
  margin-top: 13px;
`;

export const EmptySpan = styled.span`
  height: 130px;
  display: inline-block;
`;

export const TextStyle = styled(Text)`
  font-family: Poppins;
`;

export const BillingTextStyle = styled(Text)`
  margin: 0;
`;

export const LeftBillingText = styled(Text)`
  margin-top: 0;
`;

export const MonthlyText = styled.span`
  font-family: Poppins;
  font-size: 13px;
`;

export const PromoTextStyle = styled.span`
  color: ${orangeLighter};
  padding-right: 16px;
`;

export const DiscountTextStyle = styled(Text)`
  color: ${gray};
  font-style: italic;
`;

export const PlanStyle = styled.div`
  position: absolute;
  right: -65px;
  display: flex;
  align-items: center;
`;

export const RightPlanItem = styled.div`
  margin-left: 15px;
  margin-right: 15px;
`;

export const LeftPlanItem = styled.div`
  margin-right: 15px;
  margin-left: 15px;
`;
