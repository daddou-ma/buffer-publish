import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Tooltip } from '@bufferapp/ui';
import Input from '@bufferapp/ui/Input';

const buttonStyle = {
  display: 'flex',
  alignSelf: 'flex-end',
};

const textareaStyle = {
  resize: 'none',
  outline: 'none',
  borderRadius: '4px',
  fontSize: '14px',
  lineHeight: '20px',
  fontFamily: 'Roboto',
  width: '100%',
  boxSizing: 'border-box',
  border: 'none',
  height: '270px',
  padding: '0 16px',
};
const textareaLabelStyle = {
  margin: '16px 0 8px',
};

const textareaWrapperStyle = {
  position: 'relative',
  overflow: 'auto',
  padding: '16px 0 52px',
  width: '100%',
  boxSizing: 'border-box',
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
};

const counterLabelStyle = {
  position: 'absolute',
  right: '16px',
  bottom: '16px',
  fontSize: '10px',
  lineHeight: '12px',
  textAlign: 'center',
  background: '#E0E0E0',
  borderRadius: '2px',
  padding: '4px',
};

const hashtagscounter = '1';
const isHashtagContentEmpty = false;

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
          size="tall"
        />
        <div style={textareaLabelStyle}>
          <Text
            htmlFor="hashtagGroupContent"
            type="label"
          >
            Hashtag Group Content
          </Text>
        </div>
        <div style={textareaWrapperStyle}>
          <textarea
            style={textareaStyle}
            placeholder="Your hashtags"
            maxlength="2000"
            id="hashtagGroupContent"
            name="hashtagGroupContent"
          >
            It was a dark
          </textarea>
          <div style={counterLabelStyle}>
            <Tooltip label="Instagram will reject posts containing over 30 hashtags" position="top">
              <Text># Remaining: {hashtagscounter}</Text>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
    <div style={buttonStyle}>
      <Button
        type="text"
        label="Cancel"
        onClick={onCancelHashtagGroup}
      />
      <Button
        type="secondary"
        label="Save Hashtag Group"
        disabled={isHashtagContentEmpty}
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
