import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button, Link } from '@bufferapp/ui';
import { Image } from '@bufferapp/components';

const Wrapper = styled.div`
  height: ${props => (props.height ? props.height : '70vh')};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const Emoji = styled(Text)`
  font-size: 24px;
`;

const TextContainer = styled.div`
  width: 400px;
`;

const Subtitle = styled(Text)`
  margin: 0;
`;

const Title = styled(Text)`
  margin: 0 0 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 24px;
`;

const ButtonStyled = styled(Button)`
  margin-left: 4px;
  margin-right: 4px;
`;

const EmptyState = ({
  title,
  subtitle,
  emoji,
  heroImg,
  heroImgSize,
  height,
  primaryAction,
  secondaryAction,
  link,
}) => {
  return (
    <Wrapper height={height}>
      {emoji && <Emoji type="h3">{emoji}</Emoji>}
      {heroImg && (
        <Image
          marginBottom="24px"
          alt=""
          src={heroImg}
          width={heroImgSize?.width}
          height={heroImgSize?.height}
        />
      )}
      <TextContainer>
        {title && <Title type="h3">{title}</Title>}
        {subtitle && <Subtitle type="p">{subtitle}</Subtitle>}
      </TextContainer>
      <ButtonWrapper>
        {secondaryAction && (
          <ButtonStyled
            type="secondary"
            size="large"
            onClick={secondaryAction.onClick}
            label={secondaryAction.label}
          />
        )}
        {primaryAction && (
          <ButtonStyled
            type="primary"
            icon={primaryAction.icon ?? null}
            iconEnd={primaryAction.iconEnd ?? null}
            size="large"
            onClick={primaryAction.onClick}
            label={primaryAction.label}
          />
        )}
        {link && (
          <Link newTab href={link.href}>
            {link.label}
          </Link>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  heroImg: PropTypes.string,
  heroImgSize: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  height: PropTypes.string,
  emoji: PropTypes.string,
  primaryAction: PropTypes.shape({
    onClick: PropTypes.func,
    label: PropTypes.string,
    icon: PropTypes.node,
    iconEnd: PropTypes.bool,
  }),
  secondaryAction: PropTypes.shape({
    onClick: PropTypes.func,
    label: PropTypes.string,
  }),
  link: PropTypes.shape({
    href: PropTypes.string,
    label: PropTypes.string,
  }),
};

export default EmptyState;
