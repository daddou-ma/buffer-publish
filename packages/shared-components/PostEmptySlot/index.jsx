import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  white,
  grayLighter,
  gray,
  grayDark,
  grayDarker,
  boxShadow,
} from '@bufferapp/ui/style/colors';
import {
  fontSize,
  fontFamily,
  fontWeightMedium,
} from '@bufferapp/ui/style/fonts';
import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  LinkedInIcon,
} from '@bufferapp/components';

import {
  SERVICE_TWITTER,
  SERVICE_FACEBOOK,
  SERVICE_LINKEDIN,
  SERVICE_PINTEREST,
  SERVICE_INSTAGRAM,
} from '@bufferapp/publish-constants';

const getBgStyle = (isHovering, focus) => {
  if (isHovering || focus) return white;
  return grayLighter;
};

const EmptySlot = styled.div`
  background: ${props => getBgStyle(props.isHovering, props.focus)};
  cursor: ${props => (props.service === 'noProfile' ? 'auto' : 'pointer')};
  border: ${props =>
    props.isHovering ? `1px solid ${gray}` : '1px solid transparent'};
  border-radius: 4px;
  font-family: ${fontFamily};
  font-style: normal;
  font-weight: ${fontWeightMedium};
  line-height: normal;
  font-size: ${fontSize};
  color: ${props => (props.focus ? grayDarker : grayDark)};
  height: 48px;
  display: flex;
  justify-content: center;
  transition: all 0.1s ease-out;
  margin-bottom: 8px;
  box-shadow: ${props => (props.focus ? `0 0 0 3px ${boxShadow}` : 'none')};
  position: relative;
`;

const MessageWrapper = styled.div`
  display: flex;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`;

const IconWrapper = styled.span`
  display: flex;
  margin-right: 5px;
`;

const iconMap = new Map([
  [SERVICE_TWITTER, { component: TwitterIcon }],
  [SERVICE_FACEBOOK, { component: FacebookIcon }],
  [SERVICE_LINKEDIN, { component: LinkedInIcon }],
  [SERVICE_PINTEREST, { component: PinterestIcon }],
  [SERVICE_INSTAGRAM, { component: InstagramIcon }],
]);

// eslint-disable-next-line react/prop-types
const Message = ({ message }) => <span>{message}</span>;

// eslint-disable-next-line react/prop-types
const HoverMessage = ({ service, customHoverMessage }) => {
  if (customHoverMessage) {
    return <Message message={customHoverMessage} />;
  }

  if (service === 'noProfile') {
    return (
      <Message message="Connect a channel to schedule posts to your queue" />
    );
  }

  const icon = iconMap.get(service);
  const IconComponent = icon && icon.component;
  const message =
    service === 'twitter' ? 'Schedule a Tweet' : 'Schedule a Post';

  return (
    <MessageWrapper>
      {icon && (
        <IconWrapper>
          <IconComponent />
        </IconWrapper>
      )}
      <Message message={message} />
    </MessageWrapper>
  );
};

class PostEmptySlot extends Component {
  constructor() {
    super();
    this.state = { isHovering: false };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({ isHovering: true });
  }

  onMouseLeave() {
    this.setState({ isHovering: false });
  }

  render() {
    const {
      service,
      time,
      onClick,
      focus,
      customLabel,
      customHoverMessage,
    } = this.props;
    const { isHovering } = this.state;
    const message = customLabel || time;

    return (
      <EmptySlot
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={onClick}
        onKeyPress={onClick}
        isHovering={isHovering}
        focus={focus}
        service={service}
        role="button"
        tabIndex="0"
      >
        <LabelWrapper>
          {isHovering ? (
            <HoverMessage
              service={service}
              customHoverMessage={customHoverMessage}
            />
          ) : (
            <Message message={message} />
          )}
        </LabelWrapper>
      </EmptySlot>
    );
  }
}

PostEmptySlot.propTypes = {
  time: PropTypes.string,
  service: PropTypes.string,
  customLabel: PropTypes.string,
  customHoverMessage: PropTypes.string,
  onClick: PropTypes.func,
  focus: PropTypes.bool,
};

PostEmptySlot.defaultProps = {
  time: null,
  service: null,
  customLabel: null,
  customHoverMessage: null,
  onClick: () => {},
  focus: false,
};

export default PostEmptySlot;
