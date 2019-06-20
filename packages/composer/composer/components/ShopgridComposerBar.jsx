import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/ShopgridComposerBar.css';

import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import { IconArrowPopover } from '@bufferapp/components';
import QuestionIcon from './QuestionIcon';

class ShopgridComposerBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopgridLink: props.shopgridLink || '',
    };

    this.onChange = this.onChange.bind(this);
    this.shouldShowShopgridBar = this.shouldShowShopgridBar.bind(this);
    this.openHelp = this.openHelp.bind(this);
  }

  onChange(event) {
    this.setState({ shopgridLink: event.target.value || ''});
    ComposerActionCreators.updateDraftShopgridLink(this.props.draftId, event.target.value);
  }

  shouldShowShopgridBar() {
    const {
      isInstagram,
      hasShopgridFlip,
      selectedInstagramProfiles,
      isBusinessUser,
    } = this.props;

    const hasInstagramSelected = selectedInstagramProfiles && selectedInstagramProfiles.length >= 1;

    return hasInstagramSelected && isInstagram && hasShopgridFlip && isBusinessUser;
  }

  openHelp(e) {
    e.preventDefault();
    window.open('https://faq.buffer.com/article/1164-publish-instagram-shop-grid', '_blank');
  }

  render () {
    return (
      this.shouldShowShopgridBar() &&
      <div className={styles.shopgridComposerBar}>
        <div className={styles.shopgridFieldContainer}>
          <span className={styles.shopgridFieldLabel}>
            Link
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={styles.questionIcon}
              title="Learn more about Shop Grid"
              onClick={this.openHelp}
            >
              <QuestionIcon />
            </a>
          </span>
          <span className={styles.shopgridAutocompleteContainer}>
            <input
              className={styles.shopgridFieldInput}
              onChange={this.onChange}
              onBlur={this.onChange}
              name="shopgridLink"
              placeholder="URL for Shop Grid"
              value={this.state.shopgridLink}
            />
          </span>
        </div>
      </div>
    );
  }
}

ShopgridComposerBar.propTypes = {
  draftId: PropTypes.string.isRequired,
  shopgridLink: PropTypes.string,
  hasShopgridFlip: PropTypes.bool.isRequired,
  isInstagram: PropTypes.bool.isRequired,
  selectedInstagramProfiles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isBusinessUser: PropTypes.bool.isRequired,
};

ShopgridComposerBar.defaultProps = {
  shopgridLink: null,
};


export default ShopgridComposerBar;
