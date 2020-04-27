import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from '@bufferapp/draft-js';
import addUnshortenedLink from '../unshortened-link/modifiers/addUnshortenedLink';
import Button from '../../../components/shared/Button';

import styles from './ShortLinkTooltip.css';

const getEmptyTooltipState = () => ({
  entityKey: null,
  unshortenedLink: null,
  shortLink: null,
  position: null, // Data structure in getNewTooltipPosition()
});

const getNewTooltipPosition = ({ top, left }) => ({
  top,
  left,
});

const findEntityRangeForKey = (contentBlock, entityKey, callback) => {
  contentBlock.findEntityRanges(
    character => character.getEntity() === entityKey,
    callback
  );
};

class ShortLinkTooltip extends React.Component {
  static propTypes = {
    callbacks: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    onLinkUnshortened: PropTypes.func,
    classNames: PropTypes.object,
  };

  static defaultProps = {
    onLinkUnshortened: () => {},
    classNames: {},
  };

  constructor(props) {
    super(props);

    this.state = getEmptyTooltipState();
    this.hideTooltipTimeoutId = null;
    this.isClickOnTooltipInProgress = false;
  }

  componentDidMount() {
    this.props.callbacks.onShortLinkMouseOver = this.onShortLinkMouseOver;
    this.props.callbacks.onShortLinkMouseOut = this.onShortLinkMouseOut;
    this.props.callbacks.onEditorStateChange = this.onEditorStateChange;
  }

  componentWillUnmount() {
    this.props.callbacks.onShortLinkMouseOver = null;
    this.props.callbacks.onShortLinkMouseOut = null;
    this.props.callbacks.onEditorStateChange = null;
  }

  onShortLinkMouseOver = shortLinkData => {
    clearTimeout(this.hideTooltipTimeoutId);
    this.showTooltip(shortLinkData);
  };

  onTooltipMouseOver = () => clearTimeout(this.hideTooltipTimeoutId);
  onShortLinkMouseOut = () =>
    (this.hideTooltipTimeoutId = setTimeout(this.hideTooltip, 20));
  onTooltipMouseOut = () =>
    (this.hideTooltipTimeoutId = setTimeout(this.hideTooltip, 20));
  onTooltipMouseDown = () => (this.isClickOnTooltipInProgress = true);
  onTooltipMouseUp = () => (this.isClickOnTooltipInProgress = false);

  onEditorStateChange = () => {
    // Don't hide tooltip when it's being clicked (and editor receives blur event
    // as a result)
    if (!this.isClickOnTooltipInProgress) this.hideTooltip();
  };

  onUnshortenButtonClick = () => {
    const { getEditorState, setEditorState } = this.props.store;
    const { entityKey, unshortenedLink, shortLink } = this.state;

    let wasLinkUnshortened = false;
    const editorState = getEditorState();
    const contentState = editorState.getCurrentContent();
    let newEditorState;

    contentState.getBlockMap().forEach(contentBlock => {
      findEntityRangeForKey(contentBlock, entityKey, (start, end) => {
        newEditorState = addUnshortenedLink(
          editorState,
          contentBlock,
          {
            shortLink,
            unshortenedLink,
            indices: [start, end],
          },
          { isUserAction: true }
        );

        // Re-focus composer
        newEditorState = EditorState.forceSelection(
          newEditorState,
          newEditorState.getSelection()
        );

        wasLinkUnshortened = true;
      });
    });

    if (wasLinkUnshortened) {
      setEditorState(newEditorState);
      this.props.onLinkUnshortened(unshortenedLink);
    }
  };

  isTooltipVisible = () => this.state.position !== null;

  showTooltip = ({
    entityKey,
    unshortenedLink,
    shortLink,
    relativePosition,
  }) => {
    const { width, height } = relativePosition;
    let { top, left } = relativePosition;

    top = top + height;
    left = left + width / 2;

    this.setState({
      entityKey,
      unshortenedLink,
      shortLink,
      position: getNewTooltipPosition({ top, left }),
    });
  };

  hideTooltip = () => {
    if (!this.isTooltipVisible()) return;

    this.setState(getEmptyTooltipState());
  };

  render = () => {
    const { unshortenedLink, position } = this.state;

    const tooltipClassName = [
      this.isTooltipVisible() ? styles.visibleTooltip : styles.hiddenTooltip,
      this.isTooltipVisible()
        ? this.props.classNames.visible
        : this.props.classNames.hidden,
    ].join(' ');

    return (
      <span
        className={tooltipClassName}
        style={position}
        ref="tooltip"
        onMouseOver={this.onTooltipMouseOver}
        onMouseOut={this.onTooltipMouseOut}
        onMouseDown={this.onTooltipMouseDown}
        onMouseUp={this.onTooltipMouseUp}
        aria-hidden={!this.isTooltipVisible()}
      >
        <span className={styles.tooltipContent}>
          {unshortenedLink}

          <Button
            className={styles.button}
            onClick={this.onUnshortenButtonClick}
          >
            Unshorten
          </Button>
        </span>
      </span>
    );
  };
}

export default ShortLinkTooltip;
