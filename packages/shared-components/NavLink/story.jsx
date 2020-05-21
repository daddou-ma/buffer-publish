import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { withA11y } from '@storybook/addon-a11y';
import NavLink from './index';

storiesOf('Nav|NavLink', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <MemoryRouter>
      <NavLink to="/tab">Tab 1</NavLink>
    </MemoryRouter>
  ))
  .add('selected', () => (
    <MemoryRouter>
      <NavLink to="/">Tab 1</NavLink>
    </MemoryRouter>
  ))
  .add('disabled', () => (
    <MemoryRouter>
      <NavLink to="/tab" disabled>
        Tab 1
      </NavLink>
    </MemoryRouter>
  ))
  .add('secondary', () => (
    <MemoryRouter>
      <NavLink to="/tab" secondary>
        Tab 1
      </NavLink>
    </MemoryRouter>
  ));
