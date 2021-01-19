import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fontWeightBold } from '@bufferapp/ui/style/fonts';
import { Text, Button, Modal } from '@bufferapp/ui';

const Title = styled(Text)`
  margin: 320px 0 20px;
`;

const Note = styled(Text)`
  font-weight: ${fontWeightBold};
`;

const TextContainer = styled.div`
  margin: 0 16px;
  text-align: center;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  align-items: center;
  > * {
    &:last-child {
      margin-top: 16px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% - 120px);
  > * {
    &:first-child {
      margin-right: 16px;
    }
  }
`;

const EngagementPromoModal = ({ dismissModal }) => {
  return (
    <Modal background="url('https://s3.amazonaws.com/buffer-publish/images/engagement-promo-modal.jpg') no-repeat">
      <TextContainer>
        <Title type="h2">New! Reply to Instagram comments</Title>
        <Text type="p">
          Every time an Instagram comment goes unanswered, an opportunity to
          create a lifelong customer is lost. With our brand-new engagement
          features, you can reply to every Instagram comment without leaving
          Buffer.
        </Text>
        <Note type="p">
          Buffer’s engagement features are including on all paid plans.
        </Note>
      </TextContainer>
      <Footer>
        <ButtonContainer>
          <Button
            fullWidth
            type="primary"
            onClick={() => {
              window.location.assign(
                'https://login.buffer.com/signup?product=publish=pro&cycle=month&cta=publish-engagementPromoModal-buttonBottom-publishPro-1'
              );
            }}
            label="Start 14-day Free Trial"
          />
          <Button
            fullWidth
            type="secondary"
            onClick={() => {
              window.location.assign(
                'https://buffer.com/engage?utm_source=new-feature&utm_medium=promoModal&utm_campaign=engagement-january2021'
              );
            }}
            label="Learn More"
          />
        </ButtonContainer>
        <Button type="text" onClick={() => dismissModal()} label="Dismiss" />
      </Footer>
    </Modal>
  );
};

EngagementPromoModal.propTypes = {
  dismissModal: PropTypes.func.isRequired,
};

export default EngagementPromoModal;
