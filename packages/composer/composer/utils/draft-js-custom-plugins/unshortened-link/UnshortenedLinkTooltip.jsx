import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from '@bufferapp/draft-js';
import addShortLink from '../short-link/modifiers/addShortLink';
import Button from '../../../components/shared/Button';

import styles from '../short-link/ShortLinkTooltip.css';

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

class UnshortenedLinkTooltip extends React.Component {
  static propTypes = {
    callbacks: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    onLinkReshortened: PropTypes.func,
    classNames: PropTypes.object,
  };

  static defaultProps = {
    onLinkReshortened: () => {},
    classNames: {},
  };

  constructor(props) {
    super(props);

    this.state = getEmptyTooltipState();
    this.hideTooltipTimeoutId = null;
    this.isClickOnTooltipInProgress = false;
  }

  componentDidMount() {
    this.props.callbacks.onUnshortenedLinkMouseOver = this.onUnshortenedLinkMouseOver;
    this.props.callbacks.onUnshortenedLinkMouseOut = this.onUnshortenedLinkMouseOut;
    this.props.callbacks.onEditorStateChange = this.onEditorStateChange;
  }

  componentWillUnmount() {
    this.props.callbacks.onUnshortenedLinkMouseOver = null;
    this.props.callbacks.onUnshortenedLinkMouseOut = null;
    this.props.callbacks.onEditorStateChange = null;
  }

  onUnshortenedLinkMouseOver = shortLinkData => {
    clearTimeout(this.hideTooltipTimeoutId);
    this.showTooltip(shortLinkData);
  };

  onTooltipMouseOver = () => clearTimeout(this.hideTooltipTimeoutId);

  onUnshortenedLinkMouseOut = () =>
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

  onShortenButtonClick = () => {
    const { getEditorState, setEditorState } = this.props.store;
    const { entityKey, unshortenedLink, shortLink } = this.state;

    let wasLinkShortened = false;
    const editorState = getEditorState();
    const contentState = editorState.getCurrentContent();
    let newEditorState;

    contentState.getBlockMap().forEach(contentBlock => {
      findEntityRangeForKey(contentBlock, entityKey, (start, end) => {
        newEditorState = addShortLink(
          editorState,
          contentBlock,
          {
            shortLink,
            link: unshortenedLink,
            indices: [start, end],
          },
          { isUserAction: true }
        );

        // Re-focus composer
        newEditorState = EditorState.forceSelection(
          newEditorState,
          newEditorState.getSelection()
        );

        wasLinkShortened = true;
      });
    });

    if (wasLinkShortened) {
      setEditorState(newEditorState);
      this.props.onLinkReshortened(unshortenedLink, shortLink);
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
    top += height;
    left += width / 2;

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
    const { shortLink, position } = this.state;

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
          {shortLink}

          <Button className={styles.button} onClick={this.onShortenButtonClick}>
            Re-shorten
          </Button>
        </span>
      </span>
    );
  };
}

export default UnshortenedLinkTooltip;
