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
    boxShadow: 'none',
  },
  focus: {
    boxShadow: 'rgb(171, 183, 255) 0px 0px 0px 3px',
    background: 'rgb(31, 53, 179)',
  },
  // Types
  normal: {},
  small: {
    padding: '12px 16px',
  },
  textOnly: {
    background: 'none',
    boxShadow: 'none',
    color: '#636363',
  },
  textOnly_hover: {
    background: 'none',
    boxShadow: 'none',
    color: '#000',
  },
};
const getBdsButtonStyle = ({ state, props }) => {
  let style = bdsButtonStyle.base;
  if (state.focus) {
    style = { ...style, ...bdsButtonStyle.focus };
  }
  if (props.type) {
    props.type.split(' ').forEach(type => {
      style = { ...style, ...bdsButtonStyle[type] };
    });
  }
  if (state.hover) {
    style = { ...style, ...bdsButtonStyle.hover };
    props.type.split(' ').forEach(type => {
      if (bdsButtonStyle[type] && bdsButtonStyle[`${type}_hover`]) {
        style = { ...style, ...bdsButtonStyle[`${type}_hover`] };
      }
    });
  }
  if (state.loading) {
    style = { ...style, ...bdsButtonStyle.loading };
  }
  return style;
};

class BDSButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false, active: false, loading: false };
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
    return (
      <button
        onClick={this.handleOnClick}
        onMouseOver={() => this.setState({ hover: true })}
        onMouseOut={() => this.setState({ hover: false })}
        onFocus={() => this.setState({ focus: true })}
        onBlur={() => this.setState({ focus: false })}
        style={getBdsButtonStyle({ state: this.state, props: this.props })}
      >
        {children}
      </button>
    );
  }
}

BDSButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string, // eslint-disable-line
};

BDSButton.defaultProps = {
  type: 'normal',
};

export default BDSButton;
