import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@bufferapp/ui';

import {
  DEFAULT_COLOR,
  DEFAULT_CONTRAST_COLOR,
  PreviewWrapper,
  UrlPreview,
  LinkPreviewRow,
} from '../styles';

export const LinkPreviewButton = styled.div.attrs(props => ({
  style: {
    backgroundColor: `${props.bgColor || DEFAULT_COLOR}`,
    color: `${props.textColor || DEFAULT_CONTRAST_COLOR}`,
    border: `${
      props.bgColor === DEFAULT_CONTRAST_COLOR
        ? `1px solid ${DEFAULT_COLOR}`
        : `1px solid ${props.bgColor}`
    }`,
  },
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 285px;
  min-width: 285px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: default;
  font-size: 14px;
  line-height: 16px;
`;

const LinkPreview = ({
  item,
  bgColor,
  textColor,
  onDeleteCustomLink,
  onToggleEditMode,
}) => {
  return (
    <PreviewWrapper>
      <LinkPreviewRow>
        <LinkPreviewButton bgColor={bgColor} textColor={textColor}>
          {item.text}
        </LinkPreviewButton>
        <UrlPreview>{item.url}</UrlPreview>
        <Button
          label="Delete"
          type="gray"
          onClick={() => onDeleteCustomLink({ customLinkId: item._id })}
        />
        <Button
          label="Edit"
          type="secondary"
          onClick={() => onToggleEditMode({ item, editing: true })}
        />
      </LinkPreviewRow>
    </PreviewWrapper>
  );
};

LinkPreview.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  text: PropTypes.string,
  item: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
  }),
  onToggleEditMode: PropTypes.func,
  onDeleteCustomLink: PropTypes.func,
};

LinkPreview.defaultProps = {
  bgColor: DEFAULT_COLOR,
  textColor: '#FFFFFF',
  text: null,
  item: {
    text: null,
    url: null,
  },
  onToggleEditMode: () => {},
  onDeleteCustomLink: () => {},
};

export default LinkPreview;
