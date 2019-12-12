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
  margin: 0 0 20px 0;
`;

const Description = styled(Text)`
  margin: 0 0 24px 0;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px;
`;

const ShopGridPromoModal = ({ onCloseModalClick, onComparePlansClick }) => (
  <Popover width="100%" top="5rem" onOverlayClick={onCloseModalClick}>
    <Modal>
      <img
        width="100%"
        alt="instagram_stories_snippet"
        src="https://buffer-publish.s3.amazonaws.com/images/shop-grid-2-promo-modal.jpg"
      />
      <ModalContent>
        <Title type="h2">
          Give your audience a better Instagram shopping experience
        </Title>
        <Description type="p">
          Try the <b>new and improved Shop Grid</b> to promote your products this holiday season.
        </Description>
        <Description type="p">
          Available now on the Publish Premium plan.
        </Description>
        <Button
          type="primary"
          label="Compare Plans"
          onClick={onComparePlansClick}
        />
        <Button type="text" label="Dismiss" onClick={onCloseModalClick} />
      </ModalContent>
    </Modal>
  </Popover>
);

ShopGridPromoModal.propTypes = {
  onCloseModalClick: PropTypes.func.isRequired,
  onComparePlansClick: PropTypes.func.isRequired,
};

export default ShopGridPromoModal;
