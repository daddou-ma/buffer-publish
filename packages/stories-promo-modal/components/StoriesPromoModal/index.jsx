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
        src="https://s3-alpha-sig.figma.com/img/c200/7c21/b7ebc50159e1334b0a8284e99a0bef62?Expires=1571011200&Signature=MEHN~bBfhlEThgk7qAt3qN0QTQrd4NOKwC7flCSPYlsucfeLmNmta888eISBboj2uSwXkMkjjOjk8Y-e3f6PYTjnNjW04wo8qBidWvewbGn1ZXw-EEXNMRDfJsK~KwC6mmnjumrzBKdKZYaiUsnOAyb3nscHIjSKwSfc7mXdSD2-wBXmbcKn6WzR5bxi3-P4Ot9aQYXxXJGY3QXv443t3By3b2BeetTMYjAc5-edbGgpMOi6f2wAXwonetNLyymmXMXmNLq6Rhwb7eLoeOsPS4OruR2RKae0MH3h2Q-C8y7G3aybwc1zn0bW-lE5CnnF2ojM0d~2snzJtCpWD-ceSQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
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
