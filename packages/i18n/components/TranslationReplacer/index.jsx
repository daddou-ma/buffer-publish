import React from 'react';
import PropTypes from 'prop-types';
import insertIntoTranslation from '../../helper';

const TranslationReplacer = ({
    translation,
    replacementStrings,
  }) => {
  const replacedNode = insertIntoTranslation(translation, replacementStrings);

  return (typeof replacedNode === 'string' ?
    replacedNode :
    replacedNode.map((e, i) => <React.Fragment key={String(i)}>{e}</React.Fragment>)
  );
};


TranslationReplacer.propTypes = {
  replacementStrings: PropTypes.arrayOf(PropTypes.shape({
    replaceString: PropTypes.string,
    replaceWith: PropTypes.node
  })),
  translation: PropTypes.string.isRequired,
};

TranslationReplacer.defaultProps = {
  loggedIn: false,
};

export default TranslationReplacer;
