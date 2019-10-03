import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Popover } from '@bufferapp/components';
import { white } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';
import { Button, Text } from '@bufferapp/ui';


const Modal = styled.div`
  background-color: ${white};
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  border-radius: ${borderRadius};
  text-align: center;
  width: 440px;
`;

const Title = styled(Text)`
  margin: 0;
`;

const Description = styled(Text)`
  margin-bottom: 24px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px;
`;

const StoriesPromoModal = ({
  onCloseModalClick,
  onStartTrialClick,
}) => (
  <Popover
    width="100%"
    top="5rem"
    onOverlayClick={onCloseModalClick}
  >
    <Modal>
      <img
        width="100%"
        alt="instagram_stories_snippet"
        src="https://buffer-publish.s3.amazonaws.com/images/stories-promo-modal.png"
      />
      <ModalContent>
        <Title type="h2">New! Plan, preview and schedule Instagram Stories</Title>
        <Description type="p">Try it free for 14 days on the Premium plan.</Description>
        <Button type="primary" label="Start Free 14-Day Trial" onClick={onStartTrialClick} />
      </ModalContent>
    </Modal>
  </Popover>
);

StoriesPromoModal.propTypes = {
  onCloseModalClick: PropTypes.func.isRequired,
  onStartTrialClick: PropTypes.func.isRequired,
};

export default StoriesPromoModal;
