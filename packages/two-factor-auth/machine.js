const handleEnabled = state => (state.isEnabled ? 'enabled' : 'disabled');
const handleEditMode = state => (state.editMode ? 'enabled' : 'recovery');
const handleConfirmBack = state =>
  state.updateMethod === 'app' ? 'setupApp' : 'setupSMS';

const machine = {
  disabled: {
    ENABLE: 'chooseMethod',
  },
  chooseMethod: {
    CHOOSE_SMS: 'setupSMS',
    SETUP_APP: 'setupApp',
    CLOSE: handleEnabled,
  },
  setupSMS: {
    NEXT: 'confirm',
    BACK: 'chooseMethod',
    CLOSE: handleEnabled,
  },
  setupApp: {
    NEXT: 'confirm',
    BACK: 'chooseMethod',
    CLOSE: handleEnabled,
  },
  confirm: {
    CODE_ACCEPTED: handleEditMode,
    BACK: handleConfirmBack,
    CLOSE: handleEnabled,
  },
  recovery: {
    CLOSE: 'enabled',
  },
  enabled: {
    DISABLE: 'disabled',
    CHANGE_METHOD: 'chooseMethod',
    CHANGE_SMS: 'setupSMS',
    CHANGE_APP: 'setupApp',
    SHOW_RECOVERY: 'recovery',
  },
};

const stateFromTransition = ({
  state,
  transitionName,
  nextMachineState,
  /* params, */
}) => {
  const { machineState: currentMachineState } = state;
  let newState = {};

  // Clear any errors when closed
  if (['CLOSE', 'BACK'].includes(transitionName)) {
    newState = { error: '' };
  }

  // Store the new TFA method that we're setting up when
  // it's associated screen is viewed.
  if (nextMachineState === 'setupSMS') {
    newState = { ...newState, updateMethod: 'sms' };
  }
  if (nextMachineState === 'setupApp') {
    newState = { ...newState, updateMethod: 'app' };
  }

  switch (nextMachineState) {
    // If we're going to sms/app/recovery directly from 'enabled'
    // then mark this as 'editMode'
    case 'setupSMS':
    case 'setupApp':
    case 'recovery':
      newState = {
        ...newState,
        editMode: currentMachineState === 'enabled',
      };
      break;
    // Keep the machine state and `isEnabled` in sync
    case 'enabled':
      newState = {
        ...newState,
        isEnabled: true,
      };
      break;
    case 'disabled':
      newState = {
        ...newState,
        isEnabled: false,
      };
      break;
    default:
      break;
  }
  return {
    ...state,
    ...newState,
  };
};

export const handleTransition = ({ state, name: transitionName, params }) => {
  const { machineState } = state;
  if (machine[machineState]) {
    if (machine[machineState][transitionName]) {
      let nextMachineState = machine[machineState][transitionName];
      if (typeof nextMachineState === 'function') {
        nextMachineState = nextMachineState(state);
      }
      const newState = stateFromTransition({
        state,
        transitionName,
        nextMachineState,
        params,
      });
      return {
        ...newState,
        machineState: nextMachineState,
      };
    }
  }
  return state;
};

export default machine;
