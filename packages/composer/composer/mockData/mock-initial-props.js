// TODO: Make this file helpful for documentation purposes by pulling out verbose and
// repetitive data such as profiles, and beautifying its contents with plain objects
// instead of parsing serialized data

const useCases = {
  create: require('./useCases/create.json'),
  edit: require('./useCases/edit.json'),
  editWithLinkAttachment: require('./useCases/editWithLinkAttachment.json'),
  extension: require('./useCases/extension.json'),
  instagramOneImage: require('./useCases/instagramOneImage.json'),
  instagramMultipleImages: require('./useCases/instagramMultipleImages.json'),
};

export default useCases;
