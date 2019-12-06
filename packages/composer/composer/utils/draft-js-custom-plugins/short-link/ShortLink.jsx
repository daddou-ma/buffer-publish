import React from 'react';
import PropTypes from 'prop-types';

import styles from './ShortLink.css';

class ShortLink extends React.Component {
  static propTypes = {
    onMouseOver: PropTypes.func.isRequired,
    onMouseOut: PropTypes.func.isRequired,
    entityKey: PropTypes.string.isRequired,
    contentState: PropTypes.object.isRequired,
    children: PropTypes.node,
  };

  onMouseOver = () => {
    const { contentState, entityKey } = this.props;
    const { unshortenedLink, shortLink } = contentState
      .getEntity(entityKey)
      .getData();
    const el = this.refs.shortLink;

    const relativePosition = {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight,
    };

    this.props.onMouseOver({
      entityKey,
      unshortenedLink,
      shortLink,
      relativePosition,
    });
  };

  onMouseOut = () => this.props.onMouseOut();

  render = () => (
    <span
      onMouseOver={this.onMouseOver}
      onMouseOut={this.onMouseOut}
      className={styles.link}
      ref="shortLink"
    >
      {this.props.children}
    </span>
  );
}

export default ShortLink;
