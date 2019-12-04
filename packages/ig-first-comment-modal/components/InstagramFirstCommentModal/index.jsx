import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Text, LoadingAnimation } from '@bufferapp/components';
import { TranslationReplacer } from '@bufferapp/publish-i18n';

import { BDSButton } from '@bufferapp/publish-shared-components';

import styles from './instagramFirstCommentModal.css';

class InstagramFirstCommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authResponse: null,
      status: null,
      needsSignin: true,
      loadedFB: false,
      canRequestMorePermission: false,
      userNeedsLogoutSignin: false,
      loading: true,
      checkedServiceAccess: false,
    };

    this.updateState = this.updateState.bind(this);
    if (this.loadFB()) {
      this.state.loadedFB = true;
    }
  }

  componentDidMount() {
    this.getFBLoginStatus();
  }

  componentDidUpdate() {
    const { appId, selectedProfiles } = this.props;
    if (selectedProfiles.length > 0 && appId) {
      if (this.canPostComment()) {
        this.props.hideModal();
        return;
      }
    }

    if (this.state.status) {
      if (this.state.status === 'connected') {
        this.checkServiceAccess();
      } else {
        /*
        inform user we need them to log into "profile name" to grant permissions for IG
        -> click button + trigger auth flow
        */
        this.userNeedsSignin();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('updateIGFirstCommentState', this.updateState);
  }

  getCantPostAccounts() {
    const { selectedProfiles } = this.props;
    return selectedProfiles.filter(
      p =>
        p.service === 'instagram' && p.should_post_direct && !p.canPostComment
    );
  }

  getFBLoginStatus() {
    /* eslint-disable no-undef */
    window.addEventListener('updateIGFirstCommentState', this.updateState);

    const getLoginStatus = () => {
      FB.init({
        appId: this.props.appId,
        cookie: true,
        // the session
        xfbml: false,
        version: 'v3.0',
      });

      FB.getLoginStatus(({ authResponse, status }) => {
        this.sendStateUpdate({
          authResponse,
          status,
        });
      });
    };

    if (typeof window.fbAsyncInit === 'undefined') {
      window.fbAsyncInit = () => {
        getLoginStatus();
      };
    } else {
      getLoginStatus();
    }
    /* eslint-enable no-undef */
  }

  canPostComment() {
    return this.getCantPostAccounts().length === 0;
  }

  sendStateUpdate(message) {
    window.dispatchEvent(
      new CustomEvent('updateIGFirstCommentState', {
        bubbles: false,
        detail: {
          message,
        },
      })
    );
  }

  updateState(event) {
    this.setState(event.detail.message);
  }

  checkServiceAccess() {
    if (!this.state.checkedServiceAccess) {
      const { profile } = this.props;
      const { serviceId } = profile;

      /* eslint-disable no-undef */
      FB.api(`${serviceId}`, data => {
        this.sendStateUpdate({
          checkedServiceAccess: true,
        });
        if (data && typeof data.error !== 'undefined') {
          /*
          inform user they need to log out of FB before granting permissions and will
          need to log into "profile name" account
          */
          this.userNeedsLogoutSignin();
        } else {
          this.userCanRequestMorePermissions();
        }
      });
    }
    /* eslint-enable no-undef */
  }

  userCanRequestMorePermissions() {
    this.sendStateUpdate({
      canRequestMorePermission: true,
      loading: false,
    });
  }

  userNeedsLogoutSignin() {
    this.sendStateUpdate({
      userNeedsLogoutSignin: true,
      loading: false,
    });
  }

  loadFB() {
    if (!this.state.loadedFB) {
      this.props.loadFacebook();
      return true;
    }
  }

  userNeedsSignin() {
    if (!this.state.needsSiginin) {
      this.sendStateUpdate({
        needsSiginin: true,
        loading: false,
      });
    }
  }

  render() {
    const {
      translations,
      hideModal,
      profile,
      launchRequestMorePermission,
    } = this.props;
    const canPostComment = this.canPostComment();

    if (typeof canPostComment === 'undefined' || canPostComment) {
      return null;
    }

    const profileList = this.getCantPostAccounts();
    let missingPermisisonProfile = profile;

    if (profileList.length > 0) {
      missingPermisisonProfile = profileList[0];
    }

    if (this.state.loading) {
      return (
        <div
          style={{
            position: 'fixed',
            zIndex: '3000',
            borderRadius: '4px',
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
          }}
        >
          <Popover>
            <div className={styles.card}>
              <div className={styles.mainDiv}>
                <div style={{ padding: '25px', textAlign: 'center' }}>
                  <LoadingAnimation />
                </div>
              </div>
              <div className={styles.barBottomStyle}>
                <div className={styles.divButton}>
                  <BDSButton onClick={hideModal} type="textOnly">
                    {translations.cancel}
                  </BDSButton>
                </div>
              </div>
            </div>
          </Popover>
        </div>
      );
    }
    if (this.state.canRequestMorePermission) {
      return (
        <div
          style={{
            position: 'fixed',
            zIndex: '3000',
            borderRadius: '4px',
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
          }}
        >
          <Popover>
            <div className={styles.card}>
              <div className={styles.mainDiv}>
                <div style={{ padding: '25px' }}>
                  <Text color={'black'} weight="bold">
                    {translations.headline}
                  </Text>
                  <div>
                    <Text size="mini">
                      {translations.postOnYourBehalf}
                      {translations.canRequestMorePermission}
                    </Text>
                  </div>
                </div>
              </div>
              <div className={styles.barBottomStyle}>
                <div className={styles.divButton}>
                  <BDSButton onClick={hideModal} type="textOnly">
                    {translations.cancel}
                  </BDSButton>
                  <BDSButton
                    onClick={() =>
                      launchRequestMorePermission(missingPermisisonProfile.id)
                    }
                  >
                    {translations.continue}
                  </BDSButton>
                </div>
              </div>
            </div>
          </Popover>
        </div>
      );
    }
    if (this.state.userNeedsLogoutSignin) {
      const profileName = [
        {
          replaceString: '{signout}',
          replaceWith: <Text weight="bold">{translations.signout}</Text>,
        },
        {
          replaceString: '{profileName}',
          replaceWith: (
            <Text weight="bold">
              {missingPermisisonProfile.service_username}
            </Text>
          ),
        },
      ];

      return (
        <div
          style={{
            position: 'fixed',
            zIndex: '3000',
            borderRadius: '4px',
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
          }}
        >
          <Popover>
            <div className={styles.card}>
              <div className={styles.mainDiv}>
                <div style={{ padding: '25px' }}>
                  <Text color={'black'} weight="bold">
                    {translations.headline}
                  </Text>
                  <div>
                    <Text size="mini">
                      {translations.postOnYourBehalf}
                      <TranslationReplacer
                        translation={translations.userNeedsLogoutSignin}
                        replacementStrings={profileName}
                      />
                    </Text>
                  </div>
                </div>
              </div>
              <div className={styles.barBottomStyle}>
                <div className={styles.divButton}>
                  <BDSButton onClick={hideModal} type="textOnly">
                    {translations.cancel}
                  </BDSButton>
                  <BDSButton
                    onClick={() =>
                      launchRequestMorePermission(missingPermisisonProfile.id)
                    }
                  >
                    {translations.continue}
                  </BDSButton>
                </div>
              </div>
            </div>
          </Popover>
        </div>
      );
    }
    return (
      <div
        style={{
          position: 'fixed',
          zIndex: '3000',
          borderRadius: '4px',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
        }}
      >
        <Popover>
          <div className={styles.card}>
            <div className={styles.mainDiv}>
              <div style={{ padding: '25px' }}>
                <Text color={'black'} weight="bold">
                  {translations.headline}
                </Text>
                <div>
                  <Text size="mini">
                    {translations.postOnYourBehalf}
                    {translations.body}
                  </Text>
                </div>
              </div>
            </div>
            <div className={styles.barBottomStyle}>
              <div className={styles.divButton}>
                <BDSButton onClick={hideModal} type="textOnly">
                  {translations.cancel}
                </BDSButton>
                <BDSButton
                  onClick={() =>
                    launchRequestMorePermission(missingPermisisonProfile.id)
                  }
                >
                  {translations.continue}
                </BDSButton>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}

InstagramFirstCommentModal.propTypes = {
  selectedProfiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      canPostComment: PropTypes.bool,
    })
  ),
  loadFacebook: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired, // eslint-disable-line
  hideModal: PropTypes.func.isRequired,
  launchRequestMorePermission: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.string,
    canPostComment: PropTypes.bool,
  }),
  appId: PropTypes.string.isRequired,
};

InstagramFirstCommentModal.defaultProps = {
  profile: null,
  selectedProfiles: null,
};

export default InstagramFirstCommentModal;
