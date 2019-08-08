import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Popover, Card, Input } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';
import formName from '../../symbols';

const inputStyle = {
  marginTop: '1.5rem',
  marginBottom: '1rem',
};

const boxStyle = {
  background: '#F5F5F5',
  width: '100%',
  padding: '16px',
  boxSizing: 'border-box',
};

const SubmitError = ({ error }) => (
  <div
    style={{
      ...inputStyle,
      textAlign: 'center',
    }}
  >
    <Text
      type="help"
      hasError
    >
      {error}
    </Text>
  </div>
);

SubmitError.propTypes = {
  error: PropTypes.string.isRequired,
};

const Modal = ({ handleSubmit, submitting, error, onRequestCloseModal }) => (
  <Popover onOverlayClick={() => onRequestCloseModal()}>
    <div
      style={{
        width: '40rem',
        margin: '0 25px',
      }}
    >
      <Card doublePadding>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Text type="h2">
           Request to Delete my Account
          </Text>
          <form>
            <div style={inputStyle}>
              <Text type="p">
                If you have a moment, please let us know why you are leaving (optional):
              </Text>
              <Field
                component={Input}
                type={'textarea'}
                name={'feedback'}
                placeholder={'Add your brutally honest feedback here :)'}
              />
            </div>
            <div style={boxStyle}>
              <Text>
                We will process your request to delete your account and all associated Personally Identifiable Information (PII) within the next 30 days. Deleting your Buffer account is permanent and will remove all of your stored tweets, posts, analytics and accounts forever. Once you submit this request we will immediately begin working on permanently deleting your account.
              </Text>
            </div>
            {error ? SubmitError({ error }) : null }
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '2rem',
              }}
            >
              <Button
                type="text"
                disabled={submitting}
                onClick={(e) => {
                  e.preventDefault();
                  onRequestCloseModal();
                }}
                label="Cancel"
              />
              <div
                style={{
                  margin: '0.5rem',
                }}
              />
              <Button
                type="secondary"
                onClick={() => { handleSubmit(); }}
                disabled={submitting}
                label="Got it! Delete My Account"
              />
            </div>
          </form>
        </div>
      </Card>
    </div>
  </Popover>
);

Modal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onRequestCloseModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  error: null,
};

export default reduxForm({
  form: formName,
})(Modal);
