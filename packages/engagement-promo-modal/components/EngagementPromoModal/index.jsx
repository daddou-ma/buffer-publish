import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fontWeightBold } from '@bufferapp/ui/style/fonts';
import { Text, Button, Modal, Link } from '@bufferapp/ui';
import { Cross } from '@bufferapp/ui/Icon';

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
  align-items: center;
  > * {
    &:first-child {
      margin-right: 16px;
    }
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
`;

const EngagementPromoModal = ({
  dismissModal,
  startTrial,
  alreadySawModal,
}) => {
  if (alreadySawModal) return null;
  return (
    <Modal background="url('https://s3.amazonaws.com/buffer-publish/images/engagement-promo-modal.png') no-repeat">
      <CloseButton
        type="text"
        icon={<Cross size="large" />}
        hasIconOnly
        onClick={() => dismissModal()}
      />
      <TextContainer>
        <Title type="h2">New! Reply to Instagram comments</Title>
        <Text type="p">
          Every time an Instagram comment goes unanswered, an opportunity to
          create a lifelong customer is lost. With our brand-new engagement
          tool, you can reply to every Instagram comment without leaving Buffer.
        </Text>

        <Note type="p">
          Comes included with all paid plans, which start at $15/month.
        </Note>
      </TextContainer>
      <Footer>
        <ButtonContainer>
          <Button
            type="primary"
            onClick={() => startTrial()}
            label="Start 14-day Free Trial"
          />
          <Link
            newTab
            href="https://buffer.com/engage?utm_source=new-feature&utm_medium=promoModal&utm_campaign=engagement-january2021"
            fontWeight={700}
          >
            Learn More
          </Link>
        </ButtonContainer>
        <Button type="text" onClick={() => dismissModal()} label="Dismiss" />
      </Footer>
    </Modal>
  );
};

EngagementPromoModal.propTypes = {
  alreadySawModal: PropTypes.bool,
  startTrial: PropTypes.func.isRequired,
  dismissModal: PropTypes.func.isRequired,
};

EngagementPromoModal.defaultProps = {
  alreadySawModal: false,
};

export default EngagementPromoModal;
