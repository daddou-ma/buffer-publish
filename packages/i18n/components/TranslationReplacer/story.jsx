import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';

import TranslationReplacer from './index';

const translations = {
  default: 'replace {sometext} with something',
  multipleStrings: 'replace {sometext} with something and {thisone} with something ',
  noStrings: 'dont replace anything {atAll}',
};

storiesOf('Translation Replacer', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <TranslationReplacer
      translation={translations.default}
      replacementStrings={[{
        replaceString: '{sometext}',
        replaceWith: 'SOMETEXT',
      }]}
    />
  ))
  .add('default with react component', () => (
    <TranslationReplacer
      translation={translations.default}
      replacementStrings={[{
        replaceString: '{sometext}',
        replaceWith: <div>SOMETEXT</div>,
      }]}
    />
  ))
  .add('mutiple strings', () => (
    <TranslationReplacer
      translation={translations.multipleStrings}
      replacementStrings={[{
        replaceString: '{sometext}',
        replaceWith: 'SOMETEXT',
      }, {
        replaceString: '{thisone}',
        replaceWith: 'THISONE',
      }]}
    />
  ))
  .add('mutiple strings with react component', () => (
    <TranslationReplacer
      translation={translations.multipleStrings}
      replacementStrings={[{
        replaceString: '{sometext}',
        replaceWith: <div>SOMETEXT</div>,
      }, {
        replaceString: '{thisone}',
        replaceWith: 'THISONE',
      }]}
    />
  ))
  .add('no match string', () => (
    <TranslationReplacer
      translation={translations.noStrings}
      replacementStrings={[{
        replaceString: '{nomatch}',
        replaceWith: 'SOMETEXT',
      }]}
    />
  ))
  .add('no match react component', () => (
    <TranslationReplacer
      translation={translations.noStrings}
      replacementStrings={[{
        replaceString: '{nomatch}',
        replaceWith: <div>SOMETEXT</div>,
      }]}
    />
  ));
