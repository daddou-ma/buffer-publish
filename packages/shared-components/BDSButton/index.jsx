import React from 'react';
import PropTypes from 'prop-types';

const bdsButtonStyle = {
  base: {
    background: '#2C4BFF',
    borderRadius: '4px',
    border: 'none',
    color: '#fff',
    padding: '16px',
    fontWeight: 500,
    fontSize: '14px',
    fontFamily: 'Roboto',
    cursor: 'pointer',
    transition: 'all 0.1s ease-out',
    outline: 'none',
  },
  hover: {
    background: 'rgb(31, 53, 179)',
  },
  loading: {
    pointerEvents: 'none',
    color: 'rgb(119, 121, 122)',
    background: 'rgb(224, 224, 224)',
  },
};
const getBdsButtonStyle = (hover, loading) => {
  let style = bdsButtonStyle.base;
  if (hover) {
    style = { ...style, ...bdsButtonStyle.hover };
  }
  if (loading) {
    style = { ...style, ...bdsButtonStyle.loading };
  }
  return style;
};

class BDSButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false, loading: false };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
      this.setState({ loading: true });
    }
  }

  render() {
    const { children } = this.props;
    const { hover, loading } = this.state;
    return (
      <button
        onClick={this.handleOnClick}
        onMouseOver={() => this.setState({ hover: true })}
        onMouseOut={() => this.setState({ hover: false })}
        style={getBdsButtonStyle(hover, loading)}
      >
        {children}
      </button>
    );
  }
}

BDSButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BDSButton;
