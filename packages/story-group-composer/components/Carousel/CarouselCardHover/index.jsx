import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@bufferapp/ui';
import { getShortString } from '../../../utils/Carousel';
import {
  StyledTrashIcon,
  TrashIconWrapper,
  ButtonWrapper,
  DragDropWrapper,
  EditNoteWrapper,
  StyledPencilIcon,
  TextWrapper,
  PencilIconWrapper,
} from './style';

const CarouselCardHover = ({
  card,
  onAddNoteClick,
  onDeleteStoryClick,
}) => (
  <Fragment>
    <TrashIconWrapper>
      <StyledTrashIcon
        size="medium"
        onClick={() => onDeleteStoryClick(card)}
      />
    </TrashIconWrapper>
    <DragDropWrapper />
    {
      card.note
        ? (
          <EditNoteWrapper>
            <TextWrapper>
              <Text>
                {getShortString(card.note)}
              </Text>
            </TextWrapper>
            <PencilIconWrapper>
              <StyledPencilIcon
                size="medium"
                onClick={() => onAddNoteClick(card)}
              />
            </PencilIconWrapper>
          </EditNoteWrapper>
        )
        : (
          <ButtonWrapper>
            <Button
              label="Add Note"
              onClick={() => onAddNoteClick(card)}
              fullWidth
            />
          </ButtonWrapper>
        )
    }
  </Fragment>
);

CarouselCardHover.propTypes = {
  card: PropTypes.shape({
    order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    note: PropTypes.string,
    asset_url: PropTypes.string,
    thumbnail_url: PropTypes.string,
    empty: PropTypes.bool,
    progress: PropTypes.string,
  }).isRequired,
  onAddNoteClick: PropTypes.func.isRequired,
  onDeleteStoryClick: PropTypes.func.isRequired,
};

export default CarouselCardHover;
