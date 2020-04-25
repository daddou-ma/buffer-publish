import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/styled/Button';
import styles from './css/modal.css';
import ActionCreators from './actionCreators';
import Store from './store';
import {
  OVERLAY,
  BUTTON,
  ESCAPE,
  TAB_KEY,
  ESCAPE_KEY,
  ENTER_KEY,
} from './constants';
import scopeTab from './scopeTab';

const getState = () => Store.getCurrentState();

// Method to retrieve a DOM element from a ref callback, that's compatible
// with both React 0.13.3 (legacy) and React 15+ (newer independent React apps),
// since this component is currently used in both codebases.
const getDOMNodeLegacy = node => {
  if (!node) return null;

  if (Object.prototype.hasOwnProperty.call(node, 'getDOMNode'))
    return node.getDOMNode();
  return node;
};

class Modal extends React.Component {
  static defaultProps = {
    classNames: {
      modal: null,
      closeButton: null,
    },
  };

  constructor(props) {
    super(props);
    this.state = Store.getInitialState();
  }

  componentDidMount = () => {
    this._trigger = document.activeElement;
    this._modal.focus();
    Store.addChangeListener(this.onChange);
  };

  componentWillUnmount = () => {
    Store.removeChangeListener(this.onChange);
    // restore focus to element that triggered modal
    setTimeout(() => {
      this._trigger.focus();
    }, 50);
  };

  onChange = () => this.setState(getState());

  handleKeyDown = ev => {
    /* handles focus in the modal for accessibility */
    if (ev.keyCode === TAB_KEY) {
      scopeTab(this._modal, ev);
    }
    if (ev.keyCode === ESCAPE_KEY) {
      const { hideCloseButton } = this.props;
      if (hideCloseButton) {
        return;
      }
      ev.preventDefault();
      ActionCreators.closeModal(ESCAPE);
    }
    if (ev.keyCode === ENTER_KEY && ev.target.id === 'closeButton') {
      ActionCreators.closeModal(BUTTON);
    }
  };

  close = ev => {
    const node = ev.target;

    if (node.id === 'overlay') {
      const { preventCloseOnOverlayClick } = this.props;
      if (preventCloseOnOverlayClick) {
        return;
      }
      ActionCreators.closeModal(OVERLAY);
    }

    if (node.id === 'closeButton' || node.parentElement.id === 'closeButton') {
      ActionCreators.closeModal(BUTTON);
    }
  };

  storeModalReference = node => {
    this._modal = getDOMNodeLegacy(node);
  };

  renderCloseButton() {
    const { classNames } = this.props;
    const hasCloseButtonCustomClass = classNames && classNames.closeButton;
    const closeClass = [
      hasCloseButtonCustomClass ? classNames.closeButton : '',
      styles.close,
    ].join(' ');
    const closeIconClass = ['bi bi-x', styles.closeIcon].join(' ');

    return (
      <Button
        className={closeClass}
        id="closeButton"
        href="#close"
        onClick={this.close}
        title="Close"
      >
        <i aria-hidden="true" className={closeIconClass} />
      </Button>
    );
  }

  render() {
    const {
      classNames,
      hideCloseButton,
      children,
      modalCustomStyle,
    } = this.props;
    const { open } = this.state;
    const overlayClass = styles.overlay;
    const hasCustomModalClass = classNames && classNames.modal;
    const modalClass = [
      hasCustomModalClass ? classNames.modal : '',
      styles.modal,
    ].join(' ');

    if (open) {
      return (
        <div
          className={overlayClass}
          id="overlay"
          onMouseDown={this.close}
          role="none"
        >
          <div
            className={modalClass}
            onKeyDown={this.handleKeyDown.bind(this)}
            ref={this.storeModalReference}
            style={modalCustomStyle}
            role="none"
          >
            {hideCloseButton ? null : this.renderCloseButton()}
            {children}
          </div>
        </div>
      );
    }

    return null;
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  hideCloseButton: PropTypes.bool,
  preventCloseOnOverlayClick: PropTypes.bool,
  classNames: PropTypes.shape({
    modal: PropTypes.string,
    closeButton: PropTypes.string,
  }),
  modalCustomStyle: PropTypes.object, // eslint-disable-line
};

Modal.defaultProps = {
  hideCloseButton: false,
  preventCloseOnOverlayClick: false,
};

module.exports = Modal;
