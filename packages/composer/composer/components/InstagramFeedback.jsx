import React from 'react';
import PropTypes from 'prop-types';
import WarningIcon from '@bufferapp/ui/Icon/Icons/Warning';
import { Text } from '@bufferapp/ui';
import styles from './css/InstagramFeedback.css';

const getLinkUrl = feedback => {
  if (feedback.some(f => f.code === 'ASPECT_RATIO')) {
    return 'https://faq.buffer.com/article/951-publish-image-aspect-ratios-for-instagram-direct-scheduling';
  }
  return 'https://faq.buffer.com/article/950-publish-how-buffer-works-with-instagram';
};

const InstagramFeedback = ({ feedback }) => (
  <div className={styles.container}>
    <div className={styles.iconContainer}>
      <WarningIcon size="medium" />
    </div>
    <div>
      {feedback.map(item => (
        <Text key={item.code} className={styles.item}>
          {item.message}{' '}
        </Text>
      ))}
      <a
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        href={getLinkUrl(feedback)}
      >
        Learn more
      </a>
    </div>
  </div>
);

InstagramFeedback.propTypes = {
  feedback: PropTypes.array.isRequired,
};

export default InstagramFeedback;
