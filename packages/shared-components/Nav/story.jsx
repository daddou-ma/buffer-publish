import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { withA11y } from '@storybook/addon-a11y';
import Nav from './index';
import NavLink from '../NavLink';

storiesOf('Nav|Nav', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <MemoryRouter>
      <Nav>
        <NavLink>Tab 1</NavLink>
        <NavLink to="/tab">Tab 2</NavLink>
      </Nav>
    </MemoryRouter>
  ));
