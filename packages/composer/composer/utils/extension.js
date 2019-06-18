import { AppEnvironments } from '../AppConstants';

const isOnExtension = metaData => metaData.appEnvironment === AppEnvironments.EXTENSION;

export {
  isOnExtension,
};
