import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  Text,
  Button,
} from '@bufferapp/components';

import styles from './welcomePaidModal.css';
import DotsNavigation from '../DotsNavigation';

class WelcomePaidModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 1 };
    this.onClickContinue = this.onClickContinue.bind(this);
    this.onClickStep = this.onClickStep.bind(this);
  }

  onClickContinue() {
    this.setState({ step: 2 });
  }

  onClickStep(n) {
    this.setState({ step: n });
  }

  render() {
    const { translations, hideModal } = this.props;
    return (
      <div style={{ position: 'fixed', zIndex: '3000', borderRadius: '4px', boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)' }}>
        <Popover>
          { this.state.step === 1 &&
          <div className={styles.card}>
            <div className={styles.mainDivBackground} >
              <div style={{ padding: '32px 24px' }}>
                <Text size="large" weight="medium" color="white">{translations.headline1}</Text>
                <div color="white" style={{ margin: '8px 0 24px' }}>
                  <Text color={'white'}>{translations.body1}<b>{translations.body2}</b></Text>
                </div>
              </div>
            </div>
            <div className={styles.barBottomStyle}>
              <DotsNavigation step={this.state.step} onClickCallback={this.onClickStep} />
              <div className={styles.divButton}>
                <Button onClick={this.onClickContinue} large>{translations.cta1}</Button>
              </div>
            </div>
          </div>
          }

          {this.state.step === 2 &&
            <div className={styles.card}>
              <div className={styles.mainDiv2} >
                <div style={{ paddingLeft: '25px', paddingTop: '25px' }}>
                  <Text color={'black'} size="large" weight="medium">{translations.headline2}</Text>
                  <div style={{ lineHeight: '2.5' }}>
                    <Text>{translations.body3}</Text>
                  </div>
                </div>
              </div>
              <div className={styles.divGifHolder}>
                <img
                  src="https://s3.amazonaws.com/buffer-publish/images/return_to_classic_publish.gif"
                  alt={translations.altText}
                />
              </div>
              <div className={styles.barBottomStyle}>
                <DotsNavigation step={this.state.step} onClickCallback={this.onClickStep} />
                <div className={styles.divButton}>
                  <Button onClick={hideModal} large>{translations.cta2}</Button>
                </div>
              </div>
            </div>
          }
        </Popover>
      </div>
    );
  }
}

WelcomePaidModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  hideModal: PropTypes.func.isRequired,
};

export default WelcomePaidModal;
