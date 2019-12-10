import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '@bufferapp/publish-analyze-date-picker';
import ExportPicker from '@bufferapp/analyze-export-picker';
import ProfileHeader from '../ProfileHeader';

const toolbarDatepicker = {
  marginRight: '10px',
};

const toolbarRight = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignContent: 'center',
  padding: '0.75rem 0',
};

const toolbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const Toolbar = ({ profile }) => (
  <div style={toolbarStyle}>
    <ProfileHeader profile={profile} />
    <div style={toolbarRight}>
      <div style={toolbarDatepicker}>
        <DatePicker />
      </div>
      <ExportPicker filename={'buffer-analytics'} />
    </div>
  </div>
);

Toolbar.propTypes = {
  profile: PropTypes.shape(ProfileHeader.propTypes),
};

Toolbar.defaultProps = {
  profile: null,
};

export default Toolbar;
