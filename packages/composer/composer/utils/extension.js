import { AppEnvironments } from '@bufferapp/publish-constants';

const isOnExtension = metaData =>
  metaData.appEnvironment === AppEnvironments.EXTENSION;

export { isOnExtension };
