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
  translations,
  isBusinessOnInstagram,
  onSetUpDirectPostingClick,
  onCheckInstagramBusinessClick,
  onHideInstagramModal,
  profileId,
}) => (<div>
  <Popover>
    <Card noPadding>
      <div style={cardContentStyle}>
        <Text weight="medium" color="black">
          {translations.headline}
        </Text>
        <div style={textWrapperStyle}>
          <Text size="mini">
            {translations.description}
          </Text>
        </div>
        {!isBusinessOnInstagram &&
          <div style={textWrapperStyle}>
            <Text size="mini" weight="medium">
              {translations.instructions}
              <Link newTab href="https://faq.buffer.com/article/959-publish-instagram-set-up">
                {translations.learnMore}
              </Link>
            </Text>
          </div>
        }
        <Divider />
        <div style={buttonWrapperStyle}>
          <Button onClick={onHideInstagramModal} borderless>
            {translations.dismiss}
          </Button>
          {isBusinessOnInstagram &&
            <Button onClick={() => onSetUpDirectPostingClick(profileId)}>
              {translations.cta1}
            </Button>
          }
          {!isBusinessOnInstagram &&
            <Button onClick={() => onCheckInstagramBusinessClick(profileId)}>
              {translations.cta2}
            </Button>
          }
        </div>
      </div>
    </Card>
  </Popover>
</div>);

InstagramDirectPostingModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  profileId: PropTypes.string.isRequired,
  isBusinessOnInstagram: PropTypes.bool.isRequired,
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
  onHideInstagramModal: PropTypes.func.isRequired,
  onCheckInstagramBusinessClick: PropTypes.func.isRequired,
};

export default InstagramDirectPostingModal;
