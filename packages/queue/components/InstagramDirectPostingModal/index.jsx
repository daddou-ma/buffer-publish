import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  Card,
  Text,
  Link,
  Divider,
  Button,
} from '@bufferapp/components';

const cardContentStyle = {
  maxWidth: '664px',
  textAlign: 'left',
  margin: '16px',
};

const textWrapperStyle = {
  paddingTop: '16px',
};

const buttonWrapperStyle = {
  textAlign: 'right',
};

const InstagramDirectPostingModal = ({
  isBusinessOnInstagram,
  onSetUpDirectPostingClick,
  onCheckInstagramBusinessClick,
  onHideInstagramModal,
}) => (<div>
  <Popover>
    <Card noPadding>
      <div style={cardContentStyle}>
        <Text weight="medium" color="black">
          Would you like to set up Direct Scheduling for Instagram?
        </Text>
        <div style={textWrapperStyle}>
          <Text size="mini">
            Direct Scheduling allows you to post images and videos to Instagram
            directly from Buffer, just as you can with any other network.
          </Text>
        </div>
        {!isBusinessOnInstagram &&
          <div style={textWrapperStyle}>
            <Text size="mini" weight="medium">
              In order to set up Direct Scheduling you need to have an Instagram Business Profile. You
              can convert any account to a Business Profile through the Instagram mobile app.&nbsp;
              <Link newTab href="https://faq.buffer.com/article/959-publish-instagram-set-up">
                You can find the Instagram set up guide here.
              </Link>)
            </Text>
          </div>
        }
        <Divider />
        <div style={buttonWrapperStyle}>
          <Button onClick={onHideInstagramModal} borderless>
            No thanks, I might do it later
          </Button>
          {isBusinessOnInstagram &&
            <Button onClick={onSetUpDirectPostingClick}>
              Yes! Let&rsquo;s do it!
            </Button>
          }
          {!isBusinessOnInstagram &&
            <Button onClick={onCheckInstagramBusinessClick}>
              I&rsquo;ve converted it to Business
            </Button>
          }
        </div>
      </div>
    </Card>
  </Popover>
</div>);

InstagramDirectPostingModal.propTypes = {
  isBusinessOnInstagram: PropTypes.bool.isRequired,
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
  onHideInstagramModal: PropTypes.func.isRequired,
  onCheckInstagramBusinessClick: PropTypes.func.isRequired,
};

export default InstagramDirectPostingModal;