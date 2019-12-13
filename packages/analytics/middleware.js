/**
 * This middlware is a hack to prevent our publish middleware code from
 * reacting to the profiles_* FETCH actions, which we trigger when lazy
 * loading the analyze overview. But we have to dispatch them to load
 * data for the analyze reducers / middlware to work ;)
 *
 * @todo Remove when we nix Analyze in Publish!
 *
 * @param {String} middlewareType 'hide' | 'reveal'
 */
const actionsOnlyForAnalyzeMiddleware = middlewareType => () => next => action => {
  const placeholderType = '@@ANALYZE_ACTION';

  // intercept and 'hide' the action
  if (
    middlewareType === 'hide' &&
    action.type === 'profiles_FETCH_SUCCESS' &&
    action.args &&
    action.args.forAnalyze === true
  ) {
    return next({
      ...action,
      type: placeholderType,
      previousType: action.type,
    });
  }

  // 'reveal' the action for the next middleware(s)
  if (middlewareType === 'reveal' && action.type === placeholderType) {
    return next({
      ...action,
      type: action.previousType,
    });
  }

  // Otherwise, carry on
  next(action);
};

export default actionsOnlyForAnalyzeMiddleware;
