import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {
  Text,
  Card,
  Button,
  Popover,
  Input,
} from '@bufferapp/components';

import { CloseIcon } from '@bufferapp/components/Icon/Icons';
import styles from './AppSwitcherModal.css';

const getContainerStyle = hidden => ({
  position: 'absolute',
  top: '13px',
  right: '16px',
  width: '260px',
  display: hidden ? 'none' : '',
});

const cardInnerStyle = {
  padding: '16px 32px',
  textAlign: 'center',
  lineHeight: 1.1,
  position: 'relative',
};

const closeIconContainerStyle = {
  position: 'absolute',
  top: '8px',
  right: '8px',
};

const buttonContainerStyle = {
  marginTop: '10px',
};


class AppSwitcher extends React.Component {
  constructor () {
    super();

    this.state = {
      hidden: false,
      feedbackBody: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFeedbackChange = this.onFeedbackChange.bind(this);
  }

  componentDidUpdate (prevProps) {
    if (this.props.showFeedbackModal !== prevProps.showFeedbackModal) {
      const node = ReactDOM.findDOMNode(this);  // eslint-disable-line
      if (node) {
        const input = node.querySelector('input');
        if (input) {
          input.focus();
        }
      }
    }
  }

  onFeedbackChange (event) {
    this.setState({ feedbackBody: event.target.value });
  }

  handleSubmit (event) {
    event.preventDefault();
    const { source } = this.props;
    this.props.sendFeedback({ feedback: this.state.feedbackBody, source });
  }

  renderFeedbackModal () {
    const { feedbackBody } = this.state;
    const { submittingFeedback, closeFeedbackModal, translations } = this.props;
    const noTextEntered = feedbackBody === '';
    const buttonDisabled = submittingFeedback || noTextEntered;
    return (
      <React.Fragment>
        <Popover onOverlayClick={closeFeedbackModal}>
          <div className={styles.card}>
            <div className={styles.mainDivBackground} >
              <div style={{ paddingLeft: '25px', paddingTop: '25px' }}>
                <Text color="white" size="large" weight="medium">{translations.headline1}</Text>
                <div>
                  <Text color="white">{translations.tagline}</Text>
                </div>
              </div>
            </div>
            <div className={styles.barBottomStyle}>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <Text size="mini" color="black">{translations.question}</Text>
                <div style={{ padding: '5px 0' }} className={styles.disableResize}>
                  <Input
                    type="textarea"
                    meta={{ submitting: submittingFeedback }}
                    input={{ value: feedbackBody, onChange: this.onFeedbackChange }}
                  />
                </div>
                <div style={{ textAlign: 'right' }} >
                  <span style={{ margin: '0 5px' }} >
                    <Button disabled={submittingFeedback} secondary onClick={closeFeedbackModal}>
                      translations.cancel
                    </Button>
                  </span>
                  <Button disabled={buttonDisabled} onClick={this.handleSubmit}>
                    { submittingFeedback ? translations.pleaseWait : translations.continue }
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Popover>
      </React.Fragment>
    );
  }

  render () {
    const {
      showGoBackToClassic,
      showFeedbackModal,
      displayFeedbackModal,
      hidePrompt,
    } = this.props;
    if (!showGoBackToClassic && !hidePrompt) {
      return null;
    }
    const { hidden } = this.state;
    return (
      <div>
        {showFeedbackModal && this.renderFeedbackModal()}
        <div style={getContainerStyle(hidden || hidePrompt)}>
          <Card shadowHeight={1} noPadding>
            <div style={cardInnerStyle}>
              <div style={closeIconContainerStyle}>
                <Button
                  borderless
                  noStyle
                  onClick={() => { this.setState({ hidden: true }); }}
                >
                  <CloseIcon />
                </Button>
              </div>
              <Text size="small">
                Thanks for using our beta!
                You can switch back and forth at any time.
              </Text>
              <div style={buttonContainerStyle}>
                <Button
                  small
                  onClick={() => displayFeedbackModal()}
                >
                  Switch back to classic Buffer
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

AppSwitcher.propTypes = {
  showGoBackToClassic: PropTypes.bool.isRequired,
  sendFeedback: PropTypes.func.isRequired,
  submittingFeedback: PropTypes.bool.isRequired,
  displayFeedbackModal: PropTypes.func.isRequired,
  closeFeedbackModal: PropTypes.func.isRequired,
  showFeedbackModal: PropTypes.bool.isRequired,
  translations: PropTypes.shape({
    headline1: PropTypes.string,
    tagline: PropTypes.string,
    question: PropTypes.string,
    cancel: PropTypes.string,
    continue: PropTypes.string,
    pleaseWait: PropTypes.string,
  }).isRequired,
  hidePrompt: PropTypes.bool,
  source: PropTypes.string,
};

AppSwitcher.defaultProps = {
  hidePrompt: undefined,
  source: undefined,
};

export default AppSwitcher;
