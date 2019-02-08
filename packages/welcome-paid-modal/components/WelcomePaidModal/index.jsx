import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  Text,
  Button,
} from '@bufferapp/components';

import styles from './welcomePaidModal.css';

class WelcomePaidModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 1 };
    this.onClickContinue = this.onClickContinue.bind(this);
  }

  onClickContinue() {
    this.setState({ step: 2 });
  }

  render() {
    const { translations, hideModal } = this.props;
    return (
      <div style={{ position: 'fixed', zIndex: '3000' }}>
        <Popover>
          { this.state.step === 1 &&
          <div className={styles.card}>
            <div className={styles.mainDivBackground} >
              <div style={{ paddingLeft: '25px', paddingTop: '25px' }}>
                <Text size="large" weight="medium" color="white">{translations.headline1}</Text>
                <div color="white" style={{ margin: '16px 0 24px' }}>
                  <Text color={'white'}>{translations.body1}<b>{translations.body2}</b></Text>
                </div>
              </div>
            </div>
            <div className={styles.barBottomStyle}>
              <div className={styles.divDotStyle}>
                <ul className={styles.dotstyleUl}>
                  <li className={styles.dotstyleLi}>
                    <a className={styles.dotstyleA} href="#">Step 1</a>
                  </li>
                  <li className={styles.dotstyleLi}>
                    <a className={styles.dotstyleA} href="#">Step 2</a>
                  </li>
                </ul>
              </div>
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
                  <Text size="large" weight="medium">{translations.headline2}</Text>
                  <div style={{ lineHeight: '2.5' }}>
                    <Text>{translations.body3}</Text>
                  </div>
                </div>
              </div>
              <div className={styles.divGifHolder}>
                <img src="https://s3.amazonaws.com/buffer-publish/images/go_back_to_classic.gif" alt="You can go back from the sidebar" />
              </div>
              <div className={styles.barBottomStyle}>
                <div className={styles.divDotStyle}>
                  <ul className={styles.dotstyleUl}>
                    <li className={styles.dotstyleLi}>
                      <a className={styles.dotstyleA} href="#">Step 1</a>
                    </li>
                    <li className={styles.dotstyleLi}>
                      <a className={styles.dotstyleA} href="#">Step 2</a>
                    </li>
                  </ul>
                </div>
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
