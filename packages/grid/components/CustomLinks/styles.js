import styled from 'styled-components';
import { grayLight, blue } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';

export const DEFAULT_COLOR = '#000000';
export const DEFAULT_CONTRAST_COLOR = '#FFFFFF';

export const MyLinksSection = styled.div`
  border: 1px solid ${grayLight};
  border-radius: ${borderRadius};
  margin-bottom: 22px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const PreviewWrapper = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid #f5f5f5;
  transition: all 0.3s ease-in-out;
  box-shadow: ${props => (props.isTarget ? `0px 0px 4px 4px ${blue}` : 'none')};

  ::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0;
    border-radius: 3px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transition: opacity 0.3s ease-in-out;
  }

  :hover {
    cursor: move;
    transform: scale(1, 1);
    ::after {
      opacity: 1;
    }
  }
`;

export const LinkPreviewRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;
  font-size: 14px;
  color: #636363;
`;

export const MyLinksBody = styled.div``;

export const EditingMyLinksItem = styled.div`
  display: flex;
  padding: 8px;
  border-top: 1px solid ${grayLight};
`;

export const LinkInput = styled.div`
  margin: 8px;
  width: 50%;
`;

export const UrlPreview = styled.div`
  margin-left: 14px;
  flex-basis: 402px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 15px 15px;
`;
