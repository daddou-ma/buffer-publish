import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Text } from '@bufferapp/components';
import { Button } from '@bufferapp/ui';

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
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }

  onClickStep(n) {
    this.setState({ step: n });
  }

  render() {
    const { translations, hideModal } = this.props;

    const { step } = this.state;
    return (
      <div style={{
        position: 'fixed',
        zIndex: '3000',
        borderRadius: '4px',
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
      }}
      >
        <Popover>
          { step === 1 && (
          <div className={styles.card}>
            <div className={styles.mainDivBackground}>
              <div style={{ padding: '32px 24px' }}>
                <Text size="large" weight="medium" color="white">{translations.step1.headline}</Text>
                <div color="white" style={{ margin: '8px 0 24px' }}>
                  <Text color="white">
                    {translations.step1.body1}
                    <b>{translations.step1.body2}</b>
                  </Text>
                </div>
              </div>
            </div>
            <div className={styles.barBottomStyle}>
              <DotsNavigation step={step} onClickCallback={this.onClickStep} />
              <div className={styles.divButton}>
                <Button
                  type="primary"
                  label={translations.step1.cta}
                  onClick={this.onClickContinue}
                />
              </div>
            </div>
          </div>
          )}

          {step === 2 && (
            <div className={styles.card}>
              <div className={styles.mainDiv2}>
                <div className={styles.divText}>
                  <Text color="black" size="large" weight="medium">{translations.step2.headline}</Text>
                  <div style={{ paddingTop: '5px' }}>
                    <Text>{translations.step2.body}</Text>
                  </div>
                </div>
              </div>
              <div className={styles.divImageHolder}>
                <img
                  src="https://s3.amazonaws.com/buffer-publish/images/welcome-paid-modal-step2.png"
                  srcSet="https://s3.amazonaws.com/buffer-publish/images/welcome-paid-modal-step2.png 1x, https://s3.amazonaws.com/buffer-publish/images/welcome-paid-modal-step2@2x.png 2x"
                  alt={translations.step2.altText}
                />
              </div>
              <div className={styles.barBottomStyle}>
                <DotsNavigation step={step} onClickCallback={this.onClickStep} />
                <div className={styles.divButton}>
                  <Button
                    type="primary"
                    label={translations.step2.cta}
                    onClick={this.onClickContinue}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.card}>
              <div className={styles.mainDiv2}>
                <div className={styles.divText}>
                  <Text color="black" size="large" weight="medium">{translations.step3.headline}</Text>
                  <div style={{ paddingTop: '5px' }}>
                    <Text>{translations.step3.body}</Text>
                  </div>
                </div>
              </div>
              <div className={styles.divImageHolder}>
                <img
                  src="https://s3.amazonaws.com/buffer-publish/images/welcome-paid-modal-step3.png"
                  srcSet="https://s3.amazonaws.com/buffer-publish/images/welcome-paid-modal-step3.png 1x, https://s3.amazonaws.com/buffer-publish/images/welcome-paid-modal-step3@2x.png 2x"
                  alt={translations.step3.altText}
                />
              </div>
              <div className={styles.barBottomStyle}>
                <DotsNavigation step={step} onClickCallback={this.onClickStep} />
                <div className={styles.divButton}>
                  <Button
                    type="primary"
                    label={translations.step3.cta}
                    onClick={this.onClickContinue}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className={styles.card}>
              <div className={styles.mainDiv2} >
                <div style={{ paddingLeft: '25px', paddingTop: '25px' }}>
                  <Text color="black" size="large" weight="medium">{translations.step4.headline}</Text>
                  <div style={{ lineHeight: '2.5' }}>
                    <Text>{translations.step4.body}</Text>
                  </div>
                </div>
              </div>
              <div className={styles.divGifHolder}>
                <img
                  src="https://s3.amazonaws.com/buffer-publish/images/return_to_classic_publish.gif"
                  alt={translations.step4.altText}
                />
              </div>
              <div className={styles.barBottomStyle}>
                <DotsNavigation step={step} onClickCallback={this.onClickStep} />
                <div className={styles.divButton}>
                  <Button
                    type="primary"
                    label={translations.step4.cta}
                    onClick={hideModal}
                  />
                </div>
              </div>
            </div>
          )}
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
