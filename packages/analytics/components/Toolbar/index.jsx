import React from 'react';
import DatePicker from '@bufferapp/analyze-date-picker';
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
  profile: ProfileHeader.defaultProps.profile,
};

Toolbar.defaultProps = {
  profile: null,
};


export default Toolbar;
