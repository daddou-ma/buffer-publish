import React, { Component } from 'react';
import PropTypes from 'prop-types';

const getBorderRadius = (index, total) => {
  if (index === 0) return '4px 0px 0px 4px';
  if (index === total - 1) return '0px 4px 4px 0px';
  return '0px';
};

// refactor when new design system is used
const btnStyle = (index, isHovering, isSelected, disabled, total) => ({
  fontFamily: 'Roboto',
  fontWeight: 500,
  color: isSelected || isHovering ? '#3D3D3D' : '#636363',
  borderRadius: getBorderRadius(index, total),
  fontSize: '14px',
  border: isSelected ? '1px solid #636363' : '1px solid #C4C4C4',
  boxSizing: 'border-box',
  backgroundColor: isSelected || isHovering ? '#F5F5F5' : 'initial',
  height: '36px',
  padding: '8px 16px',
  cursor: 'pointer',
  outline: 'none',
  position: (index !== 1) ? 'relative' : 'initial',
  margin: (index !== 1) ? 'auto -1px' : 'initial',
  pointerEvents: disabled ? 'none' : 'auto',
});

class QueueButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      selectedIndex: props.selectedIndex,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({ isHovering: true });
  }

  onMouseLeave() {
    this.setState({ isHovering: false });
  }

  updateIndex(selectedIndex) {
    // Currently not using logic because Week & Month btns open up in new window
    this.setState({ selectedIndex });
  }

  render() {
    const {
      onClick,
      total,
      index,
      text,
      disabled,
    } = this.props;
    const { isHovering, selectedIndex } = this.state;

    return (
      <button
        type="button"
        style={btnStyle(index, isHovering, selectedIndex === index, disabled, total)}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {text}
      </button>
    );
  }
}

QueueButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  total: PropTypes.number,
  selectedIndex: PropTypes.number,
};

QueueButton.defaultProps = {
  disabled: false,
  total: 0,
};

export default QueueButton;
