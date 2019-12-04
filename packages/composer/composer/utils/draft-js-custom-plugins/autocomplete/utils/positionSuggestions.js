const positionSuggestions = function(
  getDecoratorParentRect,
  { decoratorRect, state, props }
) {
  const decoratorParentRect = getDecoratorParentRect();
  const left = decoratorRect.left - decoratorParentRect.left;
  const top =
    decoratorRect.top - decoratorParentRect.top + decoratorRect.height;

  return {
    left: `${left}px`,
    top: `${top}px`,
  };
};

export default positionSuggestions;
