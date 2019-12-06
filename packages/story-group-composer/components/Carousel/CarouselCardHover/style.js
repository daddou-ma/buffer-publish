import styled from 'styled-components';
import TrashIcon from '@bufferapp/ui/Icon/Icons/Trash';
import PencilIcon from '@bufferapp/ui/Icon/Icons/Pencil';

export const StyledTrashIcon = styled(TrashIcon)`
  margin-bottom: auto;
  color: white;
  padding: 7px;
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
  cursor: pointer;
`;

export const StyledPencilIcon = styled(PencilIcon)`
  color: white;
  padding: 7px;
  cursor: pointer;
`;

export const PencilIconWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;

export const TextWrapper = styled.div`
  color: white;
  margin: auto;
  font-size: 14px;
  margin-left: 10px;
`;

export const TrashIconWrapper = styled.div`
  margin-left: auto;
  background: linear-gradient(
    180deg,
    rgba(61, 61, 61, 0) 1.56%,
    #3d3d3d 73.96%
  );
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
  width: 100%;
`;

export const EditNoteWrapper = styled.div`
  background: linear-gradient(
    180deg,
    rgba(61, 61, 61, 0) 1.56%,
    #3d3d3d 73.96%
  );
  width: 100%;
  display: flex;
`;

export const ButtonWrapper = styled.div`
  width: 90%;
  margin: auto;
  margin-bottom: 5px;
`;

export const DragDropWrapper = styled.div`
  flex-grow: 1;
  cursor: pointer;
  :hover {
    cursor: move;
  }
`;

export const HoverWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
