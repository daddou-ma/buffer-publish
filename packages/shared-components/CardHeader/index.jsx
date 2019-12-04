import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from '@bufferapp/components';
import { grayLight, gray } from '@bufferapp/ui/style/colors';
import { Text, Button } from '@bufferapp/ui';

const CardHeaderWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${grayLight};
  padding: 14px 16px;
`;

const CardHeaderWrapperWithButton = styled(CardHeaderWrapper)`
  padding: 8px 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const AvatarWrapper = styled.span`
  display: flex;
  margin-right: 9px;
`;

const TextWithStyles = styled(Text)`
  font-size: 12px;
  line-height: 14px;
  margin: 0;
  color: ${gray};
`;

const getCreatedText = creatorName =>
  creatorName ? `${creatorName} created this ` : 'Created ';

const CardHeader = ({ creatorName, avatarUrl, createdAt, onPreviewClick }) => {
  const WrapperComponent = onPreviewClick
    ? CardHeaderWrapperWithButton
    : CardHeaderWrapper;

  return (
    <WrapperComponent>
      <ContentWrapper>
        {creatorName && (
          <AvatarWrapper>
            <Image
              src={avatarUrl}
              border="circle"
              height="1.25rem"
              width="1.25rem"
            />
          </AvatarWrapper>
        )}
        <TextWithStyles type="p">
          {getCreatedText(creatorName)}
          {createdAt}
        </TextWithStyles>
      </ContentWrapper>
      {onPreviewClick && (
        <Button
          type="secondary"
          label="Preview"
          size="small"
          onClick={onPreviewClick}
        />
      )}
    </WrapperComponent>
  );
};

CardHeader.propTypes = {
  creatorName: PropTypes.string,
  avatarUrl: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onPreviewClick: PropTypes.func,
};

CardHeader.defaultProps = {
  onPreviewClick: null,
  creatorName: null,
};

export default CardHeader;
