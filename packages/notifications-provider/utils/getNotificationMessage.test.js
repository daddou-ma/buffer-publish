import getNotificationMessage from './getNotificationMessage';

describe('getNotificationMessage', () => {
  it('it should return null if key not present', () => {
    expect(getNotificationMessage('random', 'success')).toBeNull();
  });

  it('it should return null if message not present', () => {
    expect(getNotificationMessage('success', 'random-key')).toBeNull();
  });

  it('it should return the string if present', () => {
    expect(getNotificationMessage('success', 'bitly-disconnect')).toBe(
      'Okay, your bitly account has been disconnected.'
    );
  });

  it('it should return the string with the value replaced if present', () => {
    expect(
      getNotificationMessage('success', 'example-with-variable', 'example')
    ).toBe('This is an example with this example value');
  });
});
