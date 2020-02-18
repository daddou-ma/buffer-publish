import styled from 'styled-components';
import { grayDark } from '@bufferapp/ui/style/colors';

export const Container = styled.div`
  display: flex;
  margin: 14px 0px 30px;
`;

export const Color = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 10px;
`;

export const LastUpdated = styled.span`
  color: ${grayDark};
`;

export const SubText = styled.div`
  display: flex;
  margin-top: 8px;
  p {
    margin: 0px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-top: 10px;
  button {
    margin-left: 10px;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  h1 {
    margin: 0px;
  }
`;

export const CampaignDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Group = styled.div`
  display: flex;
  margin-right: 16px;
`;

export const Details = styled.div`
  display: flex;
`;

export const Icon = styled.div`
  margin-right: 7px;
  svg {
    vertical-align: middle;
  }
`;
