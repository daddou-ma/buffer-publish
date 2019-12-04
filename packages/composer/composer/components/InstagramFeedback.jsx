import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/InstagramFeedback.css';
import InstagramReminderIcon from './InstagramReminderIcon';

const getLinkUrl = feedback => {
  if (feedback.some(f => f.code === 'ASPECT_RATIO')) {
    return 'https://faq.buffer.com/article/951-publish-image-aspect-ratios-for-instagram-direct-scheduling';
  }
  return 'https://faq.buffer.com/article/950-publish-how-buffer-works-with-instagram';
};

const InstagramFeedback = ({ feedback }) => (
  <div className={styles.container}>
    <div className={styles.iconContainer}>
      <InstagramReminderIcon size={{ width: '24px', height: '24px' }} />
    </div>
    <div className={styles.feedbackContainer}>
      {feedback.map(item => (
        <p key={item.code} className={styles.item}>
          {item.message}{' '}
        </p>
      ))}
      <a className={styles.link} target="_blank" href={getLinkUrl(feedback)}>
        Learn more
      </a>
    </div>
  </div>
);

InstagramFeedback.propTypes = {
  feedback: PropTypes.array.isRequired,
};

export default InstagramFeedback;
