import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import Input from '@bufferapp/ui/Input';

const buttonStyle = {
  display: 'flex',
  alignSelf: 'flex-end',
};

const CreateHashtagGroup = ({ onCancelHashtagGroup, onSaveHashtagGroup }) =>
  <React.Fragment>
    <div>
      <Text type="h3">Create Hashtag Group</Text>
      <div>
        <Input
          onChange={() => {}}
          name="hashtagGroupName"
          label="Hashtag Group Name"
          placeholder="Your hashtag group name"
        />
        <Input
          onChange={() => {}}
          name="hashtagGroupContent"
          label="Hashtag Group Content"
          placeholder="Your hashtags"
        />
      </div>
    </div>
    <div style={buttonStyle}>
      <Button
        type="text"
        label="Cancel"
        onClick={onCancelHashtagGroup}
      />
      <Button
        type="primary"
        label="Save Hashtag Group"
        disabled
        onClick={onSaveHashtagGroup}
      />
    </div>
  </React.Fragment>;

CreateHashtagGroup.propTypes = {
  onCancelHashtagGroup: PropTypes.func,
  onSaveHashtagGroup: PropTypes.func,
};

CreateHashtagGroup.defaultProps = {
};


export default CreateHashtagGroup;
