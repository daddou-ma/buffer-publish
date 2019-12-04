import machine, { handleTransition } from './machine';

describe('machine', () => {
  it('ignores impossible transitions', () => {
    const nextState = handleTransition({
      state: { machineState: 'enabled' },
      name: 'FOO',
    });
    expect(nextState.machineState).toBe('enabled');
  });

  it('ignores nonexistant machineState', () => {
    const nextState = handleTransition({
      state: { machineState: 'foo' },
      name: 'FOO',
    });
    expect(nextState.machineState).toBe('foo');
  });

  Object.entries(machine).forEach(([machineState, stateTransitions]) => {
    Object.entries(stateTransitions).forEach(
      ([transitionName, nextMachineStateName]) => {
        const state = { machineState };
        if (typeof nextMachineStateName === 'function') {
          nextMachineStateName = nextMachineStateName(state);
        }
        it(`transitions from ${machineState} with ${transitionName} to ${nextMachineStateName}`, () => {
          const nextState = handleTransition({
            state,
            name: transitionName,
          });
          expect(nextState.machineState).toBe(nextMachineStateName);
        });
      }
    );
  });

  describe('transitions conditionally with CLOSE', () => {
    const closeableMachineStates = Object.keys(machine).filter(
      machineState =>
        !['enabled', 'disabled', 'recovery'].includes(machineState)
    );
    closeableMachineStates.forEach(machineState => {
      it(`from ${machineState} to enabled`, () => {
        const nextState = handleTransition({
          state: { machineState, isEnabled: true },
          name: 'CLOSE',
        });
        expect(nextState.machineState).toBe('enabled');
      });
    });
    closeableMachineStates.forEach(machineState => {
      it(`from ${machineState} to disabled`, () => {
        const nextState = handleTransition({
          state: { machineState, isEnabled: false },
          name: 'CLOSE',
        });
        expect(nextState.machineState).toBe('disabled');
      });
    });
  });

  describe('transitions with CODE_ACCEPTED to enabled when in editMode', () => {
    const editModeMachineStates = ['confirm'];
    editModeMachineStates.forEach(machineState => {
      it(`for ${machineState}`, () => {
        const nextState = handleTransition({
          state: { machineState, editMode: true },
          name: 'CODE_ACCEPTED',
        });
        expect(nextState.machineState).toBe('enabled');
      });
    });
  });

  it('transitions from confirm with BACK to setupSMS', () => {
    const nextState = handleTransition({
      state: { machineState: 'confirm', updateMethod: 'sms' },
      name: 'BACK',
    });
    expect(nextState.machineState).toBe('setupSMS');
  });

  it('transitions from confirm with BACK to setupApp', () => {
    const nextState = handleTransition({
      state: { machineState: 'confirm', updateMethod: 'app' },
      name: 'BACK',
    });
    expect(nextState.machineState).toBe('setupApp');
  });

  describe('updates the state', () => {
    it('clears the error for CLOSE and BACK transitions', () => {
      const nextState = handleTransition({
        state: { machineState: 'setupSMS', error: 'error! oops' },
        name: 'BACK',
      });
      expect(nextState.error).toBeFalsy();
    });

    it('sets the updateMethod to `sms`', () => {
      const nextState = handleTransition({
        state: { machineState: 'chooseMethod' },
        name: 'CHOOSE_SMS',
      });
      expect(nextState.updateMethod).toBe('sms');
    });

    it('sets the updateMethod to `app`', () => {
      const nextState = handleTransition({
        state: { machineState: 'chooseMethod' },
        name: 'SETUP_APP',
      });
      expect(nextState.updateMethod).toBe('app');
    });

    it('sets the edit mode when viewing app qr code', () => {
      const nextState = handleTransition({
        state: { machineState: 'enabled', editMode: false },
        name: 'CHANGE_APP',
      });
      expect(nextState.editMode).toBe(true);
    });

    it('sets the edit mode when changing phone number', () => {
      const nextState = handleTransition({
        state: { machineState: 'enabled', editMode: false },
        name: 'CHANGE_SMS',
      });
      expect(nextState.editMode).toBe(true);
    });

    it('keeps machineState and isEnabled in sync', () => {
      const nextState = handleTransition({
        state: { machineState: 'recovery', isEnabled: false },
        name: 'CLOSE',
      });
      expect(nextState.isEnabled).toBe(true);
    });

    it('keeps machineState and isEnabled in sync', () => {
      const nextState = handleTransition({
        state: { machineState: 'enabled', isEnabled: true },
        name: 'DISABLE',
      });
      expect(nextState.isEnabled).toBe(false);
    });
  });
});
