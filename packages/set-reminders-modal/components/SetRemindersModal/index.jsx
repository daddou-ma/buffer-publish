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
  text-align: left;
  width: 450px;
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
  margin: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-self: flex-end;
`;

const Tag = styled(Text)`
  position: absolute;
  left: 16px;
  top: 150px;
  font-size: 12px;
  width: 90px;
`;

const SetRemindersModal = ({
  translations,
  onCloseModalClick,
  onSetRemindersClick,
}) => (
  <Popover width="100%" top="5rem">
    <Modal>
      <img
        width="100%"
        alt="push_notifications_snippet"
        src="https://buffer-publish.s3.amazonaws.com/images/ig-reminders-modal.png"
      />
      <Tag type="p" color="white">
        {translations.tag}
      </Tag>
      <ModalContent>
        <Title type="h2">{translations.title}</Title>
        <Description type="p">{translations.description}</Description>
        <ButtonWrapper>
          <Button
            type="text"
            label={translations.dismiss}
            onClick={onCloseModalClick}
          />
          <Button
            type="primary"
            label={translations.setReminders}
            onClick={onSetRemindersClick}
          />
        </ButtonWrapper>
      </ModalContent>
    </Modal>
  </Popover>
);

SetRemindersModal.propTypes = {
  translations: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dismiss: PropTypes.string.isRequired,
    setReminders: PropTypes.string.isRequired,
  }).isRequired,
  onCloseModalClick: PropTypes.func.isRequired,
  onSetRemindersClick: PropTypes.func.isRequired,
};

export default SetRemindersModal;
