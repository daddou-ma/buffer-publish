import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';

const ChooseMethod = ({ transition, setupApp, loading, editMode }) => (
  <Fragment>
    {loading && <Text size="large">Please wait...</Text>}
    <div style={{ display: loading ? 'none' : 'block' }}>
      <div style={{ textAlign: 'center' }}>
        <Text type="h3">
          {!editMode && 'Enable Two Factor Authentication'}
          {editMode && 'Change Two Factor Authentication'}
        </Text>
        <div style={{ margin: '12px 0' }}>
          <Text type="p">
            How would you like us to send your security codes?
          </Text>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '8px' }}>
          <Button
            type="secondary"
            fullWidth
            label="Text Message"
            onClick={() => transition('CHOOSE_SMS')}
          />
        </div>
        <div style={{ flex: 1, padding: '8px' }}>
          <Button
            type="secondary"
            fullWidth
            label="Authenticator App"
            onClick={setupApp}
          />
        </div>
      </div>
    </div>
  </Fragment>
);

ChooseMethod.propTypes = {
  transition: PropTypes.func.isRequired,
  setupApp: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default ChooseMethod;
