import React from 'react';

const insertReplacer = (insertInto, replaceString, replaceWith) => {
  let completeString = [];
  if (typeof insertInto === 'string') {
    const replacedString = insertInto.split(replaceString);
    if (replacedString.length === 1) {
      return insertInto;
    }
    replacedString.forEach((elem, index) => {
      completeString.push(elem);
      if (index !== replacedString.length - 1) {
        completeString.push(replaceWith);
      }
    });
  } else {
    insertInto.forEach((elem) => {
      if (React.isValidElement(elem)) {
        completeString.push(elem);
      } else {
        const newString = insertReplacer(elem, replaceString, replaceWith);
        if (typeof newString === 'string') {
          completeString.push(newString);
        } else {
          completeString = completeString.concat(newString);
        }
      }
    });
  }
  return completeString;
};

const insertIntoTranslation = (insertInto, replacements) => {
  let result = insertInto;
  replacements.forEach(({replaceString, replaceWith}) => {
    result = insertReplacer(result, replaceString, replaceWith);
  });

  return result;
}

export default insertIntoTranslation;
export const stringTokenizer = (insertInto, replaceString, replaceWith) => {
  const tokenizedString = insertReplacer(insertInto, replaceString, replaceWith);

  if (typeof tokenizedString !== 'string') {
    return tokenizedString.join('');
  }

  return tokenizedString;
}
