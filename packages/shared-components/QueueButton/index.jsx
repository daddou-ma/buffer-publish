import React, { Component } from 'react';
import PropTypes from 'prop-types';

const getBorderRadius = (index) => {
  if (index === 0) return '4px 0px 0px 4px';
  else if (index === 2) return '0px 4px 4px 0px';
  return '0px';
};

// refactor when new design system is used
const btnStyle = (index, isHovering, isSelected, disabled) => ({
  fontFamily: 'Roboto',
  fontWeight: 500,
  color: isSelected || isHovering ? '#3D3D3D' : '#636363',
  borderRadius: getBorderRadius(index, length),
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

const getWeekOrMonth = (index) => {
  if (index === 1) return 'week';
  else if (index === 2) return 'month';
  return null;
};

class QueueButton extends Component {
  constructor() {
    super();
    this.state = { isHovering: false, selectedIndex: 0 };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({ isHovering: true });
  }

  onMouseLeave() {
    this.setState({ isHovering: false });
  }

  updateIndex (selectedIndex) {
    // Currently not using logic because Week & Month btns open up in new window
    this.setState({ selectedIndex });
  }

  render() {
    const { onClick, index, text, disabled } = this.props;
    return (
      <button
        style={btnStyle(index, this.state.isHovering, this.state.selectedIndex === index, disabled)}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={(e) => {
          e.preventDefault();
          const weekOrMonth = getWeekOrMonth(index);
          onClick(weekOrMonth);
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
};

QueueButton.defaultProps = {
  disabled: false,
};

export default QueueButton;
