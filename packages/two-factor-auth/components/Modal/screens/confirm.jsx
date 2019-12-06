import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { Input } from '@bufferapp/components';

class Confirm extends React.Component {
  constructor() {
    super();
    this.state = {
      code: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
  }
  componentDidMount() {
    if (this.inputContainer) {
      const input = this.inputContainer.querySelector('input');
      input.focus();
    }
  }
  handleSubmit() {
    this.props.submitCode(this.state.code);
  }
  handleCodeChange(event) {
    this.setState({ code: event.target.value });
  }
  render() {
    const { transition, updateMethod, loading, error } = this.props;
    return (
      <Fragment>
        <Text type="h3">Enter confirmation code</Text>
        <div style={{ margin: '12px 0 8px' }}>
          <Text type="p">
            Awesome! Now we just need to confirm everything.{' '}
          </Text>
          {updateMethod === 'app' && (
            <Text type="p">
              Open your authenticator app and input the generated code.
            </Text>
          )}
          {updateMethod === 'sms' && (
            <Text type="p">Please input the code that we just texted you.</Text>
          )}
        </div>
        <div
          style={{ padding: '0 0 24px' }}
          ref={el => {
            this.inputContainer = el;
          }}
        >
          <div style={{ paddingBottom: '4px' }}>
            <Text type="label">Code</Text>
          </div>
          <Input
            type="text"
            input={{
              value: this.state.code,
              onChange: this.handleCodeChange,
            }}
            meta={{
              error,
              touched: Boolean(error),
              submitting: loading,
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="text" label="Back" onClick={() => transition('BACK')} />
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

Confirm.propTypes = {
  transition: PropTypes.func.isRequired,
  updateMethod: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  submitCode: PropTypes.func.isRequired,
};

export default Confirm;
