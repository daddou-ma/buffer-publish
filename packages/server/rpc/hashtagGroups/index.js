const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'hashtagGroups',
  'fetch hashtagGroups for current user',
  async () =>
    Promise.resolve([
      {
        _id: 'a',
        name: 'Testing this out',
        text: '#SomeText #WeAreAwesome #LetsPartyLikeIts1999 #OMGThisIsAmazing',
      },
      {
        _id: 'b',
        name: 'Testing this out',
        text: '#SomeText #WeAreAwesome #LetsPartyLikeIts1999 #OMGThisIsAmazing',
      },
      {
        _id: 'c',
        name: 'Testing this out',
        text: '#SomeText #WeAreAwesome #LetsPartyLikeIts1999 #OMGThisIsAmazing',
      },
      {
        _id: 'd',
        name: 'Testing this out',
        text: '#SomeText #WeAreAwesome #LetsPartyLikeIts1999 #OMGThisIsAmazing',
      },
      {
        _id: 'e',
        name: 'Testing this out',
        text: '#SomeText #WeAreAwesome #LetsPartyLikeIts1999 #OMGThisIsAmazing',
      },
    ]),
);
