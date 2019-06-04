import React from 'react';
import Button from '../../components/Button';
import styles from './css/modal.css';
import ActionCreators from './actionCreators';
import Store from './store';
import { OVERLAY, BUTTON, ESCAPE, TAB_KEY, ESCAPE_KEY, ENTER_KEY } from './constants';
import scopeTab from './scopeTab';

const getState = () => Store.getCurrentState();

// Method to retrieve a DOM element from a ref callback, that's compatible
// with both React 0.13.3 (legacy) and React 15+ (newer independent React apps),
// since this component is currently used in both codebases.
const getDOMNodeLegacy = (node) => {
  if (!node) return null;

  if (node.hasOwnProperty('getDOMNode')) return node.getDOMNode();
  return node;
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getInitialState();
  }

  static defaultProps = {
    classNames: {
      modal: null,
      closeButton: null,
    },
  };

  componentDidMount = () => {
    this._trigger = document.activeElement;
    this._modal.focus();
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount = () => {
    Store.removeChangeListener(this.onChange);
    // restore focus to element that triggered modal
    setTimeout(() => {
      this._trigger.focus();
    }, 50);
  }

  onChange = () => this.setState(getState())

  handleKeyDown = (ev) => {
    /* handles focus in the modal for accessibility */
    if (ev.keyCode === TAB_KEY) {
      scopeTab(this._modal, ev);
    }
    if (ev.keyCode === ESCAPE_KEY) {
      if (this.props.hideCloseButton) return;
      ev.preventDefault();
      ActionCreators.closeModal(ESCAPE);
    }
    if (ev.keyCode === ENTER_KEY && ev.target.id === 'closeButton') {
      ActionCreators.closeModal(BUTTON);
    }
  }

  close = (ev) => {
    var node = ev.target;

    if (node.id === 'overlay') {
      ActionCreators.closeModal(OVERLAY);
    }

    if (node.id === 'closeButton' || node.parentElement.id === 'closeButton') {
      ActionCreators.closeModal(BUTTON);
    }
  }

  storeModalReference = (node) => (this._modal = getDOMNodeLegacy(node))

  renderCloseButton() {
    const hasCloseButtonCustomClass = this.props.classNames && this.props.classNames.closeButton;
    var closeClass = [
       hasCloseButtonCustomClass ? this.props.classNames.closeButton : '',
      styles.close,
    ].join(' ');
    var closeIconClass = [
      'bi bi-x',
      styles.closeIcon,
    ].join(' ');

    return (
      <Button className={closeClass} id={'closeButton'} href="#close" onClick={this.close} title="Close">
        <i aria-hidden="true" className={closeIconClass} />
      </Button>
    );
  }

  render() {
    var overlayClass = styles.overlay;
    var hasCustomModalClass = this.props.classNames && this.props.classNames.modal;
    var modalClass = [
      hasCustomModalClass ? this.props.classNames.modal : '',
      styles.modal
    ].join(' ');

    if (this.state.open) {
      return (
        <div className={overlayClass} id={'overlay'} onMouseDown={this.close}>
          <div className={modalClass} onKeyDown={this.handleKeyDown.bind(this)} tabIndex="0" ref={this.storeModalReference} style={this.props.modalCustumStyle}>
            {this.props.hideCloseButton ? null : this.renderCloseButton()}
            {this.props.children}
          </div>
        </div>
      );
    }

    return null;
  }
}

module.exports = Modal;
