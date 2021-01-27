import React from 'react';
import {
  render,
  screen,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import userEvent from '@testing-library/user-event';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import Onboarding, { reducer, actions, actionTypes, middleware } from './index';
import {
  profiles,
  selectedProfile,
} from '../profile-sidebar/mockData/profiles';

describe('Onboarding', () => {
  const _TestContextContainer = ({ children }) => <>{children}</>;
  const TestDragDropContainer = DragDropContext(TestBackend)(
    _TestContextContainer
  );
  test('should export reducer', () => {
    expect(reducer).toBeDefined();
  });

  test('should export actions', () => {
    expect(actions).toBeDefined();
  });

  test('should export actionTypes', () => {
    expect(actionTypes).toBeDefined();
  });

  test('should export middleware', () => {
    expect(middleware).toBeDefined();
  });
});
