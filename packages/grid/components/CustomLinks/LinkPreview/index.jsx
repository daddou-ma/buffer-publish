import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@bufferapp/ui';

import {
  DEFAULT_COLOR,
  DEFAULT_CONTRAST_COLOR,
  PreviewWrapper,
  UrlPreview,
  LinkPreviewRow,
  StyledButton,
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UrlWrapper = styled.div`
  flex: 1;
  display: flex;
  min-width: 0;
`;

const LinkPreview = ({
  index,
  totalLinks,
  item,
  bgColor,
  textColor,
  onDeleteCustomLink,
  onToggleEditMode,
  isTarget,
}) => {
  const [isConfirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <PreviewWrapper isTarget={isTarget} totalLinks={totalLinks} index={index}>
      <LinkPreviewRow>
        <LinkPreviewButton bgColor={bgColor} textColor={textColor}>
          {item.text}
        </LinkPreviewButton>
        <UrlWrapper>
          <UrlPreview>{item.url}</UrlPreview>
        </UrlWrapper>
        {onDeleteCustomLink && (
          <React.Fragment>
            {!isConfirmingDelete ? (
              <StyledButton
                type="text"
                label="Delete"
                size="small"
                onClick={() => setConfirmingDelete(true)}
              />
            ) : (
              <React.Fragment>
                <StyledButton
                  type="text"
                  label="Cancel"
                  size="small"
                  onClick={() => setConfirmingDelete(false)}
                />
                <Button
                  label="Delete"
                  type="gray"
                  size="small"
                  onClick={() => onDeleteCustomLink({ customLinkId: item._id })}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        <Button
          label="Edit"
          type="secondary"
          size="small"
          onClick={() => onToggleEditMode({ item, editing: true })}
        />
      </LinkPreviewRow>
    </PreviewWrapper>
  );
};

LinkPreview.propTypes = {
  index: PropTypes.number,
  totalLinks: PropTypes.number,
  isTarget: PropTypes.bool,
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
  index: 0,
  totalLinks: 0,
  isTarget: false,
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
