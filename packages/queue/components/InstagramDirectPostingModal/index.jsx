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
// import {
//   Button,
// } from '@bufferapp/ui/Button';

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
  hasBusinessProfile,
  onDirectPostingClick,
  onHideModal,
}) => (<div>
  <Popover>
    <Card noPadding>
      <div style={cardContentStyle}>
        <Text weight="medium" color="black">
          Would you like to set up direct posting for Instagram?
        </Text>
        <div style={textWrapperStyle}>
          <Text size="mini">
            Direct posting allows you to post to images and videos to Instagram
            directly from Buffer just as you can with any other network.
          </Text>
        </div>
        {!hasBusinessProfile &&
          <div style={textWrapperStyle}>
            <Text size="mini" weight="medium">
              In order to set up direct posting you need to have an Instagram Business Profile. You
              can convert any profile to a Business Profile through the Instagram mobile app.&nbsp;
              <Link newTab href="https://www.facebook.com/help/502981923235522">
                You can find the Instagram set up guide here.
              </Link>)
            </Text>
          </div>
        }
        <Divider />
        <div style={buttonWrapperStyle}>
          <Button onClick={onHideModal} borderless>
            No thanks, I might do it later
          </Button>
          <Button onClick={onDirectPostingClick} disabled={!hasBusinessProfile}>
            Yes! Let&rsquo;s do it!
          </Button>
        </div>
      </div>
    </Card>
  </Popover>
</div>);

InstagramDirectPostingModal.propTypes = {
  hasBusinessProfile: PropTypes.bool.isRequired,
  onDirectPostingClick: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
};

export default InstagramDirectPostingModal;
