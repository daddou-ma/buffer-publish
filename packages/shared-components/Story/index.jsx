import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Card from '../Card';

const Story = ({
  manager,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
}) => (
  <Card>
    <p>INSERT CARD HEADER, CARD FOOTER AND CAROUSEL</p>
  </Card>
);

Story.propTypes = {
  manager: PropTypes.bool,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
};

Story.defaultProps = {
  manager: true,
  onDeleteConfirmClick: null,
  onEditClick: null,
  onShareNowClick: null,
};

export default Story;
