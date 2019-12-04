import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@bufferapp/ui';
import { getShortString } from '../../../utils/Carousel';
import { carouselCardPropTypes } from '../../../utils/commonPropTypes';
import {
  StyledTrashIcon,
  TrashIconWrapper,
  ButtonWrapper,
  DragDropWrapper,
  EditNoteWrapper,
  StyledPencilIcon,
  TextWrapper,
  PencilIconWrapper,
  HoverWrapper,
} from './style';

const CarouselCardHover = ({
  card,
  onAddNoteClick,
  onDeleteStoryClick,
  translations,
}) => (
  <Fragment>
    <HoverWrapper>
      <TrashIconWrapper>
        <StyledTrashIcon
          size="medium"
          onClick={() => onDeleteStoryClick(card)}
        />
      </TrashIconWrapper>
      <DragDropWrapper />
      {card.note ? (
        <EditNoteWrapper>
          <TextWrapper>
            <Text>{getShortString(card.note)}</Text>
          </TextWrapper>
          <PencilIconWrapper>
            <StyledPencilIcon
              size="medium"
              onClick={() => onAddNoteClick(card)}
            />
          </PencilIconWrapper>
        </EditNoteWrapper>
      ) : (
        <ButtonWrapper>
          <Button
            label={translations.addNote}
            onClick={() => onAddNoteClick(card)}
            fullWidth
            size="small"
          />
        </ButtonWrapper>
      )}
    </HoverWrapper>
  </Fragment>
);

CarouselCardHover.propTypes = {
  card: carouselCardPropTypes, // eslint-disable-line react/require-default-props,
  translations: PropTypes.shape({
    addNote: PropTypes.string.isRequired,
  }).isRequired,
  onAddNoteClick: PropTypes.func,
  onDeleteStoryClick: PropTypes.func,
};

CarouselCardHover.defaultProps = {
  onAddNoteClick: () => {},
  onDeleteStoryClick: () => {},
};

export default CarouselCardHover;
