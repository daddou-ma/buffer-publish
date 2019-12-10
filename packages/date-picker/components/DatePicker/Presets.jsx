import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import {
  Button,
  Text,
} from '@bufferapp/components';

import {
  curiousBlue,
  geyser,
} from '@bufferapp/components/style/color';

const Header = styled.header`
  margin: 0 0 0.5rem;
  height: auto;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Item = styled.li`
  width: 33%;
  list-style: none;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-decoration: none;
  text-shadow: none;
  border: 1px solid ${geyser};
  border-radius: 3px;
  text-align: center;
  user-select: none;
  margin: 0.1rem;
  white-space: nowrap;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }

  > button {
    padding: 0.5rem 0.25rem !important;
  }

  ${props => props.inactive && css`
    opacity: 1;
  `}

  ${props => props.active && css`
    background: ${curiousBlue};
    border-color: ${curiousBlue};
  `}

  ${props => props.disabled && css`
    color: #AAAAAA !important;
    opacity: .3 !important;
    background: transparent !important;
    cursor: not-allowed;
  `}
`;

const Presets = ({ presets, selectPreset, startDate, endDate }) => {
  const presetButtons = presets.map((preset) => {
    const dataTip = preset.disabled ? 'We don\'t have complete data for this range.' : null;
    const handleClick = preset.disabled ? null : (() => selectPreset(preset));
    const buttonTextColor = (preset.selected ? 'white' : null);

    return (
      <Item
        active={preset.selected}
        inactive={!preset.selected}
        disabled={preset.disabled}
        key={preset.name.toLowerCase().replace(' ', '-')}
        data-tip={dataTip}
      >
        <Button
          noStyle
          fillContainer
          onClick={handleClick}
        >
          <Text size="extra-small" color={buttonTextColor}>{preset.name}</Text>
        </Button>
      </Item>
    );
  });

  return (
    <Header>
      <List>
        {presetButtons.slice(0, 3)}
      </List>
      <List>
        {presetButtons.splice(3)}
      </List>
    </Header>
  );
};

Presets.defaultProps = {
  startDate: null,
  endDate: null,
};

Presets.propTypes = {
  selectPreset: PropTypes.func.isRequired,
  startDate: PropTypes.number,
  endDate: PropTypes.number,
};

export default Presets;
