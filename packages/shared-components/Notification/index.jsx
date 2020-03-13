import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';
import WarningIcon from '@bufferapp/ui/Icon/Icons/Warning';
import { gray, grayLighter } from '@bufferapp/ui/style/colors';
import styled from 'styled-components';

const alertRedBackground = '#FBC6AB';

const FlexContainer = styled.div`
  display: flex;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-right: 0.5rem;
  padding-top: 0.8rem;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-right: 0.5rem;
  flex-direction: column;
  width: 100%;
`;

const TitleText = styled(Text)`
  margin: 0.5rem 0;
`;

const BodyText = styled(Text)`
  margin: 0.7rem 0;
`;

const NotificationButton = ({ button }) => {
  return button ? (
    <Button
      type={button.type ? button.type : "primary"}
      onClick={e => {
        button.action(e, button);
      }}
      label={button.text}
    />
  ) : null;
};

NotificationButton.propTypes = {
  button: PropTypes.shape({
    action: PropTypes.func,
    text: PropTypes.string,
    type: PropTypes.string,
  }),
};

NotificationButton.defaultProps = {
  button: null,
};

const getColourFromType = (type = null) => {
  switch (type) {
    case 'info':
      return grayLighter;
    case 'error':
    case 'alert':
      return alertRedBackground;
    default:
      return null;
  }
};

const Notification = ({ title, body, button, type = null }) => {
  return title || body ? (
    <Card
      reducedPadding
      backgroundColor={getColourFromType(type)}
      borderColor={gray}
    >
      <FlexContainer>
        <IconContainer>
          <WarningIcon />
        </IconContainer>
        <ContentContainer>
          {title ? <TitleText type="h3">{title}</TitleText> : null}
          {Array.isArray(body) ? (
            body
              .filter(text => text !== null)
              .map(text => <BodyText type="p">{text}</BodyText>)
          ) : (
            <BodyText type="p">{body}</BodyText>
          )}
          <NotificationButton button={button} />
        </ContentContainer>
      </FlexContainer>
    </Card>
  ) : null;
};

Notification.propTypes = {
  title: PropTypes.string,
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  button: NotificationButton.propTypes.button,
  type: PropTypes.string,
};

Notification.defaultProps = {
  title: null,
  button: null,
  type: null,
};

export default Notification;
