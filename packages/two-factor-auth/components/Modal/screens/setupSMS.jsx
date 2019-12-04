import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';

class SetupSMS extends React.Component {
  constructor() {
    super();
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.inputContainer) {
      const input = this.inputContainer.querySelector('input');
      input.focus();
      input.select();
    }
  }
  handlePhoneChange(event) {
    this.props.setPhoneNumber(event.target.value);
  }
  handleSubmit() {
    this.props.submitPhoneNumber();
  }
  render() {
    const {
      transition,
      updatePhoneNumber,
      loading,
      error,
      editMode,
    } = this.props;
    return (
      <Fragment>
        <div>
          <Text type="h3">
            {!editMode && 'Set up your phone number'}
            {editMode && 'Change your phone number'}
          </Text>
          {!editMode && (
            <div style={{ margin: '12px 0' }}>
              <Text type="p">
                This will be the device we send verification codes each time you
                log into Buffer.
              </Text>
            </div>
          )}
        </div>
        <div
          style={{ padding: '16px 0 20px' }}
          ref={el => {
            this.inputContainer = el;
          }}
        >
          <div style={{ paddingBottom: '4px' }}>
            <Text type="label">Phone number (incl. country code)</Text>
          </div>
          <Input
            type="text"
            placeholder="e.g., +1 123-555-1234"
            input={{
              value: updatePhoneNumber,
              onChange: this.handlePhoneChange,
            }}
            meta={{
              error,
              touched: Boolean(error),
              submitting: loading,
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {!editMode && (
            <Button
              type="text"
              label="Back"
              onClick={() => transition('BACK')}
            />
          )}
          {editMode && (
            <Button
              type="text"
              label="Cancel"
              onClick={() => transition('CLOSE')}
            />
          )}
          <Button
            type="primary"
            label={loading ? 'Please wait…' : 'Next'}
            onClick={this.handleSubmit}
            disabled={loading}
          />
        </div>
      </Fragment>
    );
  }
}

SetupSMS.propTypes = {
  transition: PropTypes.func.isRequired,
  updatePhoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  submitPhoneNumber: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default SetupSMS;
