/* eslint-disable react/jsx-filename-extension */

/**
 * Custom decorator class that allows to decorate overlapping entities.
 * Matches the type definition [DraftDecoratorType](https://github.com/facebook/draft-js/
 * blob/master/src/model/decorators/DraftDecoratorType.js)
 * Modified from <https://github.com/facebook/draft-js/issues/246#issuecomment-221120915>,
 * itself modified from <https://github.com/facebook/draft-js/blob/master/src/model/
 * decorators/CompositeDraftDecorator.js>
 */

import React from 'react';
import { List } from 'immutable';

const DELIMITER = ':';
const DECORATOR_DELIMITER = ',';

function occupySlice(targetArr, start, end, componentKey) {
  for (let ii = start; ii < end; ii++) {
    if (targetArr[ii]) {
      targetArr[ii] = targetArr[ii] + DECORATOR_DELIMITER + componentKey;
    } else {
      targetArr[ii] = componentKey;
    }
  }
}

class NestableDecorator {
  constructor(decorators) {
    // Copy the decorator array, since we use this array order to determine
    // precedence of decoration matching. If the array is mutated externally,
    // we don't want to be affected here.
    this.decorators = decorators.slice();

    this.componentCache = {};
  }

  getDecorations(block, contentState) {
    const decorations = Array(block.getText().length).fill(null);

    this.decorators.forEach((decorator, ii) => {
      let counter = 0;
      const strategy = decorator.strategy;

      strategy(
        block,
        (start, end) => {
          occupySlice(decorations, start, end, ii + DELIMITER + counter);
          counter++;
        },
        contentState
      );
    });

    return List(decorations);
  }

  getComponentForKey(key) {
    if (this.componentCache[key]) return this.componentCache[key];

    const components = key
      .split(DECORATOR_DELIMITER)
      .map(k => parseInt(k.split(DELIMITER)[0], 10))
      .map(k => this.decorators[k].component);

    this.componentCache[key] = props =>
      components.reduce(
        (children, Outer) => <Outer {...props}>{children}</Outer>,
        props.children
      );

    return this.componentCache[key];
  }

  getPropsForKey(key) {
    const pps = key
      .split(DECORATOR_DELIMITER)
      .map(k => parseInt(k.split(DELIMITER)[0], 10))
      .map(k => this.decorators[k].props);

    return Object.assign({}, ...pps);
  }
}

export default NestableDecorator;
