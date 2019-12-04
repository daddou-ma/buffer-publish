import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image } from '@bufferapp/components';

const EmptyState = ({
  title,
  subtitle,
  emoji,
  heroImg,
  heroImgSize,
  height,
}) => {
  const containerStyle = {
    textAlign: 'center',
    width: '700px',
    alignSelf: 'center',
  };

  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    height: `${height || '70vh'}`,
  };

  const headerStyle = {
    marginBottom: '1.5rem',
    width: '100%',
  };

  const subtitleStyle = {
    display: 'inline-block',
    width: '500px',
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        {emoji && <Text size={'extra-large'}>{emoji}</Text>}
        {heroImg && (
          <Image
            marginBottom="1.5rem"
            alt=""
            src={heroImg}
            width={heroImgSize.width}
            height={heroImgSize.height}
          />
        )}
        {title && (
          <div style={headerStyle}>
            <Text size="large" weight="bold">
              {title}
            </Text>
          </div>
        )}
        {subtitle && (
          <div style={subtitleStyle}>
            <Text>{subtitle}</Text>
          </div>
        )}
      </div>
    </div>
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
};

export default EmptyState;
