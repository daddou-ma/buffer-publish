import styled from 'styled-components';
import { grayDark, grayLighter } from '@bufferapp/ui/style/colors';
import { fontWeightMedium } from '@bufferapp/ui/style/fonts';
import { borderRadius } from '@bufferapp/ui/style/borders';
 
export const Color = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 10px;
  margin-top: 7px;
`;

// using grid layout to align the campaign list details
export const Container = styled.li`
  background-color: ${props => (props.isEvenItem ? 'auto' : grayLighter)};
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 0.7fr 1fr;
  grid-column-gap: 20px;
  padding: 16px;
  border-radius: ${borderRadius};
`;

export const LastUpdated = styled.span`
  color: ${grayDark};
`;

export const Title = styled.div`
  h3,
  p {
    margin: 0px;
  }
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  p {
    font-weight: ${fontWeightMedium};
  }
`;

export const Icon = styled.span`
  margin-right: 7px;
`;

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  p {
    margin-top: 0px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
