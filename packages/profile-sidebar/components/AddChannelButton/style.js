import styled from 'styled-components';
import { SidebarListItem } from '@bufferapp/ui';
import AddIcon from '@bufferapp/ui/Icon/Icons/Add';
import {
  grayLight,
  grayDark,
  transparent,
  white,
  blue,
} from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';

export const CircleIcon = styled.div`
  border-radius: 100px;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${grayLight};
  transition: 0.1s all ease-in;
`;

export const SidebarItem = styled(SidebarListItem)`
  transition: 0.1s all ease-in;
  border: 1px solid ${grayLight};
  box-sizing: border-box;
  height: 48px;
  > span:first-child {
    width: 32px;
    height: 32px;
  }
`;

/* eslint-disable no-use-before-define */
export const ListItemContainer = styled.div`
  margin: 0 0 8px;
  border-radius: ${borderRadius};
  background-color: ${transparent};

  :hover {
    span div${CircleIcon} {
      background-color: ${blue};
      ${StyledAddIcon} & * {
        fill: ${white} !important;
        color: ${white} !important;
      }
    }
  }
`;
/* eslint-enable no-use-before-define */

/* StyleAddIcon needs to be defined after ListItemContain so 
the hover styles work properly. This is not ideal, but comes from
having a lot of rules in bufferapp/ui that are hard to override */
export const StyledAddIcon = styled(AddIcon)`
  transition: 0.1s all ease-in;
  fill: ${grayDark} !important;
`;
