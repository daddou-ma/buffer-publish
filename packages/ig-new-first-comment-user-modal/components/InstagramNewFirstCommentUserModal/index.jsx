import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  Text,
} from '@bufferapp/components';

import { Button } from '@bufferapp/ui';

import styles from './InstagramNewFirstCommentUserModal.css';

const InstagramNewFirstCommentUserModal = ({ translations, hideModal }) => (<div>
  <Popover>
    <div className={styles.card}>
      <div className={styles.headerDivBG}>
        <div className={styles.newFeatureTag}><Text color="white" weight="bold" size="small">New feature</Text></div>
      </div>
      <div className={styles.mainDivBackground}>
        <Text color={'black'} weight="bold">
          {translations.heading}
        </Text>
        <div className={styles.contentContainer}>
          <Text size="mini">
            {translations.mainContent}
          </Text>
        </div>
      </div>
      <div className={styles.imageBarStyle}>
        <img
          className={styles.imageStyle}
          src="https://buffer.com/images/modals/instagram/ig_first_comment.gif"
          alt={translations.imageAlt}
        />
      </div>
      <div className={styles.barBottomStyle}>
        <Button
          label={translations.continue}
          onClick={hideModal}
        />

      </div>
    </div>
  </Popover>
</div>);

InstagramNewFirstCommentUserModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  hideModal: PropTypes.func.isRequired,
};

export default InstagramNewFirstCommentUserModal;
