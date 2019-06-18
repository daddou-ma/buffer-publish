import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/shopgridComposerBar.css';

import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import Input from '@bufferapp/ui/Input';

class ShopgridComposerBar extends React.Component {
  static propTypes = {
    draftId: PropTypes.string.isRequired,
    shopgridLink: PropTypes.string,
    hasShopgridFlip: PropTypes.bool.isRequired,
    isInstagram: PropTypes.bool.isRequired,
    selectedInstagramProfiles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isBusinessUser: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    locationName: '',
    locationId: null,
    instagramProfileId: null,
    places: [],
    shopgridLink: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      shopgridLink: props.shopgridLink,
    };
  }

  shouldShowShopgridBar = () => {
    const {
      isInstagram,
      hasShopgridFlip,
      selectedInstagramProfiles,
      isBusinessUser,
    } = this.props;

    const hasInstagramSelected = selectedInstagramProfiles && selectedInstagramProfiles.length >= 1;

    return hasInstagramSelected && isInstagram && hasShopgridFlip && isBusinessUser;
  };

  onChange = (event) => {
    this.setState({ shopgridLink: event.target.value });
    ComposerActionCreators.updateDraftShopgridLink(this.props.draftId, event.target.value);
  };

  render () {
    return (
      this.shouldShowShopgridBar() &&
      <div className={styles.shopgridComposerBar}>
        <div className={styles.shopgridFieldContainer}>
          <span className={styles.shopgridFieldLabel}>Link </span>
          <span className={styles.shopgridAutocompleteContainer}>
            <input
              className={styles.shopgridFieldInput}
              onChange={this.onChange}
              onBlur={this.onChange}
              name="shopgridLink"
              placeholder="Website or Product URL"
              value={this.state.shopgridLink}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default ShopgridComposerBar;
